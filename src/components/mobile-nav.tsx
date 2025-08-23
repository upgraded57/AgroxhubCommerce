import { Link } from '@tanstack/react-router'
import { use } from 'react'
import { MdFilterList } from 'react-icons/md'
import { UserContext } from '@/providers/UserContext'
import { useGetNotifications } from '@/api/notification'
import { sellerLinks, userLinks } from '@/utils/routes'

interface Props {
  pathName: string
  isLoadingRoute: boolean
  currentPage: string
}

export default function MobileNav({
  currentPage,
  isLoadingRoute,
  pathName,
}: Props) {
  const user = use(UserContext).user
  const isSeller = user?.type === 'farmer' || user?.type === 'wholesaler'
  const { data: notifications } = useGetNotifications()
  const unreadNotifications = notifications?.filter((n) => n.unread).length || 0

  return (
    <div className="flex justify-between items-center p-4 bg-light-grey-clr md:hidden">
      <h3 className="text-lg font-semibold uppercase">{currentPage}</h3>

      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="m-1">
          <MdFilterList className="text-2xl" />
        </div>
        <ul
          id="dropdown-content"
          tabIndex={0}
          className="dropdown-content z-1 menu p-2 shadow-sm bg-base-100 rounded-box w-52"
        >
          {userLinks.map((link, idx) => (
            <li key={idx}>
              <Link className="py-2 flex space-x-2" to={link.path}>
                {link.title}
                {isLoadingRoute && pathName === link.path && (
                  <span className="loading loading-spinner text-grey-clr" />
                )}
                {link.title.toLowerCase().includes('notification') &&
                  unreadNotifications && (
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-xs text-orange-clr font-bold border border-orange-clr">
                      {unreadNotifications}
                    </span>
                  )}
              </Link>
            </li>
          ))}

          {isSeller && (
            <div>
              <p className="text-sm font-semibold uppercase mt-5 mb-2 border-b">
                seller
              </p>
              {sellerLinks.map((link, idx) => (
                <li key={idx}>
                  <Link className="py-2 flex space-x-2" to={link.path}>
                    {link.title}
                    {isLoadingRoute && pathName === link.path && (
                      <span className="loading loading-spinner text-grey-clr" />
                    )}
                  </Link>
                </li>
              ))}
            </div>
          )}
        </ul>
      </div>
    </div>
  )
}
