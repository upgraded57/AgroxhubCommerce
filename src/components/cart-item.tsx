import { MdDeleteForever } from 'react-icons/md'
import { use } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'
import DeleteDialog from './delete-dialog'
import { CartContext } from '@/providers/CartContext'

export default function CartItem({ item }: { item: CartItem }) {
  const updateCartItem = use(CartContext)?.updateCartItem
  const isUpdatingItem = use(CartContext)?.isUpdatingItem
  return (
    <>
      <div className="cartItem flex items-center gap-4 w-full mx-auto mb-4 pb-4 border-b-[1px] border-b-light-grey-clr">
        <div className="w-full flex items-center gap-4">
          <div className="avatar">
            <div className="w-18 rounded bg-light-grey-clr">
              <img
                src={item.image}
                alt="Poduct Image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1 w-full">
            <p className="text-sm font-medium">{item.name}</p>
            <p className="text-xs font-light">
              {item.quantity} {item.unit}
            </p>
            <p className="text-sm font-medium text-nowrap">
              N {item.price.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-end min-w-max">
          <button
            className="btn btn-ghost btn-square btn-sm rounded border-0 hover:bg-red-100 text-red-clr"
            disabled={isUpdatingItem}
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

          <div className="join">
            <button
              className="join-item btn btn-square btn-sm border-light-grey-clr"
              disabled={isUpdatingItem}
              onClick={() =>
                updateCartItem ? updateCartItem(item.slug, 'decrement') : null
              }
            >
              <FaMinus className="text-gray-500 hover:text-gray-700 active:text-gray-700" />
            </button>
            <span className="join-item input input-sm border-l-0 border-r-0 border-light-grey-clr">
              {item.quantity} {item.unit}
            </span>
            <button
              className="join-item btn btn-square btn-sm border-light-grey-clr"
              disabled={isUpdatingItem}
              onClick={() =>
                updateCartItem ? updateCartItem(item.slug, 'increment') : null
              }
            >
              <FaPlus className="text-gray-500 hover:text-gray-700 active:text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      <DeleteDialog item={item} component="cart" />
    </>
  )
}
