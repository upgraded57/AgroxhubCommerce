import { useMutation, useQuery } from '@tanstack/react-query'
import { axiosInstance } from './axiosInstance'

export const useGetUser = () => {
  const token = localStorage.getItem('token')
  const getUser = async () => {
    const res = await axiosInstance.get(`/user`, { showToast: false })
    return res.data.user as User
  }
  return useQuery({
    queryKey: ['User'],
    queryFn: getUser,
    enabled: !!token,
    retry: false,
  })
}

export const useEditUser = () => {
  return useMutation({
    mutationFn: (data: FormData) => {
      return axiosInstance.patch('/user', data)
    },
  })
}
