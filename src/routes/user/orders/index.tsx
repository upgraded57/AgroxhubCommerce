import { Link, createFileRoute } from '@tanstack/react-router'
import moment from 'moment'
import { useGetOrders } from '@/api/order'
import Loader from '@/components/loader'
import EmptyProducts from '@/components/empty-products'

export const Route = createFileRoute('/user/orders/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { isLoading, data: orders, isError } = useGetOrders()
  return (
    <>
      <div className="flex items-center justify-between border-b py-2 pr-1 md:pt-0">
        <h2 className="font-semibold text-sm md:text-2xl">ORDER HISTORY</h2>
        <select
          className="select select-sm uppercase font-normal"
          disabled={isLoading || isError || !orders?.length}
        >
          <option>All</option>
          <option>Pending Delivery</option>
          <option>Delivered</option>
          <option>Pending Review</option>
          <option>Rejected</option>
        </select>
      </div>

      {/* Products List */}
      {isLoading ? (
        <Loader />
      ) : orders && orders.length > 0 ? (
        orders.map((order, idx) => {
          const paymentStatusBadgeColor =
            order.paymentStatus === 'paid'
              ? 'dark-green-clr'
              : order.paymentStatus === 'pending'
                ? 'yellow-clr'
                : 'red-clr'
          return (
            <Link
              to="/user/orders/$id"
              params={{
                id: order.orderNumber,
              }}
              key={idx}
              className="grid grid-cols-2 gap-y-4 gap-x-4 justify-between lg:gap-y-0 lg:flex items-center p-2 border-b-[1px] last-of-type:border-none hover:bg-light-grey-clr"
            >
              <div className="lg:basis-[30%] lg:space-y-3">
                <p className="text-xs text-grey-clr">Order Number</p>
                <p className="text-sm">{order.orderNumber}</p>
              </div>
              <div className="lg:basis-[20%] lg:space-y-3">
                <p className="text-xs text-grey-clr">Payment Status</p>
                <span
                  className={`badge text-xs text-white border-none bg-${paymentStatusBadgeColor}`}
                >
                  {order.paymentStatus}
                </span>
              </div>
              <div className="lg:basis-[20%] lg:space-y-3">
                <p className="text-xs text-grey-clr">Products</p>
                <p className="text-sm">{order.products}</p>
              </div>
              <div className="lg:basis-[30%] lg:space-y-3">
                <p className="text-xs text-grey-clr">Order Date</p>
                <p className="text-sm">
                  {moment(order.createdAt).format('DD MMM YYYY, h:mm a')}
                </p>
              </div>
            </Link>
          )
        })
      ) : (
        <EmptyProducts text="You have no orders yet!" />
      )}
    </>
  )
}
