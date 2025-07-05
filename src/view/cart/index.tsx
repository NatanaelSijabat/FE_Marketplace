'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useCartStore } from '@/store/cart-store'
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import React from 'react'
import { formatDollar } from '@/helpers'

const CartView = () => {
    const router = useRouter()
    const itemsCart = useCartStore((state) => state.items)
    const updateQty = useCartStore((state) => state.updateQty)
    const clearCart = useCartStore((state) => state.clearCart)
    const removeFromCart = useCartStore((state) => state.removeFromCart)

    const subtotal = itemsCart.reduce(
        (total, item) => total + item.price * (item.quantity || 1),
        0
    )
    const tax = subtotal * 0.1
    const total = subtotal + tax

    return (
        <>
            {itemsCart.length !== 0 ?
                <>
                    <div className='flex items-center w-full justify-between p-3'>
                        <div>
                            <h1 className='font-bold text-3xl'>Shopping Cart</h1>
                            <h3 className='text-gray-400'>{`${itemsCart.length} items in your cart`}</h3>
                        </div>
                        <Button variant="outline" onClick={clearCart} >Clear Cart</Button>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                        <div className="lg:col-span-2 space-y-4">
                            {itemsCart.map((item) => (
                                <Card key={item.id}>
                                    <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4">
                                        <div className="flex items-center gap-4 flex-1">
                                            <Image
                                                src={item.thumbnail}
                                                alt="image"
                                                width={70}
                                                height={100}
                                                className="rounded-md object-cover"
                                            />
                                            <div>
                                                <h1 className="font-semibold text-lg line-clamp-1">{item.title}</h1>
                                                <span className="font-bold text-xl text-primary">
                                                    {formatDollar(item.price)}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => updateQty(item.id, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus size={16} />
                                            </Button>
                                            <span className="text-lg font-medium w-6 text-center">{item.quantity}</span>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => updateQty(item.id, item.quantity + 1)}
                                            >
                                                <Plus size={16} />
                                            </Button>
                                        </div>

                                        <div className="flex flex-col items-center">
                                            <span className="font-semibold text-lg">
                                                {formatDollar(item.price * item.quantity)}
                                            </span>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeFromCart(item.id)}
                                            >
                                                <Trash2 className="text-red-500" size={20} />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="w-full max-w-md mx-auto lg:mx-0">
                            <Card className="shadow-md">
                                <CardHeader>
                                    <CardTitle className="text-xl font-semibold text-gray-800">Order Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 text-sm ">
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
                                    <Button className="w-full p-5" onClick={() => router.push("/checkout")}>Proceed to Checkout</Button>
                                    <Button variant="outline" className="w-full p-5" onClick={() => router.push("/shop")}>Continue Shopping</Button>
                                </CardFooter>
                            </Card>
                        </div>

                    </div>

                </> : (
                    <div className="flex items-center justify-center min-h-[60vh] px-4">
                        <div className="flex flex-col items-center text-center space-y-3">
                            <ShoppingBag size={100} className="text-muted-foreground" />
                            <h1 className="text-xl font-bold text-gray-800">Your cart is empty</h1>
                            <span className="text-sm text-gray-500">Add some products to get started</span>
                            <Button className="mt-2" onClick={() => router.push("/shop")}>Continue Shopping</Button>
                        </div >
                    </div >
                )
            }
        </>
    )
}

export default CartView
