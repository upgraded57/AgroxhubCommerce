import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Cross1Icon, SpeakerLoudIcon } from '@radix-ui/react-icons'
import { useGetNotifications } from '@/api/notification'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import RecentProductListing from '@/components/recent-product-listing'

export default function AppLayout({
  children,
  noLeanMoreLink,
}: {
  children: React.ReactNode
  noLeanMoreLink?: boolean
}) {
  const [showNotifNotice, setShowNotifNotice] = useState(
    !!sessionStorage.getItem('closeNotifNotice'),
  )
  const { isLoading, data: notifications } = useGetNotifications()
  return (
    <>
      <Navbar />
      {!isLoading &&
        !showNotifNotice &&
        notifications &&
        notifications.filter((n) => n.unread).length > 0 && (
          <NewNotificationBanner
            notifications={notifications}
            setShowNotifNotice={setShowNotifNotice}
          />
        )}
      {children}
      <RecentProductListing />
      <Footer noLeanMoreLink={noLeanMoreLink} />
    </>
  )
}

const NewNotificationBanner = ({
  notifications,
  setShowNotifNotice,
}: {
  notifications: Array<NotificationList>
  setShowNotifNotice: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  return (
    <div className="h-8 w-full flex items-center justify-center bg-yellow-600 text-white gap-2">
      <SpeakerLoudIcon />
      <p className="text-sm">
        You have {notifications.filter((n) => n.unread).length} unread
        notifications.
      </p>
      <Link
        to="/user/notifications"
        className="text-sm underline cursor-pointer"
      >
        View Notifications
      </Link>

      <button
        className="btn btn-xs shadow-none bg-transparent border-none btn-square absolute right-2"
        onClick={() => {
          sessionStorage.setItem('closeNotifNotice', '1')
          setShowNotifNotice(true)
        }}
      >
        <Cross1Icon className="text-base-content" />
      </button>
    </div>
  )
}
