import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useGetNotifications } from '@/api/notification'
import Loader from '@/components/loader'
import Notification from '@/components/notification'

export const Route = createFileRoute('/user/notifications/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [status, setStatus] = useState('all')
  const { isLoading, data: notifications } = useGetNotifications()
  return (
    <>
      <div className="hidden md:flex items-center justify-between border-b py-2 md:pt-0">
        <h2 className="font-semibold text-sm md:text-2xl">NOTIFICATIONS</h2>
        <select
          className="select select-xs uppercase font-normal"
          onChange={(e) => setStatus(e.target.value.toLowerCase())}
        >
          <option>All</option>
          <option>Read</option>
          <option>Unread</option>
        </select>
      </div>

      {isLoading ? (
        <Loader />
      ) : notifications && notifications.length < 1 ? (
        <div className=" flex items-center justify-center w-full py-10 border-[1px] rounded-lg my-10">
          <p className="text-sm py-10 text-center">
            You have no new notifications!
          </p>
        </div>
      ) : (
        notifications
          ?.filter((item) => {
            if (status === 'unread') {
              return item.unread
            } else {
              return item
            }
          })
          .map((notif, idx) => <Notification item={notif} key={idx} />)
      )}

      {/* <div className="flex w-full items-center justify-center mt-4 mb-12">
    <button className="btn  btn-outline border-orange-clr text-orange-clr uppercase hover:bg-orange-clr hover:border-orange-clr hover:text-white">
      mark all as read
    </button>
  </div> */}
    </>
  )
}
