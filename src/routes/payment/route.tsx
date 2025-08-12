import { Outlet, createFileRoute } from '@tanstack/react-router'
import { UserProvider } from '@/providers/UserContext'
import ProtectedRoute from '@/utils/protected-route'
import AppLayout from '@/layouts/app-layout'

export const Route = createFileRoute('/payment')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <UserProvider>
      <ProtectedRoute>
        <AppLayout>
          <Outlet />
        </AppLayout>
      </ProtectedRoute>
    </UserProvider>
  )
}
