import 'axios'
import type { AxiosError } from 'axios'

declare module 'axios' {
  export interface AxiosRequestConfig {
    showToast?: boolean
  }
}

interface ApiErrorResponse {
  status: boolean
  message: string
  error: any
  order?: any
}

type ApiError = AxiosError<ApiErrorResponse>
