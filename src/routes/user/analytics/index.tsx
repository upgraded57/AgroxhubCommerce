import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/user/analytics/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/user/$userId/analytics/"!</div>
}
