import { Link, createFileRoute, useParams } from '@tanstack/react-router'
import moment from 'moment'
import { toast } from 'sonner'
import { IoCopyOutline } from 'react-icons/io5'
import Loader from '@/components/loader'
import EmptyProducts from '@/components/empty-products'
import { useGetSingleOrder } from '@/api/order'
import { StatusBadge } from '@/components/status-badge'

export const Route = createFileRoute('/user/orders/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  const orderNumber = useParams({
    from: '/user/orders/$id/',
    select: (p) => p.id,
  })

  const { isLoading, data: orders, isError } = useGetSingleOrder(orderNumber)
  const deliveryStatus = orders?.status || 'pending'
  const paymentStatus = orders?.paymentStatus || 'pending'

  if (isError) {
    return (
      <EmptyProducts text="We could not find that order. It may have been deleted from our database. If you think this should be happening, please contact support" />
    )
  }

  if (isLoading) return <Loader />

  const handleCopyCode = (id: string) => {
    navigator.clipboard.writeText(id).then(() => {
      toast.success('Code copied', {
        description: 'Order completion code copied to clipboard',
        id: 'copyId',
      })
    })
  }

  return (
    <>
      <div className="border-b py-2 md:pt-0">
        <h2 className="font-semibold text-sm md:text-2xl">ORDER HISTORY</h2>
      </div>

      {/* Order summary info */}
      <div className="grid grid-cols-2 lg:grid-cols-4 items-start gap-x-6 gap-y-4 py-4 mb-4 flex-wrap">
        <div className="space-y-2">
          <p className="text-xs">Order Number</p>
          <p className="text-sm font-medium">{orders?.orderNumber}</p>
        </div>

        <div className="space-y-2">
          <p className="text-xs">Payment Status</p>

          <StatusBadge status={paymentStatus} />
        </div>

        <div className="space-y-2">
          <p className="text-xs">Order Date</p>
          <p className="text-sm">
            {orders?.createdAt
              ? moment(orders.createdAt).format('DD MMM yyyy, hh:mm a')
              : ''}
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-xs">Delivery Status</p>
          <StatusBadge status={deliveryStatus} />
        </div>
      </div>

      {/* Order Item List */}
      {orders?.orderGroups.map((group, idx) => (
        <div
          className="mb-4 border-[1px] border-gray-100 rounded-lg overflow-x-hidden"
          key={idx}
        >
          {/* Head */}
          <div className="p-4 bg-gray-100 flex items-center justify-between">
            <p className="text-sm">
              Order from - <b className="font-medium">{group.sellerName}</b>
            </p>
            <StatusBadge status={group.status} />
          </div>
          <div className="p-0">
            {/* Content */}
            <div className="p-4">
              {group.orderItems.map((item, index) => (
                <div
                  className="flex justify-between items-center mb-4 last-of-type:mb-0"
                  key={index}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 aspect-square rounded-md overflow-hidden bg-light-grey-clr">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <Link
                        to="/product/$slug"
                        params={{ slug: item.slug || '' }}
                        className="text-sm font-medium hover:underline"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm font-light">
                        NGN {item.totalPrice.toLocaleString()}
                      </p>
                      <p className="text-sm font-medium">
                        {item.quantity} {item.unit}
                      </p>
                    </div>
                  </div>

                  {group.status === 'delivered' && (
                    <Link
                      to="/user/orders/product/$id/review"
                      params={{
                        id: item.slug ? item.slug : '',
                      }}
                    >
                      <button className="btn btn-sm btn-outline font-normal border-dark-green-clr text-dark-green-clr">
                        Review
                      </button>
                    </Link>
                  )}
                </div>
              ))}
            </div>
            {/* Footer */}
            {group.logisticProvider ? (
              <div className="bg-gray-100 p-4 space-y-2">
                <p className="text-sm">
                  Logistics Provider -{' '}
                  <b className="font-medium">{group.logisticProvider.name}</b>
                </p>
                <p className="text-sm">
                  Est Delivery Date -{' '}
                  <b className="font-medium">
                    {group.deliveryDate
                      ? moment(group.deliveryDate).format('dddd MMM DD, YYYY')
                      : 'est.'}
                  </b>
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-sm">
                    Order Completion Code:{' '}
                    <b className="font-medium">
                      {group.orderCompletionCode || '---'}
                    </b>
                  </p>
                  <IoCopyOutline
                    className="text-sm cursor-pointer"
                    onClick={() =>
                      handleCopyCode(group.orderCompletionCode || '')
                    }
                  />
                </div>
              </div>
            ) : (
              <div className="bg-gray-100 p-4 space-y-2">
                <p className="text-sm text-gray-400">
                  Logistics provider not assigned to order
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
      {orders?.paymentStatus === 'pending' && (
        <Link
          to="/checkout/$orderNumber"
          params={{ orderNumber: orderNumber }}
          className="block my-6"
        >
          <button className="btn bg-dark-green-clr text-white border-0">
            Continue Order
          </button>
        </Link>
      )}
    </>
  )
}
