import { Outlet, createFileRoute } from '@tanstack/react-router'
import AppLayout from '@/layouts/app-layout'

export const Route = createFileRoute('/store')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  )
}
