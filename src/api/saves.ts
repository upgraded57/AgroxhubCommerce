import { useMutation, useQuery } from '@tanstack/react-query'
import { axiosInstance } from './axiosInstance'

const token = localStorage.getItem('token')
export const useGetSavedProducts = () => {
  type reqType = null
  type resType = BaseAPIResponse<'savedProducts', Array<SavedItem>>
  const getSavedProducts = async () => {
    const res = await axiosInstance.get<reqType, resType>('/saves', {
      showToast: false,
    })
    return res.data.savedProducts
  }

  return useQuery({
    queryKey: ['Saves'],
    queryFn: getSavedProducts,
    retry: false,
    enabled: !!token,
  })
}

export const useSaveProduct = () => {
  return useMutation({
    mutationFn: (productId: string) => {
      return axiosInstance.post('/saves', {
        productId,
      })
    },
  })
}
