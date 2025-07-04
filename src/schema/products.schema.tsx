import { z } from "zod"

export const ProductSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    category: z.string(),
    price: z.number(),
    discountPercentage: z.number(),
    rating: z.number(),
    stock: z.number(),
    tags: z.array(z.string()),
    brand: z.string(),
    sku: z.string(),
    weight: z.number(),
    dimensions: z.object({
        width: z.number(),
        height: z.number(),
        depth: z.number()
    }),
    warrantyInformation: z.string(),
    shippingInformation: z.string(),
    availabilityStatus: z.string(),
    reviews: z.array(
        z.object({
            rating: z.number(),
            comment: z.string(),
            date: z.string(),
            reviewerName: z.string(),
            reviewerEmail: z.string()
        })
    ),
    returnPolicy: z.string(),
    minimumOrderQuantity: z.number(),
    meta: z.object({
        createdAt: z.string(),
        updatedAt: z.string(),
        barcode: z.string(),
        qrCode: z.string()
    }),
    images: z.array(z.string()),
    thumbnail: z.string()
})

export type ProductsType = z.infer<typeof ProductSchema>

export const AddProductSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    price: z.coerce.number({
        required_error: "Price is required",
        invalid_type_error: "Price must be a number"
    }).min(1, "Price must be at least 1"),
    stock: z.coerce.number({
        required_error: "Stock is required",
        invalid_type_error: "Stock must be a number"
    }).min(1, "Stock must be at least 1"),
    brand: z.string().min(1, "Brand is required"),
    category: z.string().min(1, "Category is required"),
});


export type AddProductT = z.infer<typeof AddProductSchema>;

export const EditProductSchema = AddProductSchema.extend({
    id: z.number({
        required_error: "ID is required",
        invalid_type_error: "ID must be a number"
    })
});

export type EditProductT = z.infer<typeof EditProductSchema>;

export type ProductCategories = {
    slug: string,
    name: string,
    url: string,
}