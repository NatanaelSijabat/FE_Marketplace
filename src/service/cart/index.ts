import apiService from "@/network/apiService"
import { Api } from "@/network/axiosInstance"
import { AddCartT } from "@/schema/checkout.schema"
import { useMutation } from "@tanstack/react-query"

const addCart = async (data: AddCartT) => {
    return await apiService.post<any>(Api, `/carts/add`, data)
}

export const useAddCart = () => {
    return useMutation({
        mutationFn: (data: AddCartT) => addCart(data)
    })
}