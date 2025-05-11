import { Link } from '@tanstack/react-router'
import { useQueryClient } from '@tanstack/react-query'
import { FaRegEye, FaStar } from 'react-icons/fa'
import { BiEdit } from 'react-icons/bi'
import { MdDeleteForever } from 'react-icons/md'
import { BsGraphUp } from 'react-icons/bs'
import { UseDeleteProduct } from '../api/product'

const tooltipStyle = 'btn btn-sm rounded-md btn-square text-xl cursor-pointer'
export default function SellerProduct({ product }: { product: Product }) {
  const queryClient = useQueryClient()
  const { mutate: deleteProduct } = UseDeleteProduct(
    queryClient,
    product.sellerId,
  )
  const handleDeleteProduct = () => {
    deleteProduct(product.slug)
  }
  return (
    <div className="w-full rounded-lg p-2 border-[1px] border-transparent hover:shadow hover:border-light-grey-clr mb-4">
      <div className="w-full bg-light-grey-clr h-[80px] md:h-[100px] xl:h-[120px] rounded-b-none rounded overflow-hidden">
        <img
          src={product.images[0]}
          alt="Product Image"
          className="w-full h-full object-cover"
        />
      </div>
      <p className="text-md pt-2 truncate" title={product.name}>
        {product.name}
      </p>
      <div className="flex gap-1 items-center text-md text-yellow-300 py-2">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar className="text-gray-200" />
      </div>
      <h3 className="h-100">N{product.unitPrice.toLocaleString()}</h3>
      <div className="flex items-center gap-2 mt-2">
        <Link
          to="/product/$slug"
          params={{
            slug: product.slug,
          }}
          className={tooltipStyle}
        >
          <span className="tooltip tooltip-right" data-tip="View Product">
            <FaRegEye />
          </span>
        </Link>
        <Link
          to="/seller/products/$slug/edit"
          params={{
            slug: product.slug,
          }}
          className={tooltipStyle}
        >
          <span className="tooltip" data-tip="Edit Product">
            <BiEdit />
          </span>
        </Link>
        <span className={tooltipStyle} onClick={handleDeleteProduct}>
          <span className="tooltip" data-tip="Delete Product">
            <MdDeleteForever />
          </span>
        </span>
        <Link
          to="/seller/products/$slug/analytics"
          params={{ slug: product.slug }}
          className={tooltipStyle}
        >
          <span
            className="tooltip tooltip-left"
            data-tip="View Product Analytics"
          >
            <BsGraphUp />
          </span>
        </Link>
      </div>
    </div>
  )
}
