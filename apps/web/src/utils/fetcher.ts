import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'

interface FetcherProps extends Pick<AxiosRequestConfig<any>, 'method' | 'url' | 'data'> {
  token?: string
}

export const APIInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})

export const fetcher = ({ method, url, token, data }: FetcherProps) =>
  APIInstance({
    method,
    url,
    data,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  }).then((res) => res.data)
