import Lottie from 'lottie-react'
import { Link } from '@tanstack/react-router'
import AnimationNoProduct from '@/assets/json/AnimationNoProduct.json'
import { EmptySearch } from '@/utils/empty-search-query'

export default function ProductNotFound({
  type,
}: {
  type: 'single' | 'multiple'
}) {
  return (
    <div className="px-[4vw] lg:px-0">
      <div className="w-full max-w-lg mx-auto p-10 pt-0 rounded-lg border-[1px] border-light-grey-clr mb-10 overflow-x-hidden">
        <div className="w-[250px] h-[250px] relative -left-12 mb-6">
          <Lottie
            animationData={AnimationNoProduct}
            width={250}
            height={250}
            loop={false}
          />
        </div>
        {type === 'single' ? (
          <div className="space-y-4">
            <h1 className="text-lg font-semibold">
              We couldn't find that product
            </h1>
            <p className="text-sm">
              It may have been deleted by the seller or is out of stock. You can
              still browse other similar products from other sellers
            </p>
            <Link to="/products" search={EmptySearch}>
              <button className="btn bg-dark-green-clr text-white border-none">
                Browse Other Products
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <h1 className="text-lg font-semibold">Nothing is Returned!</h1>
            <p className="text-sm">
              We could not find any product matching your search terms. Try
              searching using a different term.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
