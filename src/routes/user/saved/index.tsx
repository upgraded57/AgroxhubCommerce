import { createFileRoute } from '@tanstack/react-router'
import { useGetSavedProducts } from '@/api/saves'
import ProductsLoader from '@/components/products-loader'
import EmptyProducts from '@/components/empty-products'
import SavedProduct from '@/components/saved-product'

export const Route = createFileRoute('/user/saved/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { isLoading, data: products } = useGetSavedProducts()
  return (
    <>
      <div className="hidden md:flex items-center justify-between border-b py-2 md:pt-0">
        <h2 className="font-semibold text-sm md:text-2xl">SAVED ITEMS</h2>
      </div>

      {/* Products List */}
      {isLoading ? (
        <ProductsLoader type="list" count={5} />
      ) : products && products.length === 0 ? (
        <EmptyProducts text="You have no saved products yet" />
      ) : (
        products?.map((item, idx) => <SavedProduct key={idx} item={item} />)
      )}
    </>
  )
}
