'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useGetProducts } from '@/service/product';
import { Package, ShoppingCart, TrendingUp, Users } from 'lucide-react'
import React from 'react'

const DashboardView = () => {
    const { data: dataProducts } = useGetProducts();

    return (
        <>
            <div className='flex items-center w-full justify-between p-3'>
                <div>
                    <h1 className='font-bold text-3xl'>Dashboard</h1>
                    <h3 className='text-gray-400'>Overview of your e-commerce metrics</h3>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>Total Products</span>
                            <Package size={16} className="text-muted-foreground" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-y-2">
                        <h1 className="text-2xl font-bold">{dataProducts?.total}</h1>
                        <span className="text-sm text-muted-foreground">Available in store</span>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>Total Users</span>
                            <Users size={16} className="text-muted-foreground" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-y-2">
                        <h1 className="text-2xl font-bold">{dataProducts?.total}</h1>
                        <span className="text-sm text-muted-foreground">Registered customers</span>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>Active Carts</span>
                            <ShoppingCart size={16} className="text-muted-foreground" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-y-2">
                        <h1 className="text-2xl font-bold">{dataProducts?.total}</h1>
                        <span className="text-sm text-muted-foreground">Items in carts</span>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>Total Revenue</span>
                            <TrendingUp size={16} className="text-muted-foreground" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-y-2">
                        <h1 className="text-2xl font-bold">{dataProducts?.total}</h1>
                        <span className="text-sm text-muted-foreground">From all carts</span>
                    </CardContent>
                </Card>
            </div>


        </>
    )
}

export default DashboardView