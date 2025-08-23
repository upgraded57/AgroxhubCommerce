import { Link } from '@tanstack/react-router'
import { use } from 'react'
import { UserContext } from '@/providers/UserContext'
import { useGetNotifications } from '@/api/notification'
import { sellerLinks, userLinks } from '@/utils/routes'

interface Props {
  pathName: string
  isLoadingRoute: boolean
}
export default function DesktopNav({ isLoadingRoute, pathName }: Props) {
  const user = use(UserContext).user
  const isSeller = user?.type === 'wholesaler' || user?.type === 'farmer'
  const { data: notifications } = useGetNotifications()
  const unreadNotifications = notifications?.filter((n) => n.unread).length || 0

  return (
    <div className="nav-lg basis-1/4 hidden md:block uppercase text-sm sticky top-[100px]">
      <div className="bg-light-grey-clr rounded-lg w-full overflow-hidden mb-5">
        {userLinks.map((userLink, idx) => (
          <div
            className="w-full flex space-x-4 border-b hover:bg-gray-200 relative"
            key={idx}
          >
            <Link
              key={idx}
              to={userLink.path}
              className={`w-full py-2 pl-4 m-0 flex items-center gap-4 ${!isLoadingRoute && pathName === userLink.path && 'bg-dark-green-clr text-white'}`}
            >
              {userLink.title}
              {userLink.title.toLowerCase().includes('notification') &&
              unreadNotifications ? (
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-xs text-orange-clr font-bold border border-orange-clr">
                  {unreadNotifications}
                </span>
              ) : (
                ''
              )}
            </Link>
            {isLoadingRoute && pathName === userLink.path && (
              <span className="loading loading-spinner text-grey-clr pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" />
            )}
          </div>
        ))}
      </div>

      {isSeller && (
        <>
          <p className="text-sm font-bold uppercase mb-2">sellers</p>
          <div className="bg-light-grey-clr rounded-lg w-full overflow-hidden">
            {sellerLinks.map((sellerLink, idx) => (
              <div
                className="w-full flex space-x-4 border-b hover:bg-gray-200 relative"
                key={idx}
              >
                <Link
                  key={idx}
                  to={sellerLink.path}
                  className={`w-full py-2 pl-4 m-0 ${!isLoadingRoute && pathName === sellerLink.path && 'bg-dark-green-clr text-white'}`}
                >
                  {sellerLink.title}
                </Link>
                {isLoadingRoute && pathName === sellerLink.path && (
                  <span className="loading loading-spinner text-grey-clr pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
