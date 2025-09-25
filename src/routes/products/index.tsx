import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'
import { MdOutlineFilterAlt } from 'react-icons/md'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Search from '@/components/search'
import { useGetProducts } from '@/api/product'
import ProductsLoader from '@/components/products-loader'
import ProductCard from '@/components/product-card'
import ProductsFilter from '@/components/products-filter'
import BeASeller from '@/components/be-a-seller'
import AppLayout from '@/layouts/app-layout'
import ProductNotFound from '@/components/product-not-found'

export const Route = createFileRoute('/products/')({
  component: RouteComponent,
  validateSearch: (search: AllProductsParams & BasePaginatedRequest) => search,
})

function RouteComponent() {
  const navigate = useNavigate()
  const params = useSearch({ from: '/products/' })

  const stripUndefined = (obj: any) =>
    Object.fromEntries(
      Object.entries(obj).filter(([_, value]) => value !== undefined),
    )

  const { isLoading, isFetching, data, isError } = useGetProducts(
    stripUndefined(params),
  )

  const products = data?.products
  const totalPages = data ? data.pages : 1
  const currentPage = data ? data.page : 1
  const canNext = data ? totalPages > Number(currentPage) : false

  const handleLoadNextPage = () => {
    if (canNext) {
      const filters = {
        ...params,
        page: String((parseInt(params.page || '1') || 1) + 1),
      }

      navigate({
        to: '/products',
        search: filters,
      })
    }
  }

  const handleLoadPreviousPage = () => {
    if (params.page && parseInt(params.page) > 1) {
      const filters = {
        ...params,
        page: String((parseInt(params.page || '1') || 1) - 1),
      }

      navigate({
        to: '/products',
        search: filters,
      })
    }
  }

  return (
    <AppLayout>
      <Search />
      <div className="max-w-(--breakpoint-xl) mx-auto px-[4vw] -mt-6 mb-10">
        <div className="drawer lg:gap-4 lg:drawer-open">
          <input id="filterDrawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <div className="w-full flex justify-end sticky top-[80px]">
              <label
                htmlFor="filterDrawer"
                className="drawer-button lg:hidden w-max"
              >
                <div className="btn btn-sm bg-white mb-4">
                  <p className="text-sm font-normal">Filters</p>
                  <MdOutlineFilterAlt className="text-2xl" />
                </div>
              </label>
            </div>
            {/* Page content here */}
            {isLoading || isFetching ? (
              <ProductsLoader count={12} />
            ) : isError ? (
              <ProductNotFound type="multiple" />
            ) : products && products.length > 0 ? (
              <div className="basis-19/25 w-full">
                <div className="gridEl">
                  {products.map((product, idx) => (
                    <ProductCard key={idx} product={product} />
                  ))}
                </div>

                <div className="w-full flex justify-center mt-4">
                  <div className="join ">
                    <button
                      className="join-item btn bg-orange-clr border-transparent text-white"
                      disabled={Number(currentPage) === 1}
                      onClick={handleLoadPreviousPage}
                    >
                      <FaChevronLeft />
                    </button>
                    <button className="join-item btn bg-transparent pointer-events-none">
                      Page {currentPage || 1} of {totalPages}
                    </button>
                    <button
                      className="join-item btn bg-orange-clr border-transparent text-white"
                      disabled={!canNext}
                      onClick={handleLoadNextPage}
                    >
                      <FaChevronRight />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <ProductNotFound type="multiple" />
            )}
          </div>
          <div className="drawer-side">
            <label
              htmlFor="filterDrawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <div className="w-80 lg:w-60 xl:w-80 mt-12 lg:mt-0 p-4 lg:p-0 bg-white lg:bg-transparent">
              {/* Sidebar content here */}
              <ProductsFilter />
            </div>
          </div>
        </div>
      </div>

      <BeASeller />
    </AppLayout>
  )
}
