import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/seller/finance/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Finance</div>
}
