import { notifError, notifSucces } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AddProductSchema, AddProductT } from "@/schema/products.schema";
import { usePostProduct, useUpdateProduct } from "@/service/product";
import { ModalI } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const ModalProduct: React.FC<ModalI> = ({ open, setOpen, type, data }) => {
    const form = useForm<AddProductT>({
        resolver: zodResolver(AddProductSchema),
        defaultValues: {
            title: "",
            description: "",
            price: 0,
            stock: 0,
            brand: "",
            category: "",
        }
    });

    const shape = (AddProductSchema as z.ZodObject<any>).shape;

    const { mutateAsync: createProduct } = usePostProduct()
    const { mutateAsync: updateProduct } = useUpdateProduct()

    const onSubmit = async (formData: AddProductT) => {
        try {
            if (type === "edit" && data?.id) {
                const res = await updateProduct({ id: data.id, ...formData });
                if (res?.status === 200) {
                    notifSucces("Sukses Update Product");
                    setOpen(false);
                } else {
                    notifError(res?.message || "Gagal update");
                }
            } else {
                const res = await createProduct(formData);
                if (res?.status === 201) {
                    notifSucces("Sukses Tambah Product");
                    setOpen(false);
                    form.reset();
                } else {
                    notifError(res?.message || "Gagal tambah");
                }
            }
        } catch (err: any) {
            notifError(err.message || "Terjadi kesalahan");
        }
    };


    useEffect(() => {
        if (type === "edit" && data) {
            form.reset({
                title: data.title,
                description: data.description,
                price: data.price,
                stock: data.stock,
                brand: data.brand,
                category: data.category,
            });
        } else if (type === "tambah") {
            form.reset({
                title: "",
                description: "",
                price: 0,
                stock: 0,
                brand: "",
                category: "",
            });
        }
    }, [type, data, form]);


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{type === "tambah" ? "Add New Product" : "Edit Product"}</DialogTitle>
                    <DialogDescription>
                        {type === "tambah" ? "Create a new product for your store" : "Update product information"}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(shape).map(([key, schema]) => {
                                const inputType = schema instanceof z.ZodNumber ? "number" : "text";
                                const isTextarea = key === "description";
                                const isFullWidth = key === "title" || key === "description";

                                const fieldComponent = (
                                    <FormField
                                        key={key}
                                        control={form.control}
                                        name={key as keyof AddProductT}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="capitalize">{key}</FormLabel>
                                                <FormControl>
                                                    {isTextarea ? (
                                                        <Textarea
                                                            {...field}
                                                            rows={4}
                                                            className="border border-gray-300 focus:border-black focus:ring-0"
                                                        />
                                                    ) : (
                                                        <Input
                                                            type={inputType}
                                                            {...field}
                                                            autoComplete="off"
                                                            className="border border-gray-300 focus:border-black focus:ring-0"
                                                        />
                                                    )}
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                );

                                return (
                                    <div
                                        key={key}
                                        className={isFullWidth ? "md:col-span-2 w-full" : ""}
                                    >
                                        {fieldComponent}
                                    </div>
                                );
                            })}
                        </div>
                        <DialogFooter className="mt-4">
                            <Button type="submit">{type === "tambah" ? "Add Product" : "Update Product"}</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default ModalProduct;
