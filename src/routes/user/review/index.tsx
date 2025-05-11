import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/user/review/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <div className="hidden md:flex items-center justify-between border-b py-2 md:pt-0">
        <h2 className="font-semibold text-sm md:text-2xl">
          REVIEWS / SUGGESTIONS
        </h2>
      </div>
    </>
  )
}
