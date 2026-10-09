import { NextResponse } from "next/server";
import { databaseConnection } from "@/lib/database";
import { adminAuth } from "@/lib/adminhelperfunction";
import { Lead } from "@/models/Lead.model";
import { LeadActivity } from "@/models/LeadActivity.model";
import { TechPack } from "@/models/TechPack.model";

export async function GET(req: Request) {
    try {
        const isAdmin = await adminAuth();
        if (!isAdmin || !isAdmin.role) {
            return NextResponse.json({ success: false, message: "Unauthorized access" }, { status: 401 });
        }

        await databaseConnection();

        // 1. Auto-migration / sync of legacy TechPack records if not yet in Lead collection
        const totalLeadsCount = await Lead.countDocuments();
        const totalTechPacksCount = await TechPack.countDocuments();

        if (totalLeadsCount < totalTechPacksCount) {
            const existingLeads = await Lead.find().select('techPackRef email').lean();
            const existingTechPackIds = new Set(existingLeads.filter((l: any) => l.techPackRef).map((l: any) => l.techPackRef.toString()));

            const unmigratedTechPacks = await TechPack.find({ _id: { $nin: Array.from(existingTechPackIds) } }).lean();

            if (unmigratedTechPacks.length > 0) {
                for (const tp of unmigratedTechPacks as any[]) {
                    try {
                        const migrated = await Lead.create({
                            name: tp.name,
                            email: tp.email,
                            company: tp.company || '',
                            country: tp.country || 'Global / Unspecified',
                            website: tp.website || '',
                            productType: tp.productType,
                            productSlug: tp.productSlug || '',
                            quantity: tp.quantity || 50,
                            estimatedQuantity: tp.estimatedQuantity || `${tp.quantity || 50} pcs`,
                            deadline: tp.deadline || new Date(),
                            customizationOptions: tp.customizationOptions || [],
                            customizationDetails: tp.customizationDetails || '',
                            items: tp.items || [],
                            files: tp.files || [],
                            status: tp.isNewStatus ? 'New' : 'Contacted',
                            priority: (tp.quantity || 50) >= 500 ? 'High' : 'Medium',
                            leadSource: 'Website RFQ (Synced)',
                            estimatedValue: (tp.quantity || 50) * 18,
                            techPackRef: tp._id,
                            createdAt: tp.createdAt || new Date(),
                        });

                        await LeadActivity.create({
                            leadId: migrated._id,
                            type: 'SYSTEM',
                            title: 'Legacy Tech Pack Synced to CRM',
                            description: `Imported from historical Tech Pack archive (submitted on ${new Date(tp.createdAt || Date.now()).toLocaleDateString()}).`,
                            performedBy: 'CRM Sync Daemon',
                            createdAt: tp.createdAt || new Date(),
                        });
                    } catch (syncErr) {
                        console.warn("CRM Sync warning for TechPack id:", tp._id, syncErr);
                    }
                }
            }
        }

        // 2. Parse query parameters
        const url = new URL(req.url);
        const search = url.searchParams.get("search")?.trim() || "";
        const status = url.searchParams.get("status") || "All";
        const country = url.searchParams.get("country") || "";
        const productType = url.searchParams.get("productType") || "";
        const page = Math.max(1, parseInt(url.searchParams.get("page") || "1", 10));
        const limit = Math.max(1, Math.min(100, parseInt(url.searchParams.get("limit") || "25", 10)));
        const skip = (page - 1) * limit;

        // 3. Build filter query
        const query: any = { isArchived: { $ne: true } };

        if (status && status !== "All") {
            query.status = status;
        }

        if (country) {
            query.country = { $regex: country, $options: "i" };
        }

        if (productType) {
            query.productType = { $regex: productType, $options: "i" };
        }

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { company: { $regex: search, $options: "i" } },
                { productType: { $regex: search, $options: "i" } },
                { country: { $regex: search, $options: "i" } },
            ];
        }

        // 4. Fetch leads and total
        const [leads, totalFiltered] = await Promise.all([
            Lead.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            Lead.countDocuments(query),
        ]);

        // 5. Calculate pipeline stage counts for filter tabs & KPI badges
        const [
            allCount,
            newCount,
            contactedCount,
            sampleCount,
            productionCount,
            completedCount,
            rejectedCount,
        ] = await Promise.all([
            Lead.countDocuments({ isArchived: { $ne: true } }),
            Lead.countDocuments({ isArchived: { $ne: true }, status: "New" }),
            Lead.countDocuments({ isArchived: { $ne: true }, status: "Contacted" }),
            Lead.countDocuments({ isArchived: { $ne: true }, status: "Sample Requested" }),
            Lead.countDocuments({ isArchived: { $ne: true }, status: "Production" }),
            Lead.countDocuments({ isArchived: { $ne: true }, status: "Completed" }),
            Lead.countDocuments({ isArchived: { $ne: true }, status: "Rejected" }),
        ]);

        return NextResponse.json({
            success: true,
            data: leads,
            pagination: {
                total: totalFiltered,
                page,
                limit,
                totalPages: Math.ceil(totalFiltered / limit),
            },
            counts: {
                all: allCount,
                new: newCount,
                contacted: contactedCount,
                sampleRequested: sampleCount,
                production: productionCount,
                completed: completedCount,
                rejected: rejectedCount,
            },
        }, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching CRM leads:", error);
        return NextResponse.json({ success: false, message: error.message || "Failed to fetch leads" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const isAdmin = await adminAuth();
        if (!isAdmin || !isAdmin.role) {
            return NextResponse.json({ success: false, message: "Unauthorized access" }, { status: 401 });
        }

        const body = await req.json();
        if (!body.name || !body.email || !body.productType) {
            return NextResponse.json({ success: false, message: "Name, email, and productType are required" }, { status: 400 });
        }

        await databaseConnection();

        const numQty = typeof body.quantity === 'number' ? body.quantity : parseInt(String(body.quantity || '50').replace(/[^\d]/g, ''), 10) || 50;

        const newLead = await Lead.create({
            name: body.name,
            email: body.email,
            company: body.company || '',
            country: body.country || 'Global / Unspecified',
            website: body.website || '',
            phone: body.phone || '',
            productType: body.productType,
            productSlug: body.productSlug || '',
            quantity: numQty,
            estimatedQuantity: `${numQty} pcs`,
            deadline: body.deadline ? new Date(body.deadline) : new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
            customizationOptions: Array.isArray(body.customizationOptions) ? body.customizationOptions : [],
            customizationDetails: body.customizationDetails || '',
            status: body.status || 'New',
            priority: body.priority || 'Medium',
            leadSource: body.leadSource || 'Direct Manual Entry',
            estimatedValue: body.estimatedValue || numQty * 18,
            files: Array.isArray(body.files) ? body.files : [],
            notes: body.initialNote ? [{ note: body.initialNote, author: 'Admin', createdAt: new Date() }] : [],
        });

        await LeadActivity.create({
            leadId: newLead._id,
            type: 'SYSTEM',
            title: 'Lead Created Manually by Admin',
            description: `Admin created lead for ${body.name} (${body.productType}, ${numQty} pcs).`,
            performedBy: 'Admin User',
        });

        return NextResponse.json({ success: true, data: newLead, message: "Lead created successfully" }, { status: 201 });
    } catch (error: any) {
        console.error("Error creating manual CRM lead:", error);
        return NextResponse.json({ success: false, message: error.message || "Failed to create lead" }, { status: 500 });
    }
}
