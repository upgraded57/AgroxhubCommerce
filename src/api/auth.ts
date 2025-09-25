import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from './axiosInstance'
import type { AxiosError } from 'axios'
import type { ApiErrorResponse } from '@/types/axios'

type ApiError = AxiosError<ApiErrorResponse>

interface LoginMutationData {
  email: string
  password: string
}

interface SignupMutationData {
  fullName: string
  email: string
  password: string
  type: string
}

interface LoginResponseData {
  type: User['type']
  id: string
}

interface VerifyOtpMutationData {
  userId: string
  otp: string
}

interface ResendOtpMutationData {
  userId: string
}

export const useLoginMutation = () => {
  type reqType = LoginMutationData
  type resType = BaseAPIResponse<'user', LoginResponseData> &
    BaseAPIResponse<'token', string>

  return useMutation<resType, ApiError, reqType>({
    mutationFn: (data) => {
      return axiosInstance.post('/auth/login', data)
    },
  })
}

export const useSignupMutation = () => {
  type reqType = SignupMutationData
  type resType = BaseAPIResponse<'userId', string>

  return useMutation<resType, ApiError, reqType>({
    mutationFn: (data) => {
      return axiosInstance.post('/auth/signup', data)
    },
  })
}

export const useVerifyOtpMutation = () => {
  type reqType = VerifyOtpMutationData
  type resType = BaseAPIResponse<'user', User>
  return useMutation<resType, ApiError, reqType>({
    mutationFn: (data) => {
      return axiosInstance.post('/auth/verify-otp', data)
    },
  })
}

export const useResendOtpMutation = () => {
  type reqType = ResendOtpMutationData
  type resType = BaseAPIResponse<'userId', string>
  return useMutation<resType, ApiError, reqType>({
    mutationFn: (data) => {
      return axiosInstance.post('/auth/resend-otp', data)
    },
  })
}
