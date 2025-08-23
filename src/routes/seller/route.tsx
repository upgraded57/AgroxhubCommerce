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

  return (
    <UserProvider>
      <ProtectedRoute>
        <Navbar />
        <MobileNav
          currentPage={currentPage}
          isLoadingRoute={isLoadingRoute}
          pathName={pathName}
        />
        <div className="contEl md:mt-12">
          <div className="flex gap-4 items-start">
            <DesktopNav isLoadingRoute={isLoadingRoute} pathName={pathName} />
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
