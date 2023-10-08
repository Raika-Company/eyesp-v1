import { AxiosHeaders } from "axios"

export interface ResponseType<T> {
  config: any
  data: T
  headers: AxiosHeaders
  request: XMLHttpRequest
  status: number
  statusText: string
}