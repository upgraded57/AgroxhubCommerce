import { Link } from '@tanstack/react-router'
import ProductRatings from './product-rating'
import tempImg from '@/assets/images/temp.jpeg'
import { currency } from '@/utils/helpers'

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      // to={`/products/${product?.slug}`}
      to="/product/$slug"
      params={{
        slug: product.slug,
      }}
      className="w-full rounded-lg border-[1px] p-2 border-transparent hover:shadow hover:border-light-grey-clr pb-3 mb-4 product-link"
    >
      <div className="w-full h-[128px] rounded-b-none bg-gray-200 rounded overflow-hidden">
        <img
          src={product.images.length > 0 ? product.images[0] : tempImg}
          alt={product.name}
          className="w-full h-full object-cover product-img"
        />
      </div>
      <p className="text-md pt-2 truncate" title={product.name}>
        {product.name}
      </p>
      <ProductRatings ratings={String(product.ratings)} />

      <h3 className="h-100">
        {currency(product.unitPrice)}
        {/* N{product.unitPrice.toLocaleString()} */}
      </h3>
    </Link>
  )
}
