import { useMutation, useQuery } from '@tanstack/react-query'
import { axiosInstance } from './axiosInstance'

export const useGetSeller = (sellerId: string) => {
  type reqType = null
  type resType = BaseAPIResponse<'seller', Seller>
  const getSeller = async () => {
    const res = await axiosInstance.get<reqType, resType>(
      `/seller/${sellerId}`,
      {
        showToast: false,
      },
    )
    return res.data.seller
  }

  return useQuery({
    queryKey: ['Seller', sellerId],
    queryFn: getSeller,
  })
}

export const useGetSellers = () => {
  type reqType = null
  type resType = BaseAPIResponse<'sellers', Array<Seller>>
  const getSellers = async () => {
    const res = await axiosInstance.get<reqType, resType>('/seller', {
      showToast: false,
    })
    return res.data.sellers
  }

  return useQuery({
    queryKey: ['Sellers'],
    queryFn: getSellers,
  })
}

export const useGetSimilarSellers = (sellerId: string) => {
  type reqType = null
  type resType = BaseAPIResponse<'sellers', Array<Seller>>

  const getSimilarSellers = async () => {
    const res = await axiosInstance.get<reqType, resType>(
      `/seller/${sellerId}/similar`,
      {
        showToast: false,
      },
    )
    return res.data.sellers
  }

  return useQuery({
    queryKey: ['Similar Sellers', sellerId],
    queryFn: getSimilarSellers,
  })
}

export const useGetSellerProducts = (
  sellerId: string,
  params?: Record<string, any>,
) => {
  type reqType = null
  type resType = BaseAPIResponse<'hasMore', boolean> &
    BaseAPIResponse<'products', Array<Product>> &
    BaseAPIResponse<'seller', Seller> &
    BaseAPIResponse<'total', number>

  const getSellerProducts = async () => {
    const query = new URLSearchParams(params)
    const res = await axiosInstance.get<reqType, resType>(
      `/seller/${sellerId}/products`,
      {
        showToast: false,
        params: query,
      },
    )
    return res.data
  }
  return useQuery({
    queryKey: ['Seller Products', sellerId, JSON.stringify(params ?? {})],
    queryFn: getSellerProducts,
  })
}

export const useGetSellerMostPurchasedProducts = (sellerId: string) => {
  const getSellerMostPurchasedProducts = async () => {
    if (!sellerId) return null
    const res = await axiosInstance.get(
      `/seller/${sellerId}/products/mostPurchased`,
      {
        showToast: false,
      },
    )
    return res.data.products as Array<Product>
  }
  return useQuery({
    queryKey: ['Seller', 'Most Purchased', 'Products', sellerId],
    queryFn: getSellerMostPurchasedProducts,
    enabled: !!sellerId,
  })
}

export const useGetSellerNewestProducts = (sellerId: string) => {
  const getSellerNewestProducts = async () => {
    const res = await axiosInstance.get(`/seller/${sellerId}/products/newest`, {
      showToast: false,
    })
    return res.data.products as Array<Product>
  }
  return useQuery({
    queryKey: ['Seller', 'Products', sellerId],
    queryFn: getSellerNewestProducts,
  })
}

export const useGetSellerFollowers = () => {
  const getSellerFollowers = async () => {
    const res = await axiosInstance.get(`/seller/followers`, {
      showToast: false,
    })
    return res.data.followers as Array<User>
  }

  return useQuery({
    queryFn: getSellerFollowers,
    queryKey: ['Seller', 'Followers'],
  })
}

export const useFollowSeller = () => {
  return useMutation({
    mutationFn: (sellerId: string) => {
      return axiosInstance.post(`/seller/${sellerId}/follow`)
    },
  })
}

export const useCheckIsFollowing = (sellerId: string) => {
  const token = localStorage.getItem('token')
  const checkIsFollowing = async () => {
    const res = await axiosInstance.get(`/seller/${sellerId}/isFollowing`, {
      showToast: false,
    })
    return res.data.isFollowing as boolean
  }

  return useQuery({
    queryKey: ['isFollowing', sellerId],
    queryFn: checkIsFollowing,
    enabled: !!token,
    retry: false,
  })
}

export const useGetSellerSummary = () => {
  const getSummary = async () => {
    const res = await axiosInstance.get(`/seller/summary/`, {
      showToast: false,
    })
    return res.data.summary as SellerSummary
  }

  return useQuery({
    queryKey: ['Seller', 'Summary'],
    queryFn: getSummary,
  })
}

export const useGetSellerOrders = (params?: BaseAPIParam) => {
  type resType = BasePaginatedResponse<'orders', Array<SellerOrders>>

  const getSellerProducts = async () => {
    const res = await axiosInstance.get<unknown, resType>(`/seller/orders`, {
      showToast: false,
      params,
    })
    return res.data
  }
  return useQuery({
    queryKey: ['Seller', 'Orders', params],
    queryFn: getSellerProducts,
  })
}

export const useGetSellerSingleOrders = (id: string) => {
  const getSellerProducts = async () => {
    const res = await axiosInstance.get(`/seller/orders/${id}`, {
      showToast: false,
    })
    return res.data.order as SellerOrder
  }
  return useQuery({
    queryKey: ['Seller', 'Orders', id],
    queryFn: getSellerProducts,
  })
}

export const useGetSellerOrderSummary = () => {
  const getSummary = async () => {
    const res = await axiosInstance.get(`/seller/orders/summary/`, {
      showToast: false,
    })
    return res.data.summary as SellerOrdersSummary
  }

  return useQuery({
    queryKey: ['Seller', 'Orders', 'Summary'],
    queryFn: getSummary,
  })
}
