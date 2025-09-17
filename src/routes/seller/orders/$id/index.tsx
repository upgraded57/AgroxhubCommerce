import { createFileRoute, useParams } from '@tanstack/react-router'
import moment from 'moment'
import OrderTable from '@/components/order-table'
import { useGetSellerSingleOrders } from '@/api/seller'
import Loader from '@/components/loader'
import { StatusBadge } from '@/components/status-badge'

export const Route = createFileRoute('/seller/orders/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  const id = useParams({
    from: '/seller/orders/$id/',
    select: (p) => p.id,
  })

  const { isLoading, data: order } = useGetSellerSingleOrders(id)
  return (
    <>
      <div className="hidden md:flex items-center justify-between border-b py-2 md:pt-0 mb-6">
        <h2 className="font-semibold text-sm md:text-2xl uppercase">
          order details
        </h2>
      </div>

      {isLoading ? (
        <div className="w-full h-[300px] grid place-content-center">
          <Loader />
        </div>
      ) : (
        order && (
          <div className="mt-6">
            <div className="w-full border rounded-lg carousel">
              <span className="carousel-item min-w-max block space-y-2 p-4 border-r">
                <p className="text-xs text-slate-400">Delivery Status</p>
                <p>
                  <StatusBadge status={order.status as Order['status']} />
                </p>
              </span>
              <span className="carousel-item min-w-max block space-y-2 p-4 border-r">
                <p className="text-xs text-slate-400">Order Date</p>
                <p>{moment(order.createdAt).format('MMM DD, YYYY')}</p>
              </span>

              <span className="carousel-item min-w-max block space-y-2 p-4 border-r">
                <p className="text-xs text-slate-400">Pickup Date</p>
                <p>
                  {order.pickupDate
                    ? moment(order.pickupDate).format('MMM DD, YYYY')
                    : 'Not yet set'}
                </p>
              </span>
              <span className="carousel-item min-w-max block space-y-2 p-4 border-r">
                <p className="text-xs text-slate-400">Delivery Date</p>
                <p>
                  {order.deliveryDate
                    ? moment(order.deliveryDate).format('MMM DD, YYYY')
                    : 'Not yet set'}
                </p>
              </span>
              <span className="carousel-item min-w-max block space-y-2 p-4">
                <p className="text-xs text-slate-400">Delivery Address</p>
                <p>{order.deliveryAddress}</p>
              </span>
            </div>

            <div className="mt-6 mb-8 ml-4 space-y-2">
              <p className="text-sm">Buyer</p>
              <Profile
                name={order.user.name}
                slug="Buyer"
                image={order.user.avatar}
              />
            </div>

            <div className="rounded-lg border overflow-hidden ml-4">
              <OrderTable products={order.products} />
            </div>
            <div className="mt-6 mb-8 space-y-2 ml-4">
              <p className="text-sm">Logistics Provider</p>
              <Profile
                name={order.logisticsProvider?.name || ''}
                slug="Logistics Provider"
                image={order.logisticsProvider?.avatar || ''}
              />
            </div>
          </div>
        )
      )}
    </>
  )
}

const Profile = ({
  image,
  name,
  slug,
}: {
  image?: string
  name: string
  slug: string
}) => {
  const initials = name.split(' ')[0][0] + name.split(' ')[1][0]
  return (
    <div className="flex items-center gap-4">
      {image ? (
        <div className="avatar skeleton rounded-full">
          <div className="w-16 rounded-full overflow-hidden">
            <img src={image} className="w-full h-full object-cover" />
          </div>
        </div>
      ) : (
        <div className="avatar avatar-placeholder">
          <div className="bg-dark-green-clr w-16 rounded-full text-white">
            <span className="text-xl uppercase font-medium">{initials}</span>
          </div>
        </div>
      )}
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-xs text-slate-500">{slug}</p>
      </div>
    </div>
  )
}
