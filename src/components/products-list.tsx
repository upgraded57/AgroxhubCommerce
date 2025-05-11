import { Link } from '@tanstack/react-router'
import { FaArrowRightLong } from 'react-icons/fa6'
import Product from './product-card'
import ProductsLoader from './products-loader'
import { useGetProducts } from '@/api/product'

export default function ProductsList({
  header,
  category,
}: {
  header: string
  category: string
}) {
  const filter = new URLSearchParams({
    category,
  })

  const { isLoading, data } = useGetProducts(filter)
  const products = data?.products as Array<Product>
  return (
    <div className="contEl mb-12">
      <div className="flex items-center justify-between">
        <h3 className=" h-100">{header}</h3>
        <Link
          to="/products"
          search={{
            category: category,
            region: undefined,
            currentPage: undefined,
            minPrice: undefined,
            maxPrice: undefined,
            rating: undefined,
            seller: undefined,
          }}
          className="flex items-center gap-3 hover:underline"
        >
          <p className="text-sm peer">See More</p>
          <FaArrowRightLong className="text-dark-green-clr peer-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      {isLoading ? (
        <ProductsLoader count={4} />
      ) : (
        <div className="gridEl w-full">
          {products
            // ?.sort(() => Math.random() - 0.5)
            .slice(0, 4)
            .map((product, idx) => (
              <Product product={product} key={idx} />
            ))}
        </div>
      )}
    </div>
  )
}
