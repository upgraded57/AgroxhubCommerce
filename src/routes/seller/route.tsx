import {
  Outlet,
  createFileRoute,
  useLocation,
  useRouterState,
} from '@tanstack/react-router'
import { UserProvider } from '@/providers/UserContext'
import { ResolveLocation } from '@/utils/resolve-location'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import MobileNav from '@/components/mobile-nav'
import DesktopNav from '@/components/desktop-nav'
import ProtectedRoute from '@/utils/protected-route'

export const Route = createFileRoute('/seller')({
  component: RouteComponent,
})

function RouteComponent() {
  const location = useLocation()
  const isLoadingRoute = useRouterState({
    select: (state) => state.status === 'pending',
  })

  const pathName = useRouterState({
    select: (state) => state.location.pathname,
  })

  const currentPage = ResolveLocation(location)

  const userLinks = [
    {
      path: '/user/account',
      title: 'My Account',
    },
    {
      path: '/user/orders',
      title: 'Orders',
    },
    {
      path: '/user/saved',
      title: 'Saved Items',
    },
    {
      path: '/user/recent',
      title: 'Recent Items',
    },
    {
      path: '/user/notifications',
      title: 'Notifications',
    },
    {
      path: '/user/help',
      title: 'Help Center',
    },
    {
      path: '/user/review',
      title: 'Review / Suggestion',
    },
  ]

  const sellerLinks = [
    {
      path: '/seller/analytics',
      title: 'Analytics',
    },
    {
      path: '/seller/products',
      title: 'Products',
    },
    {
      path: '/seller/finance',
      title: 'Finance',
    },
    {
      path: `/seller/followers`,
      title: 'Followers',
    },
    {
      path: '/seller/promotions',
      title: 'Promotions',
    },
  ]
  return (
    <UserProvider>
      <ProtectedRoute>
        <Navbar />
        <MobileNav
          currentPage={currentPage}
          sellerLinks={sellerLinks}
          userLinks={userLinks}
          isLoadingRoute={isLoadingRoute}
          pathName={pathName}
        />
        <div className="contEl md:mt-12">
          <div className="flex gap-4 items-start">
            <DesktopNav
              userLinks={userLinks}
              sellerLinks={sellerLinks}
              isLoadingRoute={isLoadingRoute}
              pathName={pathName}
            />
            <div className="basis-full md:basis-3/4 md:border md:rounded-lg md:px-4 md:py-2 overflow-x-hidden">
              <Outlet />
            </div>
          </div>
        </div>
        <Footer />
      </ProtectedRoute>
    </UserProvider>
  )
}
