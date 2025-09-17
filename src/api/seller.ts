import { useMutation, useQuery } from '@tanstack/react-query'
import { axiosInstance } from './axiosInstance'

export const useGetSeller = (sellerId: string) => {
  const getSeller = async () => {
    const res = await axiosInstance.get(`/seller/${sellerId}`, {
      showToast: false,
    })
    return res.data.seller as Seller
  }

  return useQuery({
    queryKey: ['Seller', sellerId],
    queryFn: getSeller,
  })
}

export const useGetSellers = () => {
  const getSellers = async () => {
    const res = await axiosInstance.get('/seller', { showToast: false })
    return res.data.sellers as Array<Seller>
  }

  return useQuery({
    queryKey: ['Sellers'],
    queryFn: getSellers,
  })
}

export const useGetSimilarSellers = (sellerId: string) => {
  const getSimilarSellers = async () => {
    const res = await axiosInstance.get(`/seller/${sellerId}/similar`, {
      showToast: false,
    })
    return res.data.sellers as Array<Seller>
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
  const getSellerProducts = async () => {
    const query = new URLSearchParams(params)
    const res = await axiosInstance.get(
      `/seller/${sellerId}/products?${query}`,
      {
        showToast: false,
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

export const useGetSellerOrders = () => {
  const getSellerProducts = async () => {
    const res = await axiosInstance.get(`/seller/orders`, {
      showToast: false,
    })
    return res.data.orders as Array<SellerOrders>
  }
  return useQuery({
    queryKey: ['Seller', 'Orders'],
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
