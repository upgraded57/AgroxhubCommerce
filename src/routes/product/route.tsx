import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/product')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
