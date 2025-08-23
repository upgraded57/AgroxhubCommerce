import { createFileRoute } from '@tanstack/react-router'
import { useGetRecentProducts } from '@/api/product'
import ProductsLoader from '@/components/products-loader'
import EmptyProducts from '@/components/empty-products'
import RecentProduct from '@/components/recent-product'

export const Route = createFileRoute('/user/recent/')({
  component: RouteComponent,
})

function RouteComponent() {
  const localRecents = localStorage.getItem('recent') || ''
  const recent = localRecents ? JSON.parse(localRecents) : []

  const { isFetching, data: products } = useGetRecentProducts(recent)
  return (
    <>
      <div className="hidden md:flex items-center justify-between border-b py-2 md:pt-0">
        <h2 className="font-semibold text-sm md:text-2xl">RECENT ITEMS</h2>
      </div>

      {/* Products List */}
      {isFetching ? (
        <ProductsLoader type="list" count={5} />
      ) : !products || products.length < 1 ? (
        <EmptyProducts text="You have not viewed a product recently" />
      ) : (
        products.map((product, idx) => (
          <RecentProduct key={idx} product={product} />
        ))
      )}
    </>
  )
}
