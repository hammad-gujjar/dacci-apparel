import { NextResponse } from "next/server";
import { databaseConnection } from "@/lib/database";
import { adminAuth } from "@/lib/adminhelperfunction";
import { Lead } from "@/models/Lead.model";

export async function GET() {
    try {
        const isAdmin = await adminAuth();
        if (!isAdmin || !isAdmin.role) {
            return NextResponse.json({ success: false, message: "Unauthorized access" }, { status: 401 });
        }

        await databaseConnection();

        const matchActive = { isArchived: { $ne: true } };

        // 1. Core Summary Metrics
        const [
            totalInquiries,
            newCount,
            contactedCount,
            sampleCount,
            productionCount,
            completedCount,
            rejectedCount,
            totalValueResult,
        ] = await Promise.all([
            Lead.countDocuments(matchActive),
            Lead.countDocuments({ ...matchActive, status: "New" }),
            Lead.countDocuments({ ...matchActive, status: "Contacted" }),
            Lead.countDocuments({ ...matchActive, status: "Sample Requested" }),
            Lead.countDocuments({ ...matchActive, status: "Production" }),
            Lead.countDocuments({ ...matchActive, status: "Completed" }),
            Lead.countDocuments({ ...matchActive, status: "Rejected" }),
            Lead.aggregate([
                { $match: matchActive },
                { $group: { _id: null, totalVal: { $sum: "$estimatedValue" }, totalQty: { $sum: "$quantity" } } }
            ]),
        ]);

        const activePipeline = newCount + contactedCount + sampleCount + productionCount;
        const totalEstimatedValue = totalValueResult[0]?.totalVal || 0;
        const totalUnitsRequested = totalValueResult[0]?.totalQty || 0;
        const conversionRate = totalInquiries > 0 
            ? ((completedCount / totalInquiries) * 100).toFixed(1) 
            : "0.0";

        // 2. Monthly RFQ Volume (Last 6 Months)
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
        sixMonthsAgo.setDate(1);
        sixMonthsAgo.setHours(0, 0, 0, 0);

        const monthlyRaw = await Lead.aggregate([
            { $match: { ...matchActive, createdAt: { $gte: sixMonthsAgo } } },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" },
                    },
                    count: { $sum: 1 },
                    volume: { $sum: "$quantity" },
                },
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } },
        ]);

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthlyRFQs = monthlyRaw.map(item => ({
            name: `${monthNames[item._id.month - 1]} ${item._id.year}`,
            rfqs: item.count,
            units: item.volume,
        }));

        // 3. Top Countries Distribution
        const countriesRaw = await Lead.aggregate([
            { $match: matchActive },
            { $group: { _id: "$country", count: { $sum: 1 }, units: { $sum: "$quantity" } } },
            { $sort: { count: -1 } },
            { $limit: 8 },
        ]);

        const countries = countriesRaw.map(c => ({
            country: c._id || "Global / Unspecified",
            count: c.count,
            units: c.units,
        }));

        // 4. Popular Products Distribution
        const productsRaw = await Lead.aggregate([
            { $match: matchActive },
            { $group: { _id: "$productType", count: { $sum: 1 }, units: { $sum: "$quantity" } } },
            { $sort: { count: -1 } },
            { $limit: 8 },
        ]);

        const popularProducts = productsRaw.map(p => ({
            product: p._id || "Custom Sportswear",
            count: p.count,
            units: p.units,
        }));

        // 5. Lead Sources Breakdown
        const sourcesRaw = await Lead.aggregate([
            { $match: matchActive },
            { $group: { _id: "$leadSource", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
        ]);

        const leadSources = sourcesRaw.map(s => ({
            source: s._id || "Direct",
            count: s.count,
        }));

        // 6. Pipeline Conversion Funnel
        const funnel = [
            { stage: "New", count: newCount, color: "#8b5cf6" },
            { stage: "Contacted", count: contactedCount, color: "#3b82f6" },
            { stage: "Sample Requested", count: sampleCount, color: "#f59e0b" },
            { stage: "Production", count: productionCount, color: "#10b981" },
            { stage: "Completed", count: completedCount, color: "#047857" },
            { stage: "Rejected", count: rejectedCount, color: "#ef4444" },
        ];

        return NextResponse.json({
            success: true,
            data: {
                summary: {
                    totalInquiries,
                    activePipeline,
                    completed: completedCount,
                    sampleRequested: sampleCount,
                    conversionRate,
                    totalEstimatedValue,
                    totalUnitsRequested,
                },
                monthlyRFQs,
                countries,
                popularProducts,
                leadSources,
                funnel,
            },
        }, { status: 200 });
    } catch (error: any) {
        console.error("Error computing CRM analytics:", error);
        return NextResponse.json({ success: false, message: error.message || "Failed to load analytics" }, { status: 500 });
    }
}
