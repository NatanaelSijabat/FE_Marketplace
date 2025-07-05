'use client'
import { ProductsType } from '@/schema/products.schema'
import React from 'react'
import {
    PieChart,
    Pie,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from 'recharts'

type Props = {
    products: ProductsType[]
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    percent,
    index,
    name,
}: any) => {
    const RADIAN = Math.PI / 180
    const radius = outerRadius + 20
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
        <text
            x={x}
            y={y}
            fill={COLORS[index % COLORS.length]}
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
            fontSize={14}
        >
            {`${name} ${(percent * 100).toFixed(0)}%`}
        </text>
    )
}
const ProductPieChart = ({ products }: Props) => {
    const categoryData = products.reduce<Record<string, number>>((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1
        return acc
    }, {})

    const chartData = Object.entries(categoryData).map(([category, count]) => ({
        name: category,
        value: count,
    }))

    return (
        <div className="w-full h-[400px]">
            <h2 className="text-xl font-semibold">Category Distribution</h2>
            <p className="text-sm text-muted-foreground mb-4">Pie chart view of product categories</p>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        stroke="none"
                        label={renderCustomLabel}
                        labelLine={false}
                    >
                        {chartData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default ProductPieChart
