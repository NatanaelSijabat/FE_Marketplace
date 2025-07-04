import apiService from "@/network/apiService"
import { Api } from "@/network/axiosInstance"
import { AddProductT, EditProductT, ProductCategories, ProductsType } from "@/schema/products.schema"
import { PaginatedResponse, ResponseProps } from "@/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const getProducts = async (categoryUrl?: string) => {
    const endpoint =
        categoryUrl && categoryUrl !== 'all'
            ? categoryUrl
            : '/products';
    const response = await apiService.get<ProductsType[]>(Api, endpoint);
    return response.data as unknown as PaginatedResponse<"products", ProductsType>;
};

export const useGetProducts = (category?: string) => {
    return useQuery({
        queryKey: ['products', category || 'all'],
        queryFn: () => getProducts(category),
    });
};

const addProduct = async (data: AddProductT) => {
    return await apiService.post<ResponseProps<ProductsType>>(Api, `/products/add`, data)
}

export const usePostProduct = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: AddProductT) => addProduct(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
        }
    })
}

const updateProduct = async (data: EditProductT) => {
    return await apiService.put<ResponseProps<ProductsType>>(Api, `/products/${data.id}`, data)
}

export const useUpdateProduct = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: EditProductT) => updateProduct(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
        }
    })
}

const deleteProduct = async (id: number) => {
    return await apiService.delete<ResponseProps<ProductsType>>(Api, `product/${id}`)
}

export const useDeleteProduct = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: number) => deleteProduct(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
        }
    })
}

const getProductsCategories = async () => {
    const response = await apiService.get<ProductCategories[]>(Api, `/products/categories`);
    return response.data
}

export const useGetProductsCategories = () => {
    return useQuery({
        queryKey: ['products-categories'],
        queryFn: getProductsCategories
    })
}