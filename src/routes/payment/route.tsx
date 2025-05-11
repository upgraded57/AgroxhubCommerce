import { Outlet, createFileRoute } from '@tanstack/react-router'
import { UserProvider } from '@/providers/UserContext'
import ProtectedRoute from '@/utils/protected-route'

export const Route = createFileRoute('/payment')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <UserProvider>
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    </UserProvider>
  )
}
