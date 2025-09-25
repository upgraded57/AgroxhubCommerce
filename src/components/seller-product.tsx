import { Link } from '@tanstack/react-router'
import { FaRegEye } from 'react-icons/fa'
import { BiEdit } from 'react-icons/bi'
import { MdDeleteForever } from 'react-icons/md'
import { BsGraphUp } from 'react-icons/bs'
import ProductRatings from './product-rating'
import DeleteDialog from './delete-dialog'
import { currency } from '@/utils/helpers'

const tooltipStyle = 'btn btn-sm rounded-md btn-square text-xl cursor-pointer'
export default function SellerProduct({ product }: { product: Product }) {
  const handleDeleteProduct = () => {
    const modalElement = document.getElementById(
      `delete_modal_${product.slug}`,
    ) as HTMLDialogElement | null
    if (modalElement) {
      modalElement.showModal()
    }
  }
  return (
    <div className="w-full rounded-lg p-2 border-[1px] border-transparent hover:shadow hover:border-light-grey-clr">
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
      <ProductRatings ratings={String(product.ratings)} />
      <h3 className="h-100">{currency(product.unitPrice)}</h3>
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
      <DeleteDialog item={product} component="seller" />
    </div>
  )
}
