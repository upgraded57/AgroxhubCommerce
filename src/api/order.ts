import { useMutation, useQuery } from '@tanstack/react-query'
import { axiosInstance } from './axiosInstance'

export const useGetSingleOrder = (orderNumber: string) => {
  const getSingleOrder = async () => {
    const res = await axiosInstance.get(`/order/${orderNumber}`, {
      showToast: false,
    })
    return res.data.order as Order
  }

  return useQuery({
    queryKey: ['Order', orderNumber],
    queryFn: getSingleOrder,
    enabled: !!orderNumber,
    retry: 2,
  })
}

export const useGetOrders = () => {
  const getOrders = async () => {
    const res = await axiosInstance.get(`/order`, {
      showToast: false,
    })
    return res.data.orders as Array<Order>
  }

  return useQuery({
    queryKey: ['Orders'],
    queryFn: getOrders,
    retry: 2,
  })
}

export const userAddOrderNotes = () => {
  return useMutation({
    mutationFn: (data: { orderNumber: string; notes: any }) => {
      return axiosInstance.patch(`/order/${data.orderNumber}/notes`, data.notes)
    },
  })
}
