import { Link, createFileRoute } from '@tanstack/react-router'
import { use } from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import { useGetSellerProducts } from '@/api/seller'
import { UserContext } from '@/providers/UserContext'
import ProductsLoader from '@/components/products-loader'
import SellerProduct from '@/components/seller-product'
import EmptyProducts from '@/components/empty-products'

export const Route = createFileRoute('/seller/products/')({
  component: RouteComponent,
})

function RouteComponent() {
  const seller = use(UserContext).user
  const { isLoading, isFetching, data } = useGetSellerProducts(seller!.id)
  const products: Array<Product> = data?.products || []

  return (
    <>
      <div className="hidden md:flex items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-2xl">PRODUCTS</h2>
          <Link to="/seller/products/create" className="btn btn-sm btn-success">
            <FaPlusCircle />
            <p className="uppercase">create new</p>
          </Link>
        </div>
        <select
          className="select select-sm uppercase font-normal"
          disabled={products.length === 0}
        >
          <option>This Month</option>
          <option>Last Month</option>
          <option>This Year</option>
        </select>
      </div>

      <div className="flex md:hidden items-center justify-between py-2">
        <Link to="/seller/products/create" className="btn btn-sm btn-success">
          <FaPlusCircle />
          <p className="uppercase">create new</p>
        </Link>
        <div className="flex items-center gap-2">
          <p className="text-sm uppercase">filter:</p>
          <select
            className="select select-sm uppercase font-normal"
            disabled={products.length === 0}
          >
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Year</option>
          </select>
        </div>
      </div>

      {isLoading || isFetching ? (
        <ProductsLoader count={8} />
      ) : products.length > 0 ? (
        <div className="gridEl">
          {products.map((product, idx) => (
            <SellerProduct product={product} key={idx} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center mb-16">
          <EmptyProducts text="You have no products" />
          <Link to="/seller/products/create" className="btn btn-success">
            <FaPlusCircle className="text-lg" />
            Create First Product
          </Link>
        </div>
      )}
    </>
  )
}
