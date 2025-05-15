import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from './axiosInstance'

interface LoginData {
  email: string
  password: string
}
interface SignupData {
  fullName: string
  email: string
  password: string
  type: string
}

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (data: LoginData) => {
      return axiosInstance.post('/auth/login', data)
    },
  })
}

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: (data: SignupData) => {
      return axiosInstance.post('/auth/signup', data)
    },
  })
}

export const useVerifyOtpMutation = () => {
  return useMutation({
    mutationFn: (data: { userId: string; otp: string }) => {
      return axiosInstance.post('/auth/verify-otp', data)
    },
  })
}

export const useResendOtpMutation = () => {
  return useMutation({
    mutationFn: (data: { userId: string }) => {
      return axiosInstance.post('/auth/resend-otp', data)
    },
  })
}
