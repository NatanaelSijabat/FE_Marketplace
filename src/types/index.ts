export interface ResponseProps<T> {
  data: T | null
  status: number
  message: string
}