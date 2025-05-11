import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/user/help/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <div className="hidden md:flex items-center justify-between border-b py-2 md:pt-0">
        <h2 className="font-semibold text-sm md:text-2xl">HELP CENTER</h2>
      </div>
    </>
  )
}
