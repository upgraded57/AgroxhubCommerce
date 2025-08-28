import { Link } from '@tanstack/react-router'
import moment from 'moment'
import ProductRatings from './product-rating'
import tempImg from '@/assets/images/temp.jpeg'

export default function SavedProduct({ item }: { item: any }) {
  const product: Product = item.product

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
          <ProductRatings ratings={String(product.ratings)} />

          <h3 className="h-100">N{product.unitPrice.toLocaleString()}</h3>
          <p className="text-sm">
            Saved on - {moment(item.createdAt).format('DD MMMM, YYYY')}
          </p>
        </div>
      </div>
      <Link to="/product/$slug" params={{ slug: product.slug }}>
        <button className="btn btn-sm lg:btn-md green-gradient">View</button>
      </Link>
    </div>
  )
}
