import { createFileRoute, useParams } from '@tanstack/react-router'
import { useState } from 'react'
import { useGetSingleProduct } from '@/api/product'
import LoadingProduct from '@/components/loading-product'
import { UseCreateReview } from '@/api/review'

export const Route = createFileRoute('/user/orders/product/$slug/review/')({
  component: RouteComponent,
})

function RouteComponent() {
  const slug = useParams({
    from: '/user/orders/product/$slug/review/',
    select: (p) => p.slug,
  })

  const { isLoading, data: product } = useGetSingleProduct(slug)
  const { mutate: createReview, isPending } = UseCreateReview()

  const [rating, setRating] = useState({
    product: 4,
    logistics: 4,
  })

  const [review, setReview] = useState({
    product: '',
    logistics: '',
  })

  const handleReview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createReview({
      slug,
      rating: rating.product,
      review: review.product,
    })
  }
  return (
    <form onSubmit={handleReview}>
      <h2 className="hidden border-b pb-2 md:block font-semibold text-2xl uppercase">
        product review
      </h2>

      {isLoading ? (
        <LoadingProduct />
      ) : (
        // Product images
        <div className="flex gap-4 flex-col md:flex-row mt-6">
          <div className="flex flex-col gap-2 w-full basis-2/5">
            <div className="w-full aspect-3/2 rounded-lg overflow-hidden skeleton">
              <img
                src={product?.images[0]}
                alt="Product image"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product?.images.map((image, idx) => (
                <div
                  className="aspect-3/2 rounded-sm overflow-hidden bg-gray-100"
                  key={idx}
                >
                  <img
                    src={image}
                    alt="Product Image"
                    className="w-full h-full object-cover opacity-50 hover:opacity-100"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="w-full basis-3/5">
            <h2 className="text-lg font-semibold md:font-normal md:text-3xl">
              {product?.name}
            </h2>
            <hr className="my-3" />

            <p className="text-sm">{product?.description}</p>
          </div>
        </div>
      )}

      {/* Product review */}
      <div className="my-12">
        <p className="text-sm font-semibold uppercase border-b">
          review this product
        </p>
        <div className="my-4 flex gap-2 items-center">
          <p className="text-sm">Product Rating:</p>
          <div className="rating gap-2">
            {[1, 2, 3, 4, 5].map((num, idx) => (
              <input
                key={idx}
                type="radio"
                name="productRating"
                className="mask mask-star-2 bg-orange-400"
                defaultChecked={num === 4}
                onChange={() =>
                  setRating((prev) => ({ ...prev, product: num }))
                }
              />
            ))}
          </div>
        </div>

        <label htmlFor="productReview" className="block">
          <p className="text-sm">Product Review</p>
          <textarea
            id="productReview"
            className="textarea w-full"
            value={review.product}
            onChange={(e) =>
              setReview((prev) => ({ ...prev, product: e.target.value }))
            }
            placeholder="Do you like the product?"
          ></textarea>
        </label>
      </div>

      {/* Logistics review */}
      <div className="mt-12">
        <p className="text-sm font-semibold uppercase border-b">
          review the logistic service
        </p>
        <div className="my-4 flex gap-2 items-center">
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
                  setRating((prev) => ({ ...prev, logistics: num }))
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
            onChange={(e) =>
              setReview((prev) => ({ ...prev, logistics: e.target.value }))
            }
          ></textarea>
        </label>
      </div>

      <button
        className="btn mt-4 btn-outline border-orange-clr text-orange-clr  hover:text-white hover:bg-orange-clr uppercase"
        disabled={isLoading || isPending}
        type="submit"
      >
        post review
      </button>
    </form>
  )
}
