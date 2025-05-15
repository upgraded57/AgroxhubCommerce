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
    <>
      <div className="w-full max-w-sm py-10 mx-auto flex flex-col items-center overflow-x-hidden">
        <div className="w-[100px] h-[100px] mb-6 opacity-50">
          <Lottie animationData={AnimationNoProduct} width={100} height={100} />
        </div>
        {type === 'single' ? (
          <div className="space-y-4 text-center">
            <h1 className="text-lg font-medium">
              We couldn't find that product
            </h1>
            <p className="text-sm">
              It may have been deleted by the seller or is out of stock
              <br /> You can still browse other similar products from other
              sellers
            </p>
            <Link to="/products" search={EmptySearch}>
              <button className="btn bg-dark-green-clr text-white border-none">
                Browse Other Products
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4 text-center">
            <h1 className="text-lg font-medium">Nothing is Returned!</h1>
            <p className="text-sm">
              We could not find any product matching your search terms. <br />
              Try searching using a different term.
            </p>
          </div>
        )}
      </div>
    </>
  )
}
