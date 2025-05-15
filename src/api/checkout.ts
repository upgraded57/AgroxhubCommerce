import { useMutation, useQuery } from '@tanstack/react-query'
import { axiosInstance } from './axiosInstance'

interface CreateOrderProp {
  deliveryAddress: string
  deliveryRegionId: string
  cartId?: string
}

export const useGetOrder = (orderNumber: string) => {
  const getOrder = async () => {
    const res = await axiosInstance.get(`/checkout/${orderNumber}`, {
      showToast: false,
    })
    return res.data.order
  }

  return useQuery({
    queryKey: ['Order', orderNumber],
    queryFn: getOrder,
    enabled: !!orderNumber,
    retry: 2,
  })
}

export const useUpdateOrderItem = () => {
  return useMutation({
    mutationFn: (data: {
      slug: string
      type: 'increment' | 'decrement' | 'delete'
    }) => {
      return axiosInstance.patch('/checkout', data)
    },
  })
}

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: (data: CreateOrderProp) => {
      return axiosInstance.post('/checkout', data)
    },
  })
}

export const useGetProviders = (groupId: string) => {
  const getProviders = async () => {
    const res = await axiosInstance.get(`/checkout/${groupId}/providers`, {
      showToast: false,
    })
    return res.data.providers
  }

  return useQuery({
    queryKey: ['Order', groupId],
    queryFn: getProviders,
    enabled: !!groupId,
    retry: 2,
  })
}
