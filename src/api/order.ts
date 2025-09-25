import { useMutation, useQuery } from '@tanstack/react-query'
import { axiosInstance } from './axiosInstance'

export const useGetSingleOrder = (orderNumber: string) => {
  type reqType = null
  type resType = BaseAPIResponse<'order', Order>
  const getSingleOrder = async () => {
    const res = await axiosInstance.get<reqType, resType>(
      `/order/${orderNumber}`,
      {
        showToast: false,
      },
    )
    return res.data.order
  }

  return useQuery({
    queryKey: ['Order', orderNumber],
    queryFn: getSingleOrder,
    enabled: !!orderNumber,
    retry: 2,
  })
}

export const useGetOrders = () => {
  type reqType = null
  type resType = BaseAPIResponse<'orders', Array<Order>>
  const getOrders = async () => {
    const res = await axiosInstance.get<reqType, resType>(`/order`, {
      showToast: false,
    })
    return res.data.orders
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
