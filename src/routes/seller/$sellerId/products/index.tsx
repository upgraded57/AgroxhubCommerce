import {
  createFileRoute,
  useNavigate,
  useParams,
  useSearch,
} from '@tanstack/react-router'
import { BiStoreAlt } from 'react-icons/bi'
import { MdOutlineFilterAlt } from 'react-icons/md'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useGetSellerProducts } from '@/api/seller'
import Search from '@/components/search'
import ProductsLoader from '@/components/products-loader'
import ProductCard from '@/components/product-card'
import ProductsFilter from '@/components/products-filter'
import AppLayout from '@/layouts/app-layout'
import ProductNotFound from '@/components/product-not-found'

export const Route = createFileRoute('/seller/$sellerId/products/')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      category:
        typeof search.category === 'string' ? search.category : undefined,
      region: typeof search.region === 'string' ? search.region : undefined,
      currentPage:
        typeof search.currentPage === 'string' ? search.currentPage : undefined,
      minPrice:
        typeof search.minPrice === 'string' ? search.minPrice : undefined,
      maxPrice:
        typeof search.maxPrice === 'string' ? search.maxPrice : undefined,
      rating: typeof search.rating === 'string' ? search.rating : undefined,
      seller: typeof search.seller === 'string' ? search.seller : undefined,
    }
  },
})

function RouteComponent() {
  const navigate = useNavigate()
  const { sellerId } = useParams({
    from: '/seller/$sellerId/products/',
  })

  const params = useSearch({
    from: '/seller/$sellerId/products/',
  })

  const stripUndefined = (obj: any) =>
    Object.fromEntries(
      Object.entries(obj).filter(([_, value]) => value !== undefined),
    )

  const { isLoading, isFetching, data } = useGetSellerProducts(
    sellerId,
    stripUndefined(params),
  )

  const hasMore: boolean = data?.hasMore || false
  const products = data ? (data.products as Array<Product>) : []
  const seller = data ? (data.seller as Seller) : null

  const handleLoadNextPage = () => {
    if (hasMore) {
      const filters = {
        ...params,
        currentPage: String((parseInt(params.currentPage || '1') || 1) + 1),
      }

      navigate({
        to: '/seller/$sellerId/products',
        params: {
          sellerId: seller ? seller.id : '',
        },
        search: filters,
      })
    }
  }

  const handleLoadPreviousPage = () => {
    if (params.currentPage && parseInt(params.currentPage) > 1) {
      const filters = {
        ...params,
        currentPage: String((parseInt(params.currentPage || '1') || 1) - 1),
      }

      navigate({
        to: '/seller/$sellerId/products',
        params: {
          sellerId: seller ? seller.id : '',
        },
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
            <div
              role="alert"
              className="alert bg-light-grey-clr mb-2 shadow-none flex"
            >
              <BiStoreAlt className="text-xl" />
              <span>Store - {seller ? seller.name : ''}</span>
            </div>
            <div className="w-full flex justify-end sticky top-[80px]">
              <label
                htmlFor="filterDrawer"
                className="drawer-button lg:hidden w-max"
              >
                <div className="btn btn-sm bg-white">
                  <p className="text-sm font-normal">Filters</p>
                  <MdOutlineFilterAlt className="text-2xl" />
                </div>
              </label>
            </div>
            {/* Page content here */}
            {isLoading || isFetching ? (
              <ProductsLoader count={12} />
            ) : products.length > 0 ? (
              <div className="basis-19/25 w-full">
                <div className="gridEl">
                  {products.map((product, idx) => (
                    <ProductCard key={idx} product={product} />
                  ))}
                </div>

                <div className="w-full flex justify-center mt-4">
                  <div className="join">
                    <button
                      className="join-item btn bg-orange-clr text-white hover:bg-orange-clr hover:border-orange-clr"
                      disabled={
                        params.currentPage
                          ? parseInt(params.currentPage) <= 1
                          : true
                      }
                      onClick={handleLoadPreviousPage}
                    >
                      <FaChevronLeft />
                    </button>
                    <button className="join-item btn bg-transparent pointer-events-none">
                      Page {params.currentPage || 1}
                    </button>
                    <button
                      className="join-item btn bg-orange-clr text-white hover:bg-orange-clr hover:border-orange-clr"
                      disabled={!hasMore}
                      onClick={handleLoadNextPage}
                    >
                      <FaChevronRight />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full flex m-4">
                <ProductNotFound type="multiple" />
              </div>
            )}
          </div>
          <div className="drawer-side">
            <label
              htmlFor="filterDrawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu w-80 lg:w-60 xl:w-80 mt-12 lg:mt-0 p-4 lg:p-0 bg-white lg:bg-transparent">
              {/* Sidebar content here */}
              <ProductsFilter sellerPage />
            </ul>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
