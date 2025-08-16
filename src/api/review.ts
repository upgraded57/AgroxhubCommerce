import { useMutation, useQuery } from '@tanstack/react-query'
import { axiosInstance } from './axiosInstance'

export const UseCreateReview = () => {
  return useMutation({
    mutationFn: (data: { slug: string; review?: string; rating: number }) =>
      axiosInstance.post('/reviews', data),
  })
}

export const useGetProductReviews = (slug: string) => {
  const getProductReview = async () => {
    const res = await axiosInstance.get(`/reviews/product/${slug}`, {
      showToast: false,
    })
    return res.data.reviews as Review
  }

  return useQuery({
    queryKey: ['reviews', slug],
    queryFn: getProductReview,
  })
}
