'use client'
import { ProductsType } from '@/schema/products.schema'
import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'

type Props = {
    products: ProductsType[]
}


const ProductChart = ({ products }: Props) => {

    const dataPerCategory = products.reduce<Record<string, number>>((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1
        return acc
    }, {})

    const chartData = Object.entries(dataPerCategory).map(([category, count]) => ({
        category,
        total: count,
    }))
    return (
        <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#8884D8" name="Jumlah Produk" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default ProductChart
