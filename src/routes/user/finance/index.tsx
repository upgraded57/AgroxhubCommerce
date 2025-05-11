import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/user/finance/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/user/$userId/finance/"!</div>
}
