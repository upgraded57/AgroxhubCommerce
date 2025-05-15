import { useGetRecentProducts } from '../api/product'
import ProductsLoader from './products-loader'
import Product from './product-card'
import EmptyFile from './empty-file'

export default function RecentProductListing() {
  const existingRecentProductSlugs = localStorage.getItem('recent') || ''
  const recent = existingRecentProductSlugs
    ? (JSON.parse(existingRecentProductSlugs) as Array<string>)
    : []

  const { isFetching, data: products } = useGetRecentProducts(recent)
  return (
    <div className="contEl mb-12">
      <h3 className="h-100">Your Recent Views</h3>

      <div className="w-full carousel gap-3">
        {isFetching ? (
          <ProductsLoader count={5} />
        ) : products && products.length > 0 ? (
          products.map((product, idx) => (
            <div className="w-[200px] carousel-item" key={idx}>
              <Product product={product} />
            </div>
          ))
        ) : (
          <EmptyFile text="You have not viewed any product" />
        )}
      </div>
    </div>
  )
}
