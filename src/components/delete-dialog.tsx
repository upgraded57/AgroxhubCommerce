import { use } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { CartContext } from '@/providers/CartContext'
import { useUpdateOrderItem } from '@/api/checkout'
import { UseDeleteProduct } from '@/api/product'

const DeleteDialog = ({
  item,
  component,
}: {
  item: CartItem | Product
  component: 'cart' | 'order' | 'seller'
}) => {
  const updateCartItem = use(CartContext)?.updateCartItem
  const isUpdatingItem = use(CartContext)?.isUpdatingItem

  const queryClient = useQueryClient()
  const { mutateAsync: deleteOrderItem, isPending: isRemovingOrderItem } =
    useUpdateOrderItem()
  const { mutateAsync: deleteProduct } = UseDeleteProduct()

  const handleItemDelete = () => {
    const itemId = item.id || ''
    const slug = item.slug
    if (component === 'order') {
      deleteOrderItem({ itemId, type: 'delete' }).then(() => {
        queryClient.invalidateQueries({
          queryKey: ['Order'],
        })
        return
      })
    }
    if (component === 'seller') {
      deleteProduct(item.slug).then(() => {
        queryClient.invalidateQueries({
          predicate: (query) =>
            query.queryKey.some(
              (key) =>
                typeof key === 'string' && key.includes('Seller Products'),
            ),
        })
      })
      return
    }
    if (component === 'cart') {
      if (updateCartItem) {
        updateCartItem(slug, 'delete')
        return
      }
    }
  }
  return (
    <dialog id={`delete_modal_${item.slug}`} className="modal">
      <div className="modal-box">
        <h3 className="font-medium text-lg">Confirm Removal</h3>
        <p className="py-4 text-sm">
          Are you sure you want to remove{' '}
          <b className="font-medium">{item.name}</b> from your{' '}
          {component === 'cart'
            ? 'cart'
            : component === 'seller'
              ? 'store'
              : 'order'}
          ?
        </p>
        <div className="modal-action">
          <form method="dialog">
            <div className="flex items-center gap-2">
              <button
                className="btn"
                disabled={isUpdatingItem || isRemovingOrderItem}
              >
                No, Cancel
              </button>
              <button
                className="btn bg-red-clr text-white hover:bg-red-700 border-transparent hover:border-transparent"
                onClick={handleItemDelete}
                disabled={isUpdatingItem || isRemovingOrderItem}
              >
                {isUpdatingItem || isRemovingOrderItem ? (
                  <span className="loading loading-spinner" />
                ) : (
                  'Yes, Remove'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  )
}

export default DeleteDialog
