import { Outlet, createFileRoute } from '@tanstack/react-router'
import ProtectedRoute from '@/utils/protected-route'

export const Route = createFileRoute('/checkout')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  )
}
