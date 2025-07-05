'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDollar } from '@/helpers'
import { useCartStore } from '@/store/cart-store'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { AddCartT, CheckoutSchema, CheckoutT } from '@/schema/checkout.schema'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAddCart } from '@/service/cart'
import { notifError, notifSucces } from '@/lib/toast'
import { useRouter } from 'next/navigation'

const CheckoutView = () => {

    const { data } = useSession()
    const itemsCart = useCartStore((state) => state.items)
    const clearCart = useCartStore((state) => state.clearCart)
    const { mutateAsync: saveCart } = useAddCart()
    const router = useRouter()

    const subtotal = itemsCart.reduce(
        (total, item) => total + item.price * (item.quantity || 1),
        0
    )
    const tax = subtotal * 0.1
    const total = subtotal + tax

    const form = useForm<CheckoutT>({
        resolver: zodResolver(CheckoutSchema),
        defaultValues: {
            firstname: '',
            lastname: '',
            email: '',
            phone: "",
            address: "",
            city: "",
            state: "",
            zip_code: "",
            cardholder_name: "",
            card_number: "",
            expiry_date: "",
            cvv: "",
        }
    })

    useEffect(() => {
        if (data?.user) {
            form.reset({
                firstname: data.user.firstName || '',
                lastname: data.user.lastName || '',
                email: data.user.email || '',
                phone: '',
                address: '',
                city: '',
                state: '',
                zip_code: '',
                cardholder_name: '',
                card_number: '',
                expiry_date: '',
                cvv: '',
            })
        }
    }, [data?.user, form])
    const shape = (CheckoutSchema as z.ZodObject<any>).shape

    const onSubmit = () => {
        if (!data?.user?.id) {
            return;
        }
        const body: AddCartT = {
            userId: data.user.id,
            products: itemsCart.map((item) => ({
                id: item.id,
                quantity: item.quantity
            }))
        }
        saveCart(body).then((res) => {
            if (res?.status === 201) {
                notifSucces("Success", "Checkout successfully");
                form.reset()
                router.push("/cart")
                clearCart()
            } else {
                notifError(res?.message || "Failed to added product");
            }
        })
    }

    return (
        <>
            <div className='flex items-center w-full justify-between p-3'>
                <div>
                    <h1 className='font-bold text-3xl'>Checkout</h1>
                    <h3 className='text-gray-400'>Complete your purchase</h3>
                </div>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                        <div className="lg:col-span-2 space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl font-semibold text-gray-800">
                                        Shipping Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {Object.entries(shape)
                                            .filter(([key]) =>
                                                ['firstname', 'lastname', 'email', 'phone', 'address'].includes(key)
                                            )
                                            .map(([key]) => {
                                                const inputType =
                                                    key === 'email'
                                                        ? 'email'
                                                        : key === 'phone'
                                                            ? 'number'
                                                            : 'text';

                                                const isFullWidth = key === "address";

                                                return (
                                                    <div
                                                        key={key}
                                                        className={isFullWidth ? "md:col-span-2 w-full" : ""}
                                                    >
                                                        <FormField
                                                            control={form.control}
                                                            name={key as keyof CheckoutT}
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel className="capitalize">{key.replace(/_/g, ' ')}</FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            {...field}
                                                                            type={inputType}
                                                                            autoComplete='off'
                                                                            className="border border-gray-300 focus:border-black focus:ring-0"
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                );
                                            })}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                        {['city', 'state', 'zip_code'].map((key) => (
                                            <FormField
                                                key={key}
                                                control={form.control}
                                                name={key as keyof CheckoutT}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="capitalize">{key.replace(/_/g, ' ')}</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                type={key === 'zip_code' ? 'number' : 'text'}
                                                                className="border border-gray-300 focus:border-black focus:ring-0"
                                                                autoComplete='off'
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl font-semibold text-gray-800">
                                        Payment Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {Object.entries(shape)
                                            .filter(([key]) =>
                                                ['cardholder_name', 'card_number', 'expiry_date', 'cvv'].includes(key)
                                            )
                                            .map(([key, schema]) => {
                                                const inputType = key === 'card_number' || key === 'cvv' ? 'number' : 'text';

                                                const isFullWidth = key === "cardholder_name" || key === "card_number";


                                                return (
                                                    <div className={isFullWidth ? "md:col-span-2 w-full" : ""}
                                                        key={key}
                                                    >
                                                        <FormField
                                                            control={form.control}
                                                            name={key as keyof CheckoutT}
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel className="capitalize">{key.replace(/_/g, ' ')}</FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            {...field}
                                                                            type={inputType}
                                                                            className="border border-gray-300 focus:border-black focus:ring-0"
                                                                            placeholder={key === "card_number" ? "1234 5678 9012 3456" : key === "expiry_date" ? "MM/YY" : key === "cvv" ? "123" : ""}
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                );
                                            })}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <Card className="w-full max-w-md mx-auto lg:mx-0 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-gray-800">Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-sm ">
                                {itemsCart.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center justify-between gap-4"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Image
                                                src={item.thumbnail}
                                                alt="image"
                                                width={50}
                                                height={50}
                                                className="rounded-md object-cover"
                                            />
                                            <div>
                                                <h1 className="font-medium text-sm line-clamp-1">{item.title}</h1>
                                                <span className="text-xs text-muted-foreground">Qty: {item.quantity}</span>
                                            </div>
                                        </div>
                                        <span className="text-sm font-semibold">{formatDollar(item.price)}</span>
                                    </div>
                                ))}
                                <hr className="my-2 border-gray-200" />
                                <div className="flex justify-between text-base">
                                    <span>Subtotal</span>
                                    <span >{formatDollar(subtotal)}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Tax</span>
                                    <span>{formatDollar(tax)}</span>
                                </div>

                                <hr className="my-2 border-gray-200" />

                                <div className="flex justify-between text-xl font-bold">
                                    <span>Total</span>
                                    <span>{formatDollar(total)}</span>
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col gap-3 px-6">
                                <Button className="w-full p-5" type='submit' >Complete Order</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </form>
            </Form>
        </>
    )
}

export default CheckoutView