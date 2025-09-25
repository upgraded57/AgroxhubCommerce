import axios from 'axios'
import { toast } from 'sonner'
import type { AxiosResponse } from 'axios'
import type { ApiError } from '@/types/axios'

const baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:8800/api/v1'

export const axiosInstance = axios.create({
  baseURL,
})

let toastId: string

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    if (config.showToast !== false) {
      toastId = toast.loading('Processing Request', {
        description: 'Your request is being processed',
        id: 'baseToast',
      }) as string
    }

    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error: ApiError) => {
    const config = error.config

    if (config?.showToast !== false) {
      toast.error(error.response?.data.message || 'Request error', {
        id: toastId,
      })
    }

    return Promise.reject(error)
  },
)

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    const config = response.config

    if (config.showToast !== false) {
      toast.success('Success', {
        description: response.data?.message || 'Success',
        id: toastId,
      })
    }

    return response
  },
  (error: ApiError) => {
    const config = error.config

    if (config?.showToast !== false) {
      toast.error('Error', {
        description: error.response?.data.message || 'Something went wrong',
        id: toastId,
      })
    }

    if (
      error.response?.status === 401 &&
      error.response.data.message === 'Session expired. Please login again'
    ) {
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
    }

    return Promise.reject(error)
  },
)
