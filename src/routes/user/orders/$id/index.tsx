import { Link, createFileRoute, useParams } from '@tanstack/react-router'
import moment from 'moment'
import { FaStar } from 'react-icons/fa'
import { useGetSingleOrder } from '@/api/order'
import Loader from '@/components/loader'
import EntityNotFound from '@/components/entity-not-found'

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

  const productRatings = (product: any) => {
    const positive = Array.from(
      { length: product?.ratings },
      (_, index) => index,
    )
    const empty = Array.from(
      { length: 5 - product?.ratings },
      (_, index) => index,
    )

    return { positive, empty }
  }

  if (isError) {
    return (
      <EntityNotFound
        title="Order Not Found!"
        text="We could not find that order. It may have been deleted from our database. If you think this should be happening, please contact support"
      />
    )
  }

  return (
    <>
      <div className="border-b py-2 md:pt-0">
        <h2 className="font-semibold text-sm md:text-2xl">ORDER HISTORY</h2>
      </div>
      <div className="flex items-center gap-x-10 lg:gap-x-20 gap-y-4 py-4 mb-4 flex-wrap">
        <div className="space-y-2">
          <p className="text-xs">Order Number</p>
          <p className="text-sm font-medium">{orders?.orderNumber}</p>
        </div>

        <div className="space-y-2">
          <p className="text-xs">Payment Status</p>
          <span
            className={`badge text-xs badge-md text-white ${
              paymentStatus.toLowerCase() === 'pending'
                ? 'badge-warning'
                : paymentStatus.toLowerCase() === 'paid'
                  ? 'badge-success'
                  : 'badge-error'
            }`}
          >
            {paymentStatus}
          </span>
        </div>

        <div className="space-y-2">
          <p className="text-xs">Order Date</p>
          <p className="text-sm">
            {orders?.createdAt
              ? moment(orders.createdAt).format('DD MMM yyyy, hh:mm a')
              : ''}
            {/* {orders.createdAt} */}
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-xs">Delivery Status</p>
          <span
            className={`badge text-xs badge-md text-white ${
              deliveryStatus.toLowerCase() === 'pending'
                ? 'badge-warning'
                : deliveryStatus.toLowerCase() === 'in_transit'
                  ? 'badge-info'
                  : deliveryStatus.toLowerCase() === 'delivered'
                    ? 'badge-success'
                    : 'badge-error'
            }`}
          >
            {deliveryStatus}
          </span>
        </div>
      </div>

      {/* Order Item List */}
      {isLoading ? (
        <Loader />
      ) : (
        orders?.orderGroups.map((group: any, idx: number) => (
          <div
            className="collapse collapse-plus mb-4 border-[1px] border-gray-100 rounded-lg"
            key={idx}
          >
            <input type="radio" name="accordion" />
            {/* Head */}
            <p className="collapse-title h-6 text-sm bg-gray-100">
              Order from - <b className="font-medium">{group?.sellerName}</b>
            </p>
            <div className="collapse-content p-0">
              {/* Content */}
              <div className="p-4">
                {group?.orderItems?.map(
                  (item: Record<string, string>, index: number) => (
                    <div
                      className="flex justify-between items-center mb-4 last-of-type:mb-0"
                      key={index}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-20 aspect-square rounded-md overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm">{item.name}</p>
                          <div className="flex gap-1 items-center text-md text-yellow-300 py-2">
                            {productRatings(item).positive.map((_, i) => (
                              <FaStar key={i} />
                            ))}
                            {productRatings(item).empty.map((_, idxx) => (
                              <FaStar className="text-gray-200" key={idxx} />
                            ))}
                          </div>
                          <p className="text-sm">
                            NGN {item.totalPrice.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <Link
                        to="/product/$slug"
                        params={{
                          slug: item.slug,
                        }}
                      >
                        <button className="btn btn-sm font-normal hidden lg:flex">
                          View Product
                        </button>
                        <button className="btn btn-sm font-normal lg:hidden">
                          View
                        </button>
                      </Link>
                    </div>
                  ),
                )}
              </div>
              {/* Footer */}
              <div className="bg-gray-200 p-4 space-y-2">
                <p className="text-sm">
                  Logistics Provider -{' '}
                  <b className="font-medium">Some Random Provider</b>
                </p>
                <p className="text-sm">
                  Est Delivery Date -{' '}
                  <b className="font-medium">12 May, 2025</b>
                </p>
                <p className="text-sm">
                  Redeem Code - <b className="font-medium">127185</b>
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  )
}
