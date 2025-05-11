import { Link } from '@tanstack/react-router'
import { FaStar } from 'react-icons/fa6'
import tempImg from '@/assets/images/temp.jpeg'

export default function ProductCard({ product }: { product: Product }) {
  const positiveRating = Array.from(
    { length: product.ratings },
    (_, index) => index,
  )

  const emptyRating = Array.from(
    { length: 5 - product.ratings },
    (_, index) => index,
  )
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
      <div className="flex gap-1 items-center text-md text-yellow-300 py-2">
        {positiveRating.map((_, idx) => (
          <FaStar key={idx} />
        ))}
        {emptyRating.map((_, idx) => (
          <FaStar className="text-gray-200" key={idx} />
        ))}
      </div>
      <h3 className="h-100">N{product.unitPrice.toLocaleString()}</h3>
    </Link>
  )
}
