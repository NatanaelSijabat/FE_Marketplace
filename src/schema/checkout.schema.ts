import z from "zod";

export const CheckoutSchema = z.object({
    firstname: z.string().min(1, "Firstname is required"),
    lastname: z.string().min(1, "Lastname is required"),
    email: z.string().min(1, "Email is required"),
    phone: z.string().min(1, "Phone is required"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zip_code: z.string().min(1, "Zip Code is required"),
    cardholder_name: z.string().min(1, "Cardholder Name is required"),
    card_number: z.string().min(1, "Card Number is required"),
    expiry_date: z.string().min(1, "Expiry Date is required"),
    cvv: z.string().min(1, "CVV is required"),
})

export type CheckoutT = z.infer<typeof CheckoutSchema>

export type AddCartT = {
    userId: string
    products: {
        id: number,
        quantity: number
    }[]

}