import { MdDeleteForever } from 'react-icons/md'
import { FaPenToSquare } from 'react-icons/fa6'
import { Link } from '@tanstack/react-router'
import DeleteDialog from './delete-dialog'

export default function CartItem({ item }: { item: CartItem }) {
  return (
    <tr>
      <th className="w-[60px] md:w-[80px] px-0">
        <div className="w-[60px] md:w-[80px] aspect-square rounded-lg overflow-hidden bg-gray-200">
          <img
            src={item.image}
            alt="Poduct Image"
            className="w-full h-full object-cover"
          />
        </div>
      </th>

      <td>
        <p className="text-sm">{item.name}</p>
      </td>
      <td>
        <p>
          {item.quantity} {item.unit}
        </p>
      </td>
      {/* <div className="flex items-center gap-3"> */}
      <td>
        <p className="text-sm font-semibold">
          NGN {item.price?.toLocaleString()}
        </p>
      </td>

      <td>
        <div className="flex items-center gap-3">
          <div className="tooltip" data-tip="Edit Quantity">
            <Link
              //   to={`/products/${item.slug}`}
              to="/product/$slug"
              params={{
                slug: item.slug ? item.slug : '',
              }}
              className="btn btn-ghost btn-sm aspect-square p-1 rounded-md hover:bg-green-50 text-light-green-clr"
            >
              <FaPenToSquare />
            </Link>
          </div>
          <div
            className="tooltip tooltip-error text-white"
            data-tip="Remove Product"
          >
            <button
              className="btn btn-ghost aspect-square btn-sm p-1 rounded-md hover:bg-red-100 text-red-clr"
              onClick={() => {
                const modalElement = document.getElementById(
                  `delete_modal_${item.slug}`,
                ) as HTMLDialogElement | null
                if (modalElement) {
                  modalElement.showModal()
                }
              }}
            >
              <MdDeleteForever className="text-xl" />
            </button>
          </div>
        </div>
        <DeleteDialog item={item} type="cart" />
      </td>
    </tr>
  )
}
