import { createFileRoute, useParams } from '@tanstack/react-router'
import { useState } from 'react'
import {
  useGetLogisticsProvider,
  useReviewLogisticsProvider,
} from '@/api/logistics'
import Loader from '@/components/loader'

export const Route = createFileRoute('/user/orders/logistics/$id/review/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [feedback, setFeedback] = useState({
    rating: 4,
    review: '',
  })

  const id = useParams({
    from: '/user/orders/logistics/$id/review/',
    select: (p) => p.id,
  })

  const { data: provider, isLoading } = useGetLogisticsProvider(id)
  const { mutate: reviewProvider, isPending } = useReviewLogisticsProvider(id)

  const handleReview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    reviewProvider({
      rating: feedback.rating,
      review: feedback.review,
    })
  }

  return (
    <div className="">
      <h2 className="hidden border-b pb-2 md:block font-semibold text-2xl uppercase">
        logistics review
      </h2>

      {/* Logistics review */}
      {isLoading ? (
        <Loader />
      ) : (
        <form className="my-6 px-4" onSubmit={handleReview}>
          <p className="text-sm font-semibold uppercase mb-6">
            review the logistic service
          </p>
          <Profile
            name={provider?.name || ''}
            slug="Logistics Provider"
            image={provider?.avatar}
          />
          <div className="my-6 flex gap-2 items-center">
            <p className="text-sm">Logistic Service Rating:</p>
            <div className="rating gap-2">
              {[1, 2, 3, 4, 5].map((num, idx) => (
                <input
                  key={idx}
                  type="radio"
                  name="logisticsRating"
                  className="mask mask-star-2 bg-orange-400"
                  defaultChecked={num === 4}
                  onChange={() =>
                    setFeedback((prev) => ({ ...prev, logistics: num }))
                  }
                />
              ))}
            </div>
          </div>

          <label htmlFor="logisticsReview" className="block">
            <p className="text-sm">Logistic Service Review</p>
            <textarea
              id="logisticsReview"
              className="textarea w-full"
              placeholder="How was the logistics service?"
              value={feedback.review}
              onChange={(e) =>
                setFeedback((prev) => ({ ...prev, review: e.target.value }))
              }
            ></textarea>
          </label>
          <button
            className="btn mt-4 btn-outline border-orange-clr text-orange-clr  hover:text-white hover:bg-orange-clr uppercase"
            disabled={isPending}
            type="submit"
          >
            post review
          </button>
        </form>
      )}
    </div>
  )
}

const Profile = ({
  image,
  name,
  slug,
}: {
  image?: string | null
  name: string
  slug: string
}) => {
  const initials = name.split(' ')[0][0] + name.split(' ')[1][0]
  return (
    <div className="flex items-center gap-4">
      {image ? (
        <div className="avatar skeleton rounded-full">
          <div className="w-16 rounded-full overflow-hidden">
            <img src={image} className="w-full h-full object-cover" />
          </div>
        </div>
      ) : (
        <div className="avatar avatar-placeholder">
          <div className="bg-dark-green-clr w-16 rounded-full text-white">
            <span className="text-xl uppercase font-medium">{initials}</span>
          </div>
        </div>
      )}
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-xs text-slate-500">{slug}</p>
      </div>
    </div>
  )
}
