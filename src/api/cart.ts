import { useMutation, useQuery } from '@tanstack/react-query'
import { axiosInstance } from './axiosInstance'

export const useSyncCart = () => {
  return useMutation({
    mutationFn: (data: Array<CartItem>) =>
      axiosInstance.post(
        '/cart/sync',
        { cartItems: data },
        { showToast: false },
      ),
  })
}

export const useGetCartItems = () => {
  type reqType = null
  type resType = BaseAPIResponse<'cart', Array<CartItem> | null>

  const getCartItems = async () => {
    const res = await axiosInstance.get<reqType, resType>('/cart', {
      showToast: false,
    })
    if (res.data.cart) {
      return res.data.cart
    }

    return []
  }

  return useQuery({
    queryKey: ['Cart'],
    queryFn: getCartItems,
    enabled: false,
    retry: false,
  })
}

export const useAddItemToCart = () => {
  return useMutation({
    mutationFn: (data: CartItem) => {
      return axiosInstance.post('/cart/add', data)
    },
  })
}

export const useUpdateCartItem = () => {
  return useMutation({
    mutationFn: (data: {
      slug: string
      type: 'increment' | 'decrement' | 'delete'
    }) => {
      return axiosInstance.patch(`/cart`, data)
    },
  })
}
