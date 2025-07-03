import { ResponseProps } from "@/types";
import { AxiosInstance } from "axios";

const handleRequest = async <T>(instance: AxiosInstance, method: string, url: string, data?: any, params?: any): Promise<ResponseProps<T>> => {
  try {
    const response = await instance.request<T>({
      url,
      method,
      data,
      params,
    });
    return {
      data: response.data,
      status: response.status,
      message: response.statusText,
    };
  } catch (error: any) {
    return {
      data: null,
      status: error.response?.status || 500,
      message: error.response?.data?.message || error.response?.statusText || "An error occurred",
    };
  }
};

const apiService = {
  get: <T>(instance: AxiosInstance, url: string, params?: any) => handleRequest<T>(instance, "GET", url, undefined, params),
  post: <T>(instance: AxiosInstance, url: string, data: any) => handleRequest<T>(instance, "POST", url, data),
  patch: <T>(instance: AxiosInstance, url: string, data: any) => handleRequest<T>(instance, "PATCH", url, data),
  put: <T>(instance: AxiosInstance, url: string, data: any) => handleRequest<T>(instance, "PUT", url, data),
  delete: <T>(instance: AxiosInstance, url: string, data?: any) => handleRequest<T>(instance, "DELETE", url, data),
};

export default apiService;
