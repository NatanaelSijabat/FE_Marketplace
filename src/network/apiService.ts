import { AxiosInstance } from "axios";

interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

const handleRequest = async <T>(
  instance: AxiosInstance,
  method: string,
  url: string,
  data?: any,
  params?: any
): Promise<ApiResponse<T>> => {
  const response = await instance.request<T>({ url, method, data, params });
  return {
    data: response.data,
    status: response.status,
    message: response.statusText,
  };
};

const apiService = {
  get: <T>(instance: AxiosInstance, url: string, params?: any) =>
    handleRequest<T>(instance, "GET", url, undefined, params),
  post: <T>(instance: AxiosInstance, url: string, data: any) =>
    handleRequest<T>(instance, "POST", url, data),
  patch: <T>(instance: AxiosInstance, url: string, data: any) =>
    handleRequest<T>(instance, "PATCH", url, data),
  put: <T>(instance: AxiosInstance, url: string, data: any) =>
    handleRequest<T>(instance, "PUT", url, data),
  delete: <T>(instance: AxiosInstance, url: string, data?: any) =>
    handleRequest<T>(instance, "DELETE", url, data),
};

export default apiService;
