'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { CirclePlus, Search, SquarePen, Star, Trash2 } from 'lucide-react'
import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { useDeleteProduct, useGetProducts, useGetProductsCategories } from '@/service/product'
import ModalProduct from './modal'
import { notifError, notifSucces } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const ProductView = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const { data: dataProducts } = useGetProducts(selectedCategory);
    const [openTambah, setOpenTambah] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)

    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const { mutateAsync: deleteProduct } = useDeleteProduct()
    const { data: kategori } = useGetProductsCategories()

    const filteredProducts = useMemo(() => {
        if (!dataProducts?.products) return [];
        return dataProducts.products.filter((product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [dataProducts, searchTerm]);


    const handleDelete = (id: number) => {
        deleteProduct(id).then((res) => {
            if (res?.status === 200) {
                notifSucces("Sukses Delete Product");
            } else {
                notifError(res.message);
            }
        });
    }

    const handleSelect = (value: string) => {
        setSelectedCategory(value);
        setSearchTerm('');
    };


    return (
        <>
            <div className='flex items-center w-full justify-between p-3'>
                <div>
                    <h1 className='font-semibold text-3xl'>Products</h1>
                    <h3 className='text-gray-400'>Manage your product inventory</h3>
                </div>
                <div>
                    <Button onClick={() => setOpenTambah(!openTambah)}>
                        <CirclePlus size={32} strokeWidth={2.25} absoluteStrokeWidth />
                        <span>
                            Add Product
                        </span>
                    </Button>
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
            </div>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((item) => (
                    <Card key={item.id}>
                        <CardHeader>
                            <Image
                                src={item.thumbnail ?? "/default-avatar.png"}
                                alt="Product"
                                width={100}
                                height={100}
                                className="w-full object-contain"
                            />
                        </CardHeader>
                        <CardContent>
                            <CardTitle className="text-2xl line-clamp-1">{item.title}</CardTitle>
                            <CardDescription className="line-clamp-2">
                                {item.description}
                            </CardDescription>
                            <div className='flex items-center justify-between my-2'>
                                <span className='font-bold text-2xl'>${item.price}</span>
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
                                    Stock : {item.stock}
                                </span>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <div className='flex gap-2'>
                                <Button variant="outline" onClick={() => { setOpenEdit(!openEdit); setSelectedProduct(item) }} >
                                    <SquarePen size="sm" />
                                </Button>
                                <Button variant="outline" onClick={() => handleDelete(item.id)}>
                                    <Trash2 size="sm" />
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <ModalProduct open={openTambah} setOpen={setOpenTambah} type="tambah" />
            <ModalProduct open={openEdit} setOpen={setOpenEdit} type="edit" data={selectedProduct} />

        </>
    )
}

export default ProductView