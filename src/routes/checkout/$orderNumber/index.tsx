import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/checkout/$orderNumber/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/checkout/$orderNumber/"!</div>
}
