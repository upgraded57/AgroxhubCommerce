import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from './axiosInstance'

export const useInitiatePayment = () => {
  return useMutation({
    mutationFn: (orderNumber: string) => {
      return axiosInstance.post('/pay', { orderNumber })
    },
  })
}

export const useVerifyPayment = () => {
  return useMutation({
    mutationFn: (referenceCode: string) => {
      return axiosInstance.post(
        '/pay/verify',
        { referenceCode },
        { showToast: false },
      )
    },
  })
}
