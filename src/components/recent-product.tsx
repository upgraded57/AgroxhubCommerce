import { Link } from '@tanstack/react-router'
import { FaStar } from 'react-icons/fa6'
import moment from 'moment'
import tempImg from '@/assets/images/temp.jpeg'

export default function RecentProduct({ product }: { product: Product }) {
  const positiveRating = Array.from(
    { length: product.ratings },
    (_, index) => index,
  )

  const emptyRating = Array.from(
    { length: 5 - product.ratings },
    (_, index) => index,
  )
  return (
    <div className="w-full py-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="h-[100px] w-[100px] lg:h-[128px] lg:w-[128px] aspect-square bg-gray-200 rounded-lg overflow-hidden">
          <img
            src={product.images.length > 0 ? product.images[0] : tempImg}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className=" flex flex-col lg:gap-1">
          <p className="text-md truncate" title={product.name}>
            {product.name}
          </p>
          <div className="flex gap-1 items-center text-md text-yellow-300">
            {positiveRating.map((_, idx) => (
              <FaStar key={idx} />
            ))}
            {emptyRating.map((_, idx) => (
              <FaStar className="text-gray-200" key={idx} />
            ))}
          </div>
          <h3 className="h-100">N{product.unitPrice.toLocaleString()}</h3>
          <p className="text-sm">
            Saved on - {moment(product.createdAt).format('DD MMMM, YYYY')}
          </p>
        </div>
      </div>
      <Link
        to="/product/$slug"
        params={{
          slug: product.slug,
        }}
      >
        <button className="btn btn-sm lg:btn-md green-gradient">View</button>
      </Link>
    </div>
  )
}
