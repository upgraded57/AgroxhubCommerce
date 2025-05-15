import { Outlet, createFileRoute } from '@tanstack/react-router'
import ProtectedRoute from '@/utils/protected-route'
import { UserProvider } from '@/providers/UserContext'

export const Route = createFileRoute('/checkout')({
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
