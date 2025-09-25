import { useMutation, useQuery } from '@tanstack/react-query'
import { axiosInstance } from './axiosInstance'

export const useGetLogisticsProvider = (logisticsId: string) => {
  type reqType = null
  type resType = BaseAPIResponse<'provider', LogisticsProvider>
  const getLogisticsProvider = async () => {
    const res = await axiosInstance.get<reqType, resType>(
      `/logistics/${logisticsId}`,
      {
        showToast: false,
      },
    )
    return res.data.provider
  }

  return useQuery({
    queryKey: ['logistics', logisticsId],
    queryFn: getLogisticsProvider,
  })
}

export const useReviewLogisticsProvider = (logisticsId: string) => {
  return useMutation({
    mutationFn: (data: { rating: number; review: string }) =>
      axiosInstance.post(`/logistics/${logisticsId}`, data),
  })
}
