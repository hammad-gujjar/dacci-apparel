import { z } from "zod";

export const zSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, { message: "Name must be at least 2 characters" })
        .max(80, { message: "Name must be at most 80 characters" })
        .regex(
            /^[a-zA-Z0-9\s\-_'&()]+$/,
            { message: "Name contains invalid characters" }
        ),
    types: z.array(z.string().trim().min(1)).optional(),
    _id: z.string().min(3, { message: "_id is required." }),
    alt: z.string().min(3, { message: "alt is required." }),
    title: z.string().min(3, { message: "title is required." }),
    slug: z.string().min(3, { message: "slug is required." }),
    category: z.string().min(3, { message: "category is required." }),
    productType: z.string().min(2, { message: "product type is required." }),
    description: z.string().min(10, { message: "description is required." }),
    media: z.array(z.string()),
    mrp: z.union([
        z.number().min(0, 'MRP should be greater than 0'),
        z.string().transform((val) => Number(val)).refine((val) => !isNaN(val) && val >= 0, 'please enter a valid number')
    ]),
    sellingPrice: z.union([
        z.number().min(0, 'Selling price should be greater than 0'),
        z.string().transform((val) => Number(val)).refine((val) => !isNaN(val) && val >= 0, 'please enter a valid number')
    ]),
    discountPercentage: z.union([
        z.number().min(0, 'Discount percentage should be greater than 0'),
        z.string().transform((val) => Number(val)).refine((val) => !isNaN(val) && val >= 0, 'please enter a valid number')
    ]),
    minShoppingAmount: z.union([
        z.number().min(0, 'Discount percentage should be greater than 0'),
        z.string().transform((val) => Number(val)).refine((val) => !isNaN(val) && val >= 0, 'please enter a valid number')
    ]),
    product: z.string().min(3, { message: "product is required." }),
    sku: z.string().min(3, { message: "sku is required." }),
    color: z.string().min(3, { message: "color is required." }),
    size: z.string().min(1, { message: "size is required." }),
    code: z.string().min(3, { message: "code is required." }),
    validity: z.coerce.date(),
    image: z.string().min(3, { message: "image is required." }),
    phone: z.string().min(5, { message: "phone is required." }),
});