'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { formatDollar, hitungHargaSebelumDiskon } from '@/helpers'
import { useGetProducts, useGetProductsCategories } from '@/service/product'
import { BadgeAlert, Search, ShoppingCart, Star } from 'lucide-react'
import Image from 'next/image'
import React, { useMemo, useState } from 'react'

const ShopView = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const { data: kategori } = useGetProductsCategories()
    const { data: dataProducts } = useGetProducts(selectedCategory);

    const handleSelect = (value: string) => {
        setSelectedCategory(value);
        setSearchTerm('');
    };


    const filteredProducts = useMemo(() => {
        if (!dataProducts?.products) return [];
        return dataProducts.products.filter((product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [dataProducts, searchTerm]);


    return (
        <>
            <div className='flex items-center w-full justify-between p-3'>
                <div>
                    <h1 className='font-semibold text-3xl'>Shop</h1>
                    <h3 className='text-gray-400'>Browse and purchase products</h3>
                </div>
            </div>
            <div className="flex items-center w-full gap-4 p-3">
                <div className="relative flex-grow">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                        size={18}
                    />
                    <Input
                        type="text"
                        placeholder="Search products..."
                        className="pl-10 w-full"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex-shrink-0">
                    <Select onValueChange={handleSelect} defaultValue='all'>
                        <SelectTrigger className="w-[180px] cursor-pointer">
                            <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {kategori?.map((item, idx) => (
                                <SelectItem value={item.url} key={idx}>{item.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex-shrink-0">
                    <Select onValueChange={handleSelect} defaultValue='all'>
                        <SelectTrigger className="w-[180px] cursor-pointer">
                            <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {kategori?.map((item, idx) => (
                                <SelectItem value={item.url} key={idx}>{item.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {filteredProducts.map((item) => (
                    <Card key={item.id}>
                        <CardHeader>
                            <Badge variant="destructive" className=' hover:bg-gray-700 transition-colors font-bold'>-{Math.round(item.discountPercentage)}%</Badge>
                            <Image
                                src={item.thumbnail ?? "/default-avatar.png"}
                                alt="Product"
                                width={100}
                                height={100}
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 rounded"
                            />
                        </CardHeader>
                        <CardContent>
                            <CardTitle className="text-2xl line-clamp-1">{item.title}</CardTitle>
                            <CardDescription className="line-clamp-2">
                                {item.description}
                            </CardDescription>
                            <div className='flex items-center justify-between my-2'>
                                <div className='flex gap-2 items-center'>
                                    <span className='font-bold text-2xl'>{formatDollar(item.price)}</span>
                                    <span className='line-through text-sm text-gray-500'>{formatDollar(hitungHargaSebelumDiskon(item.price, item.discountPercentage))}</span>
                                </div>
                                <div className='flex gap-1 items-center'>
                                    <Star size={20} className='fill-yellow-400 text-yellow-400' />
                                    <span>
                                        {item.rating}
                                    </span>
                                </div>
                            </div>
                            <div className='flex items-center justify-between my-2'>
                                <Badge variant="secondary" className='capitalize'>{item.category}</Badge>
                                <span className='text-muted-foreground'>
                                    {item.stock} in stock
                                </span>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className='w-full'>
                                <ShoppingCart size={28} absoluteStrokeWidth />
                                <span className='text-base'>
                                    Add to cart
                                </span>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </>
    )
}

export default ShopView