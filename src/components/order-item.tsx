import { FaMinus, FaPlus } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import { useQueryClient } from '@tanstack/react-query'
import DeleteDialog from './delete-dialog'
import { useUpdateOrderItem } from '@/api/checkout'

export default function OrderItem({ item }: { item: any }) {
  const queryClient = useQueryClient()
  const { mutateAsync: updateQuantity, isPending } = useUpdateOrderItem()

  const handleItemUpdate = (type: 'increment' | 'decrement') => {
    const itemId = item.id

    updateQuantity({ itemId, type }).then(() => {
      queryClient.invalidateQueries({
        queryKey: ['Order'],
      })
    })
  }

  // Extract product data. Doing this to ensure consistency across screens
  const product = {
    name: item.name,
    image: item.image,
    quantity: item.quantity,
    unit: item.unit,
    totalPrice: item.totalPrice,
  }

  const handleRemoveItem = () => {
    const modalElement = document.getElementById(
      `delete_modal_${item.slug}`,
    ) as HTMLDialogElement | null
    if (modalElement) {
      modalElement.showModal()
    }
  }
  return (
    <>
      <div className="flex items-center gap-4 w-full mx-auto mb-4 p-2 border-b-[1px] border-b-light-grey-clr">
        <div className="w-full flex items-center gap-4">
          <div className="avatar">
            <div className="w-18 rounded bg-light-grey-clr">
              <img
                src={product.image}
                alt="Product Image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1 w-full">
            <p className="text-sm font-medium">{product.name}</p>
            <p className="text-xs font-light">
              {product.quantity} {product.unit}
            </p>
            <p className="text-sm font-medium text-nowrap">
              N {product.totalPrice.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-end min-w-max">
          <button
            className="btn btn-ghost btn-square btn-sm rounded border-0 hover:bg-red-100 text-red-clr"
            disabled={isPending}
            onClick={handleRemoveItem}
          >
            <MdDeleteForever className="text-xl" />
          </button>

          <div className="join">
            <button
              className="join-item btn btn-square btn-sm border-light-grey-clr"
              disabled={isPending}
              onClick={() => handleItemUpdate('decrement')}
            >
              <FaMinus className="text-gray-500 hover:text-gray-700 active:text-gray-700" />
            </button>
            <span className="join-item input input-sm border-l-0 border-r-0 border-light-grey-clr">
              {item.quantity} {item.unit}
            </span>
            <button
              className="join-item btn btn-square btn-sm border-light-grey-clr"
              disabled={isPending}
              onClick={() => handleItemUpdate('increment')}
            >
              <FaPlus className="text-gray-500 hover:text-gray-700 active:text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      <DeleteDialog item={item} component="order" />
    </>
  )
}
