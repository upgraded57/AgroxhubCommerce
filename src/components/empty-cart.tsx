import Lottie from 'lottie-react'
import { Link } from '@tanstack/react-router'
import AnimationNoProduct from '@/assets/json/AnimationNoProduct.json'
import { EmptySearch } from '@/utils/empty-search-query'

export default function EmptyCart() {
  return (
    <>
      <div className="w-full max-w-sm py-10 mx-auto flex flex-col items-center overflow-x-hidden">
        <div className="w-[100px] h-[100px] mb-6 opacity-50">
          <Lottie animationData={AnimationNoProduct} width={100} height={100} />
        </div>

        <div className="space-y-4 text-center">
          <h1 className="text-lg font-medium">Your cart is empty!</h1>
          <p className="text-sm">
            You have no product in your cart. <br /> Add products to your cart
            by browsing through our large catalog of products.
          </p>
          <Link to="/products" search={EmptySearch}>
            <button className="btn bg-dark-green-clr text-white border-none">
              Browse Products
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}
