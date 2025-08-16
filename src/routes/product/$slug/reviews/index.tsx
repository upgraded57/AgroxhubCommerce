import { createFileRoute, useParams } from '@tanstack/react-router'
import moment from 'moment'
import AppLayout from '@/layouts/app-layout'
import { useGetProductReviews } from '@/api/review'
import Loader from '@/components/loader'
import ProductRatings from '@/components/product-rating'
import EmptyFile from '@/components/empty-file'

export const Route = createFileRoute('/product/$slug/reviews/')({
  component: RouteComponent,
})

function RouteComponent() {
  const slug = useParams({
    from: '/product/$slug/reviews/',
    select: (p) => p.slug,
  })

  const Profile = ({
    image,
    name,
    slug,
  }: {
    image?: string
    name: string
    slug: string
  }) => {
    const initials = name.split(' ')[0][0] + name.split(' ')[1][0]
    return (
      <div className="flex items-center gap-4">
        {image ? (
          <div className="avatar skeleton rounded-full">
            <div className="w-12 rounded-full overflow-hidden">
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

  const { data: reviews, isLoading, isError } = useGetProductReviews(slug)

  const getRatingCount = (count: number) =>
    reviews?.reviews.filter((r) => parseInt(r.rating) === count).length

  return (
    <AppLayout>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div className="flex items-center justify-center flex-col">
          <EmptyFile text="This product has no review yet" />
        </div>
      ) : (
        <div className="contEl my-12">
          <h3 className="h-100 pb-2 border-b">
            Product Feedback - {reviews?.product.name}
          </h3>
          <div className="flex items-center gap-8 mt-6 mb-12">
            <div className="w-[150px] h-[150px] aspect-square overflow-hidden rounded-lg skeleton">
              <img
                src={reviews?.product.images[0]}
                alt={reviews?.product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-4">
                <p className="text-sm">Average:</p>

                <p className="text-sm fone-semibold">
                  {reviews?.product.ratings}
                </p>
              </div>

              <div className="grid grid-cols-2 space-y-1 mt-2">
                <p className="text-xs">5 stars</p>
                <p className="text-xs"> {getRatingCount(5)}</p>
                <p className="text-xs">4 stars</p>
                <p className="text-xs"> {getRatingCount(4)}</p>
                <p className="text-xs">3 stars</p>
                <p className="text-xs"> {getRatingCount(3)}</p>
                <p className="text-xs">2 stars</p>
                <p className="text-xs"> {getRatingCount(2)}</p>
                <p className="text-xs">1 stars</p>
                <p className="text-xs"> {getRatingCount(1)}</p>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="">
            <h3 className="text-lg font-semibold mb-4">
              Reviews ({reviews?.reviews.length})
            </h3>
            <div className="space-y-6">
              {reviews?.reviews.map((review, idx) => {
                return (
                  <div className="" key={idx}>
                    <div className="rounded-lg bg-white shadow-md shadow-gray-100 border p-4">
                      <Profile
                        name={review.user.name}
                        image={review.user.avatar}
                        slug={
                          moment(reviews.createdAt).format('MMM DD, YYYY') ||
                          '---'
                        }
                      />
                      <div className="mt-4">
                        <ProductRatings ratings={review.rating} />
                        <p className="text-sm">{review.review}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  )
}
