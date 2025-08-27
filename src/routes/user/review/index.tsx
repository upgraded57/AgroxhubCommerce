import { createFileRoute } from '@tanstack/react-router'
import { toast } from 'sonner'
import { FaRegPaperPlane } from 'react-icons/fa6'
import type { FormEvent } from 'react'

export const Route = createFileRoute('/user/review/')({
  component: RouteComponent,
})

function RouteComponent() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toast.info('Coming Soon', {
      description: 'This feature is coming soon. Stay tuned',
    })
  }
  return (
    <>
      <div className="hidden md:flex items-center justify-between border-b py-2 md:pt-0">
        <h2 className="font-semibold text-sm md:text-2xl">
          REVIEWS / SUGGESTIONS
        </h2>
      </div>

      <div role="alert" className="alert alert-info mt-6 text-white">
        <FaRegPaperPlane />

        <div className="flex gap-x-2 flex-col md:flex-row">
          <p>Need quick response or what to reach us directly?</p>
          <a
            href="mailto:hello@agroxhub.com"
            className="underline font-semibold"
          >
            Send us an email instead
          </a>
        </div>
      </div>

      <div className="my-6">
        <p className="text-sm">
          Noticed a problem while using any of our service? Do not hesitate to
          reach out to us. We&apos;re here and glad to help. We apologize if the
          problem has been a cause of any inconvenience to you. We promise to
          look into it as soon as it gets to us and feed you back.
        </p>

        <form className="mt-6 w-full" onSubmit={handleSubmit}>
          <label htmlFor="category" className="block w-full space-y-1">
            <p className="text-sm">Category</p>
            <select name="category" id="category" className="select min-w-full">
              <option value="" disabled>
                --Select Category---
              </option>
              <option value="seller">Product Seller</option>
              <option value="logistics">Logistics Provider</option>
              <option value="bug">Application / System Bug</option>
              <option value="suggestion">General Suggestion</option>
              <option value="others">Others</option>
            </select>
          </label>

          <label htmlFor="description" className="block w-full space-y-1 my-6">
            <p className="text-sm">Description</p>
            <textarea
              name="description"
              id="description"
              className="textarea min-w-full"
              rows={6}
            ></textarea>
          </label>

          <label htmlFor="attachment" className="block w-max space-y-1 mb-6">
            <p className="text-sm">Attach Files (e.g. screenshots)</p>
            <input
              name="attachment"
              id="attachment"
              className="file-input w-max"
              type="file"
              accept="image/*"
            />
          </label>

          <button className="btn btn-outline border-yellow-clr text-yellow-clr hover:bg-yellow-clr hover:text-white">
            Submit
          </button>
        </form>
      </div>
    </>
  )
}
