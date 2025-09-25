import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from './axiosInstance'

export const useGetNotifications = () => {
  type reqType = null
  type resType = BaseAPIResponse<'notifications', Array<NotificationList>>
  const getNotifications = async () => {
    const res = await axiosInstance.get<reqType, resType>('notifications', {
      showToast: false,
    })
    return res.data.notifications
  }

  return useQuery({
    queryKey: ['Notifications'],
    queryFn: getNotifications,
  })
}

export const useGetSingleNotification = (id: string) => {
  type reqType = null
  type resType = BaseAPIResponse<'notification', NotificationList>
  const getSingleNotifications = async () => {
    const res = await axiosInstance.get<reqType, resType>(
      `notifications/${id}`,
      {
        showToast: false,
      },
    )
    return res.data.notification
  }

  return useQuery({
    queryKey: ['Notification', id],
    queryFn: getSingleNotifications,
  })
}
