import { ProductsType } from "@/schema/products.schema";

export type PaginatedResponse<DataKey extends string, T> =
  { [key in DataKey]: T[] } & {
    total: number;
    skip: number;
    limit: number;
  };

export interface ResponseProps<T> {
  data: T | null
  status: number
  message: string
}

type Modal = "edit" | "tambah"
export interface ModalI {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: Modal
  data?: ProductsType
}