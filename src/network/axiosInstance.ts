import axios, { AxiosInstance } from "axios";


export const Api: AxiosInstance = axios.create({
    baseURL: process.env.api,
});