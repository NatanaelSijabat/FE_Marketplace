'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { formatDollar, hitungHargaSebelumDiskon } from '@/helpers'
import { notifSucces } from '@/lib/toast'
import { useGetProducts, useGetProductsCategories } from '@/service/product'
import { useCartStore } from '@/store/cart-store'
import { BadgeAlert, Search, ShoppingCart, Star } from 'lucide-react'
import Image from 'next/image'
import React, { useMemo, useState } from 'react'

const ShopView = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('default')
    const { data: kategori } = useGetProductsCategories()
    const { data: dataProducts } = useGetProducts(selectedCategory);

    const sortingOptions = [
        { label: 'Name A-Z', value: 'name' },
        { label: 'Price: Low to High', value: 'price_low' },
        { label: 'Price: High to Low', value: 'price_high' },
        { label: 'Highest Rated', value: 'high_rated' },
    ]

    const handleSelect = (value: string) => {
        setSelectedCategory(value);
        setSearchTerm('');
    };

    const handleSortSelect = (value: string) => {
        setSortBy(value)
    }


    const filteredProducts = useMemo(() => {
        if (!dataProducts?.products) return []

        let result = [...dataProducts.products]

        if (searchTerm) {
            result = result.filter((product) =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        switch (sortBy) {
            case 'name':
                result.sort((a, b) => a.title.localeCompare(b.title))
                break
            case 'price_low':
                result.sort((a, b) => a.price - b.price)
                break
            case 'price_high':
                result.sort((a, b) => b.price - a.price)
                break
            case 'high_rated':
                result.sort((a, b) => b.rating - a.rating)
                break
        }

        return result
    }, [dataProducts, searchTerm, sortBy])

    const items = useCartStore((state) => state.items)
    const addToCart = useCartStore((state) => state.addToCart)

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
                    <Select onValueChange={handleSortSelect} defaultValue='default'>
                        <SelectTrigger className="w-[180px] cursor-pointer">
                            <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="default">Default</SelectItem>
                            {sortingOptions?.map((item, idx) => (
                                <SelectItem value={item.value} key={idx}>{item.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((item) => (
                    <Card key={item.id} className="flex flex-col group">
                        <CardHeader className="relative p-0">
                            {item.discountPercentage > 0 && (
                                <Badge
                                    variant="destructive"
                                    className="absolute top-2 left-2 font-bold z-10 hover:bg-gray-600"
                                >
                                    -{Math.round(item.discountPercentage)}%
                                </Badge>
                            )}
                            <div className="w-full h-48 relative overflow-hidden">
                                <Image
                                    src={item.thumbnail ?? "/default-avatar.png"}
                                    alt={item.title}
                                    fill
                                    className="object-contain rounded-t-md transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                        </CardHeader>

                        <CardContent className="flex flex-col flex-grow space-y-3 p-4">
                            <CardTitle className="text-lg line-clamp-1">{item.title}</CardTitle>
                            <CardDescription className="line-clamp-2 text-sm text-muted-foreground">
                                {item.description}
                            </CardDescription>

                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <span className="text-lg font-bold">{formatDollar(item.price)}</span>
                                    <span className="line-through text-sm text-gray-500">
                                        {formatDollar(hitungHargaSebelumDiskon(item.price, item.discountPercentage))}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Star size={16} className="fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm">{item.rating}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center text-sm">
                                <Badge variant="secondary" className="capitalize">
                                    {item.category}
                                </Badge>
                                <span className="text-muted-foreground">
                                    {item.stock} in stock
                                </span>
                            </div>
                        </CardContent>

                        <CardFooter className="p-4 pt-0 mt-auto">
                            <Button
                                className="w-full flex gap-2"
                                onClick={() => {
                                    addToCart({
                                        id: item.id,
                                        title: item.title,
                                        price: item.price,
                                        thumbnail: item.thumbnail,
                                    })
                                    notifSucces("Added to cart", `${item.title} has been added to your cart`)
                                }
                                }
                            >
                                <ShoppingCart size={20} />
                                Add to cart
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

        </>
    )
}

export default ShopView