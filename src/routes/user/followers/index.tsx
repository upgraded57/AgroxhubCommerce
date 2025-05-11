import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/user/followers/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/user/$userId/followers/"!</div>
}
