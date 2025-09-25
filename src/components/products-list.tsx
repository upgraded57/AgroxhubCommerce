import { Link } from '@tanstack/react-router'
import { FaArrowRightLong } from 'react-icons/fa6'
import Product from './product-card'
import EmptyProducts from './empty-products'
import ProductsLoader from './products-loader'
import { useGetProducts } from '@/api/product'
import { EmptySearch } from '@/utils/empty-search-query'

export default function ProductsList({
  header,
  category,
}: {
  header: string
  category: string
}) {
  const { isLoading, data, isError } = useGetProducts({ category })

  if (isLoading)
    return (
      <div className="contEl mb-12">
        <div className="w-[300px] h-10 rounded skeleton"></div>
        <ProductsLoader count={4} />
      </div>
    )

  if (!data) {
    return (
      <div className="flex items-center justify-center w-full">
        <EmptyProducts text="No products found in this category" />
      </div>
    )
  }
  const products = data.products
  return (
    <div className="contEl mb-12">
      <div className="flex items-center justify-between">
        <h3 className=" h-100">{header}</h3>
        {!isError ||
          (products.length < 4 && (
            <Link
              to="/products"
              search={EmptySearch}
              className="flex items-center gap-3 hover:underline"
            >
              <p className="text-sm peer">See More</p>
              <FaArrowRightLong className="text-dark-green-clr peer-hover:translate-x-1 transition-transform" />
            </Link>
          ))}
      </div>
      {isError ? (
        <div className="flex items-center justify-center w-full">
          <EmptyProducts text="No products found in this category" />
        </div>
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
