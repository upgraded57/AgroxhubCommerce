import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from './axiosInstance'

export const useGetRegions = () => {
  type reqType = null
  type resType = BaseAPIResponse<'regions', Array<Region>>
  const getRegions = async () => {
    const res = await axiosInstance.get<reqType, resType>('/region', {
      showToast: false,
    })
    return res.data.regions
  }

  return useQuery({
    queryKey: ['Regions'],
    queryFn: getRegions,
  })
}
