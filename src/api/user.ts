import { useMutation, useQuery } from '@tanstack/react-query'
import { axiosInstance } from './axiosInstance'
import type { ApiError } from '@/types/axios'

export const useGetUser = () => {
  type reqType = null
  type resType = BaseAPIResponse<'user', User>

  const token = localStorage.getItem('token')
  const getUser = async () => {
    const res = await axiosInstance.get<reqType, resType>(`/user`, {
      showToast: false,
    })
    return res.data.user
  }
  return useQuery({
    queryKey: ['User', token],
    queryFn: getUser,
    enabled: !!token,
    retry: false,
  })
}

export const useEditUser = () => {
  type reqType = FormData
  type resType = BaseAPIResponse<'user', User>
  return useMutation<resType, ApiError, reqType>({
    mutationFn: (data) => {
      return axiosInstance.patch<reqType, resType>('/user', data)
    },
  })
}
