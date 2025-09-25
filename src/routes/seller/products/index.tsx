import { Link, createFileRoute, useSearch } from '@tanstack/react-router'
import { use } from 'react'
import { BsSearch } from 'react-icons/bs'
import { FaPlus, FaPlusCircle } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { useGetSellerProducts } from '@/api/seller'
import { UserContext } from '@/providers/UserContext'
import ProductsLoader from '@/components/products-loader'
import SellerProduct from '@/components/seller-product'
import EmptyProducts from '@/components/empty-products'

export const Route = createFileRoute('/seller/products/')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      q: typeof search.q === 'string' ? search.q.trim() : undefined,
    }
  },
})

function RouteComponent() {
  const params = useSearch({
    from: '/seller/products/',
  })
  const seller = use(UserContext).user
  const { isLoading, isFetching, data } = useGetSellerProducts(seller!.id, {
    q: params.q !== undefined ? params.q : '',
  })
  const products = data?.products || []

  return (
    <>
      <div className="hidden md:flex items-center justify-between pb-2 mb-6">
        <div className="border-b w-full">
          <h2 className="font-semibold text-2xl">PRODUCTS</h2>
        </div>
      </div>

      {/* Search */}
      <form
        action="/seller/products"
        className="relative w-full max-w-[500px] flex items-center mx-auto mt-8 md:mt:0 mb-8"
      >
        <label className="input border-r-0 bg-[#f5f5f5] rounded-r-none flex items-center gap-2 w-full relative">
          <BsSearch className="text-gray-300" />
          <input
            type="text"
            name="q"
            className="grow"
            placeholder="Search ..."
            value={params.q}
          />
          {params.q?.length ? (
            <Link
              to="/seller/products"
              className="absolute right-0"
              search={{
                q: undefined,
              }}
            >
              <button className="btn btn-ghost" type="button">
                <IoClose className="text-xl" />
              </button>
            </Link>
          ) : (
            ''
          )}
        </label>

        <button
          type="submit"
          className="btn px-5 md:px-8 rounded-l-none green-gradient border-0"
        >
          Search
        </button>
      </form>

      {isLoading || isFetching ? (
        <ProductsLoader count={8} />
      ) : products.length > 0 ? (
        <div className="gridEl gap-4">
          <Link
            to="/seller/products/create"
            className="w-full rounded-lg p-2 h-full bg-green-50 mb-4 flex flex-col items-center justify-center gap-4 border border-transparent hover:shdow-lg hover:bg-green-100/60 transition-all"
          >
            <span className="bg-green-200 w-14 h-14 rounded-full flex items-center justify-center">
              <FaPlus className="text-green-500 text-xl" />
            </span>
            <p className="text-center text-sm">
              Create New <br />
              Product
            </p>
          </Link>
          {products.map((product, idx) => (
            <SellerProduct product={product} key={idx} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center mb-16">
          <EmptyProducts text="Either you have no products or your search term did not match any of your product" />
          <Link to="/seller/products/create" className="btn btn-success">
            <FaPlusCircle className="text-lg" />
            Create New Product
          </Link>
        </div>
      )}
    </>
  )
}
