import { Link, createFileRoute, useParams } from '@tanstack/react-router'
import { use } from 'react'
import moment from 'moment'
import { FaStar } from 'react-icons/fa6'
import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { GoMegaphone, GoShareAndroid } from 'react-icons/go'
import confetti from '@/assets/images/confetti.webp'
import { useGetSingleNotification } from '@/api/notification'
import Loader from '@/components/loader'
import { UserContext } from '@/providers/UserContext'

export const Route = createFileRoute('/user/notifications/$id/')({
  component: RouteComponent,
})

let type: NotificationList['type']

const Breadcrumb = () => {
  const getTitle = () => {
    switch (type) {
      case 'follow':
        return 'New Follower'
      case 'productReview':
        return 'Product Review'
      case 'productSave':
        return 'Product Save'
      case 'orderPlacement':
        return 'Order Placement'
      case 'orderPickup':
        return 'Order Pickup Schedule'
      case 'orderInTransit':
        return 'Scheduled Delivery Notice'
      case 'orderDelivery':
        return 'Order Delivery'
      case 'milestone':
        return 'New Milestone'
      case 'orderAssignment':
        return 'New Order Assignment'
      case 'outOfStock':
        return 'New Follower'
      default:
        return 'Notification'
    }
  }
  return (
    <div className="flex items-center gap-2 text-xs my-4">
      <Link
        to="/user/notifications"
        className="font-light text-slate-500 hover:underline"
      >
        Notifications
      </Link>
      <p className="font-light text-slate-500">/</p>
      <p className="font-medium text-dark-green-clr">{getTitle()}</p>
    </div>
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

function RouteComponent() {
  const id = useParams({
    from: '/user/notifications/$id/',
    select: (p) => p.id,
  })

  const { isLoading, data: notification } = useGetSingleNotification(id)

  if (notification) {
    type = notification.type
  }

  if (isLoading)
    return (
      <div className="w-full h-full">
        <Loader />
      </div>
    )

  switch (notification?.type) {
    case 'follow':
      return <FollowerNotification notification={notification} />
    case 'productReview':
      return <ProductReviewNotification notification={notification} />
    case 'productSave':
      return <ProductSaveNotification notification={notification} />
    case 'orderPlacement':
      return <OrderPlacementNotification notification={notification} />
    case 'orderPickup':
      return <OrderPickupNotification notification={notification} />
    case 'orderInTransit':
      return <OrderInTransitNotification notification={notification} />
    case 'orderDelivery':
      return <OrderDeliveryNotification notification={notification} />
    case 'milestone':
      return <MilestoneNotification notification={notification} />
    case 'orderAssignment':
      return <OrderAssignmentNotification notification={notification} />
    case 'outOfStock':
    default:
      return
  }
}

const FollowerNotification = ({
  notification,
}: {
  notification: NotificationList
}) => {
  return (
    <>
      <div className="hidden md:flex items-center justify-between border-b py-2 md:pt-0">
        <h2 className="font-semibold text-sm md:text-2xl">NEW FOLLOWER</h2>
      </div>
      <Breadcrumb />
      <div className="px-4 my-6 space-y-8">
        <Profile
          name={notification.follower?.name || '---'}
          slug={`Follower since ${moment(notification.createdAt).format('MMM DD, YYYY') || '---'}`}
          image={notification.follower?.avatar}
        />
        <p className="text-sm">{notification.summary}</p>
      </div>

      <Link to="/seller/followers">
        <button className="btn  border-orange-clr bg-white text-orange-clr hover:bg-orange-clr hover:text-white hover:border-orange-clr disabled:border-gray-200">
          View all Followers
        </button>
      </Link>
    </>
  )
}

const ProductReviewNotification = ({
  notification,
}: {
  notification: NotificationList
}) => {
  const productRatings = (rating: number) => {
    const positive = Array.from({ length: rating }, (_, index) => index)
    const empty = Array.from({ length: 5 - rating }, (_, index) => index)

    return { positive, empty }
  }

  const rating = productRatings(
    notification.review?.rating ? parseInt(notification.review.rating) : 4,
  )
  return (
    <>
      <div className="hidden md:flex items-center justify-between border-b py-2 md:pt-0">
        <h2 className="font-semibold text-sm md:text-2xl">PRODUCT REVIEW</h2>
      </div>
      <Breadcrumb />
      <div className="px-4 my-6 space-y-8">
        <p className="text-sm">{notification.summary}</p>
        <Profile
          name={notification.user?.name || ''}
          slug={moment(notification.createdAt).format(
            'dddd MMM DD, YYYY. hh:mma',
          )}
          image={notification.user?.avatar}
        />

        {/* Rating */}
        <div className="grid grid-cols-7 items-center">
          <div className="col-span-2">
            <p className="text-slate-500 text-sm">Rating</p>
          </div>
          <div className="col-span-5">
            <div className="flex gap-2 items-center text-md py-2">
              {rating.positive.map((_, idx) => (
                <FaStar key={idx} className="text-orange-400 text-xl" />
              ))}
              {rating.empty.map((_, idx) => (
                <FaStar className="text-gray-300 text-xl" key={idx} />
              ))}
            </div>
          </div>
        </div>

        {/* Review */}
        <div className="grid grid-cols-7 gap-x-2">
          <div className="col-span-2">
            <p className="text-slate-500 text-sm">Review</p>
          </div>
          <div className="col-span-5">
            <p className="pr-0 lg:pr-6 text-sm">
              {notification.review?.review}
            </p>
          </div>
        </div>

        {/* Product */}
        <div className="grid grid-cols-7 gap-x-2">
          <div className="col-span-2">
            <p className="text-slate-500 text-sm">Product</p>
          </div>
          <div className="col-span-5 space-y-3">
            <p className="font-semibold text-dark-green-clr text-base">
              {notification.product?.name}
            </p>
            <div className="flex items-center gap-2">
              {notification.product?.images?.map((image, idx) => (
                <div
                  className="w-15 h-15 rounded-lg overflow-hidden aspect-square skeleton"
                  key={idx}
                >
                  <img src={image} alt="" />
                </div>
              ))}
            </div>
            <Link
              to="/product/$slug/reviews"
              params={{ slug: notification.product?.slug || '' }}
              className="btn btn-outline border-yellow-clr text-yellow-clr hover:bg-yellow-clr hover:text-white"
            >
              View Product Reviews
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

const ProductSaveNotification = ({
  notification,
}: {
  notification: NotificationList
}) => {
  return (
    <>
      <div className="hidden md:flex items-center justify-between border-b py-2 md:pt-0">
        <h2 className="font-semibold text-sm md:text-2xl">PRODUCT SAVE</h2>
      </div>
      <Breadcrumb />

      <p className="text-sm">{notification.summary}</p>
      <div className="px-4 my-6 space-y-8">
        <Profile
          name="John Graham Doe"
          slug="Saved on Oct 25th, 2025"
          image="https://picsum.dev/200/200"
        />

        {/* Product */}
        <div className="grid grid-cols-7 gap-x-2">
          <div className="col-span-2">
            <p className="text-slate-500 text-sm">Product</p>
          </div>
          <div className="col-span-5 space-y-3">
            <p className="font-semibold text-dark-green-clr text-base">
              Fresh Tomatoes
            </p>
            <div className="flex items-center gap-2">
              <div className="w-15 h-15 rounded-lg overflow-hidden aspect-square skeleton">
                <img src="https://picsum.dev/static/103/200/200" alt="" />
              </div>
              <div className="w-15 h-15 rounded-lg overflow-hidden aspect-square skeleton">
                <img src="https://picsum.dev/static/104/200/200" alt="" />
              </div>
              <div className="w-15 h-15 rounded-lg overflow-hidden aspect-square skeleton">
                <img src="https://picsum.dev/static/105/200/200" alt="" />
              </div>
              <div className="w-15 h-15 rounded-lg overflow-hidden aspect-square skeleton">
                <img src="https://picsum.dev/static/106/200/200" alt="" />
              </div>
            </div>
            <Link
              to="/seller/products/$slug/analytics"
              params={{ slug: 'hgahgagh' }}
              className="btn btn-outline border-yellow-clr text-yellow-clr hover:bg-yellow-clr hover:text-white"
            >
              View Product Analytics
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

const OrderPlacementNotification = ({
  notification,
}: {
  notification: NotificationList
}) => {
  return (
    <>
      <div className="hidden md:flex items-center justify-between border-b py-2 md:pt-0">
        <h2 className="font-semibold text-sm md:text-2xl">ORDER PLACEMENT</h2>
      </div>
      <Breadcrumb />
      <div className="px-4 my-6 space-y-12">
        {/* Buyer Details */}
        <div className="space-y-3">
          <p className="text-sm">Buyer Details</p>
          <div className="pl-2">
            <Profile
              name={notification.buyer?.name || '---'}
              slug="Buyer"
              image={notification.buyer?.avatar}
            />
          </div>
        </div>

        {/* Order Details */}
        <div className="space-y-3">
          <p className="text-sm">Order Details</p>
          <div className="pl-2 space-y-2">
            <div className="grid grid-cols-7 gap-x-2">
              <div className="col-span-2">
                <p className="text-slate-400 text-sm">Order ID</p>
              </div>
              <div className="col-span-5">
                <p className="text-sm">{notification.order?.id}</p>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-x-2">
              <div className="col-span-2">
                <p className="text-slate-400 text-sm">Order Date</p>
              </div>
              <div className="col-span-5">
                <p className="text-sm">
                  {moment(notification.createdAt).format(
                    'dddd MMM DD, YYYY. hh:mma',
                  )}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-x-2">
              <div className="col-span-2">
                <p className="text-slate-400 text-sm">Total Amount</p>
              </div>
              <div className="col-span-5">
                <p className="font-semibold text-sm">
                  N {notification.order?.amount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Products Ordered */}
        <div className="space-y-3">
          <p className="text-sm">Products Ordered</p>
          <div className="pl-2">
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
              <table className="table text-sm">
                {/* head */}
                <thead>
                  <tr>
                    <th className="font-normal">Product</th>
                    <th className="font-normal">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {[1, 2, 3, 4].map((_, idx) => (
                    <tr key={idx}>
                      <td>
                        <div className="flex items-center gap-2">
                          <span className="w-8 h-8 rounded-sm overflow-hidden aspect-square skeleton">
                            <img
                              src="https://picsum.dev/50/50"
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </span>
                          <p>Fresh Tomatoes</p>
                        </div>
                      </td>
                      <td>4 Bags</td>
                    </tr>
                  ))} */}

                  <tr>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-sm overflow-hidden aspect-square skeleton">
                          <img
                            src={notification.product?.image}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </span>
                        <p>{notification.product?.name}</p>
                      </div>
                    </td>
                    <td>
                      {`${notification.productQuantity} ${notification.product?.unit}s`}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Logistics Provider */}
        <div className="space-y-3">
          <p className="text-sm">Logistics Provider</p>
          <div className="pl-2">
            <Profile
              name={notification.logisticsProvider?.name || '---'}
              slug="Logistics Provider"
              image={notification.logisticsProvider?.avatar}
            />
          </div>
        </div>

        {/* Delivery Information */}
        <div className="space-y-3">
          <p className="text-sm">Delivery Information</p>
          <div className="pl-2 space-y-2">
            <div className="grid grid-cols-7 gap-x-2">
              <div className="col-span-2">
                <p className="text-slate-400 text-sm">Delivery Address</p>
              </div>
              <div className="col-span-5">
                <p className="text-sm">{notification.order?.deliveryAddress}</p>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-x-2">
              <div className="col-span-2">
                <p className="text-slate-400 text-sm">Region</p>
              </div>
              <div className="col-span-5">
                <p className="text-sm">{`${notification.order?.deliveryRegion.name}, ${notification.order?.deliveryRegion.lcda}, ${notification.order?.deliveryRegion.state}`}</p>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-x-2">
              <div className="col-span-2">
                <p className="text-slate-400 text-sm">Pickup Date</p>
              </div>
              <div className="col-span-5">
                <p className="text-sm">
                  {notification.pickupDate
                    ? moment(notification.pickupDate).format(
                        'dddd MMM DD, YYYY',
                      )
                    : 'Not yet set'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-x-2">
              <div className="col-span-2">
                <p className="text-slate-400 text-sm">Delivery Date</p>
              </div>
              <div className="col-span-5">
                <p className="text-sm">
                  {notification.deliveryDate
                    ? moment(notification.deliveryDate).format(
                        'dddd MMM DD, YYYY',
                      )
                    : 'Not yet set'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <button className="btn btn-ghost text-error btn-error hover:text-white">
          Reject Order
        </button>
      </div>
    </>
  )
}

const OrderAssignmentNotification = ({
  notification,
}: {
  notification: NotificationList
}) => {
  return (
    <>
      <div className="hidden md:flex items-center justify-between border-b py-2 md:pt-0">
        <h2 className="font-semibold text-sm md:text-2xl">
          NEW ORDER ASSIGNMENT
        </h2>
      </div>
      <Breadcrumb />
      <div className="px-4 my-6 space-y-12">
        {/* Items to ship */}
        <div className="space-y-3">
          <p className="text-sm">Items to Ship</p>
          <div className="pl-2">
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
              <table className="table text-sm">
                {/* head */}
                <thead>
                  <tr>
                    <th className="font-normal">Product</th>
                    <th className="font-normal">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4].map((_, idx) => (
                    <tr key={idx}>
                      <td>
                        <div className="flex items-center gap-2">
                          <span className="w-8 h-8 rounded-sm overflow-hidden aspect-square skeleton">
                            <img
                              src="https://picsum.dev/50/50"
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </span>
                          <p>Fresh Tomatoes</p>
                        </div>
                      </td>
                      <td>4 Bags</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pickup Information */}
        <div className="space-y-3">
          <p className="text-sm">Pickup Information</p>
          <div className="pl-2 space-y-2">
            <div className="grid grid-cols-7 gap-x-2">
              <div className="col-span-2">
                <p className="text-slate-400 text-sm">Delivery Address</p>
              </div>
              <div className="col-span-5">
                <p className="text-sm">Somewhere in Lagos, Nigeria</p>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-x-2">
              <div className="col-span-2">
                <p className="text-slate-400 text-sm">Region</p>
              </div>
              <div className="col-span-5">
                <p className="text-sm">Akoko, Ipaja, Lagos</p>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-x-2">
              <div className="col-span-2">
                <p className="text-slate-400 text-sm">Pickup Date</p>
              </div>
              <div className="col-span-5">
                <p className="text-sm">Not yet set </p>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-x-2">
              <div className="col-span-2">
                <p className="text-slate-400 text-sm">Delivery Date</p>
              </div>
              <div className="col-span-5">
                <p className="text-sm">Not yet set </p>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="space-y-3">
          <p className="text-sm">Delivery Information</p>
          <div className="pl-2 space-y-2">
            <div className="grid grid-cols-7 gap-x-2">
              <div className="col-span-2">
                <p className="text-slate-400 text-sm">Delivery Address</p>
              </div>
              <div className="col-span-5">
                <p className="text-sm">Somewhere in Lagos, Nigeria</p>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-x-2">
              <div className="col-span-2">
                <p className="text-slate-400 text-sm">Region</p>
              </div>
              <div className="col-span-5">
                <p className="text-sm">Akoko, Ipaja, Lagos</p>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-x-2">
              <div className="col-span-2">
                <p className="text-slate-400 text-sm">Pickup Date</p>
              </div>
              <div className="col-span-5">
                <p className="text-sm">
                  {notification.pickupDate
                    ? moment(notification.pickupDate).format(
                        'dddd MMM DD, YYYY',
                      )
                    : 'Not yet set'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-x-2">
              <div className="col-span-2">
                <p className="text-slate-400 text-sm">Delivery Date</p>
              </div>
              <div className="col-span-5">
                <p className="text-sm">
                  {notification.deliveryDate
                    ? moment(notification.deliveryDate).format(
                        'dddd MMM DD, YYYY',
                      )
                    : 'Not yet set'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <Link to="/user/notifications/$id" params={{ id: 'haggahga' }}>
          <button className="btn btn-success text-white">Go to Order</button>
        </Link>
      </div>
    </>
  )
}

const OrderPickupNotification = ({
  notification,
}: {
  notification: NotificationList
}) => {
  const user = use(UserContext).user
  return (
    <>
      <div className="hidden md:flex items-center justify-between border-b py-2 md:pt-0">
        <h2 className="font-semibold text-sm md:text-2xl">
          ORDER PICKUP SCHEDULE
        </h2>
      </div>
      <Breadcrumb />
      <div className="px-4 my-6 space-y-12">
        <p className="text-sm">{notification.summary}</p>

        {/* Pickup Information */}
        <div className="space-y-3">
          <p className="text-sm">Pickup Information</p>
          <div className="pl-2 space-y-2">
            <div className="grid grid-cols-7 gap-x-2">
              <div className="col-span-2">
                <p className="text-slate-400 text-sm">Delivery Address</p>
              </div>
              <div className="col-span-5">
                <p className="text-sm">{notification.order?.deliveryAddress}</p>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-x-2">
              <div className="col-span-2">
                <p className="text-slate-400 text-sm">Region</p>
              </div>
              <div className="col-span-5">
                <p className="text-sm">{`${notification.order?.deliveryRegion.name}, ${notification.order?.deliveryRegion.lcda}, ${notification.order?.deliveryRegion.state}`}</p>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-x-2">
              <div className="col-span-2">
                <p className="text-slate-400 text-sm">Pickup Date</p>
              </div>
              <div className="col-span-5">
                <p className="text-sm">
                  {notification.pickupDate
                    ? moment(notification.pickupDate).format(
                        'dddd MMM DD, YYYY',
                      )
                    : 'Not yet set'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-x-2">
              <div className="col-span-2">
                <p className="text-slate-400 text-sm">Delivery Date</p>
              </div>
              <div className="col-span-5">
                <p className="text-sm">
                  {notification.deliveryDate
                    ? moment(notification.deliveryDate).format(
                        'dddd MMM DD, YYYY',
                      )
                    : 'Not yet set'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Logistic Provider */}
        <div className="space-y-3">
          <p className="text-sm">Logistics Provider</p>
          <div className="pl-2">
            <Profile
              name={notification.logisticsProvider?.name || '---'}
              slug="Logistics Provider"
              image={notification.logisticsProvider?.avatar}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {user?.type === 'buyer' && (
            <Link
              to="/user/notifications/$id"
              params={{ id: notification.order?.id || '' }}
            >
              <button className="btn btn-success text-white">
                Go to Order
              </button>
            </Link>
          )}

          {user?.type !== 'buyer' && (
            <button className="btn btn-ghost">Request Reschedule</button>
          )}
        </div>
      </div>
    </>
  )
}

const OrderInTransitNotification = ({
  notification,
}: {
  notification: NotificationList
}) => {
  return (
    <>
      <div className="hidden md:flex items-center justify-between border-b py-2 md:pt-0">
        <h2 className="font-semibold text-sm md:text-2xl">
          SCHEDULED DELIVERY NOTICE
        </h2>
      </div>
      <Breadcrumb />
      <div className="px-4 my-6 space-y-12">
        <p className="text-sm">{notification.summary}</p>

        {/* Products Ordered */}
        <div className="space-y-3">
          <p className="text-sm">Products Scheduled for Delivery</p>
          <div className="pl-2">
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
              <table className="table text-sm">
                {/* head */}
                <thead>
                  <tr>
                    <th className="font-normal">Product</th>
                    <th className="font-normal">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {notification.products?.map((product, idx) => (
                    <tr key={idx}>
                      <td>
                        <div className="flex items-center gap-2">
                          <span className="w-8 h-8 rounded-sm overflow-hidden aspect-square skeleton">
                            <img
                              src={product.image}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </span>
                          <p>{product.name}</p>
                        </div>
                      </td>
                      <td>
                        {product.quantity} {product.unit}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="space-y-3">
          <p className="text-sm">Delivery Information</p>
          <div className="pl-2 space-y-2">
            <div className="grid grid-cols-7 gap-x-2">
              <div className="col-span-2">
                <p className="text-slate-400 text-sm">Delivery Address</p>
              </div>
              <div className="col-span-5">
                <p className="text-sm">{notification.order?.deliveryAddress}</p>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-x-2">
              <div className="col-span-2">
                <p className="text-slate-400 text-sm">Region</p>
              </div>
              <div className="col-span-5">
                <p className="text-sm">{`${notification.order?.deliveryRegion.name}, ${notification.order?.deliveryRegion.lcda}, ${notification.order?.deliveryRegion.state}`}</p>
              </div>
            </div>

            {/* <div className="grid grid-cols-7 gap-x-2">
              <div className="col-span-2">
                <p className="text-slate-400 text-sm">Pickup Date</p>
              </div>
              <div className="col-span-5">
                <p className="text-sm">
                  {notification.pickupDate
                    ? moment(notification.pickupDate).format(
                        'dddd MMM DD, YYYY',
                      )
                    : 'Not yet set'}
                </p>
              </div>
            </div> */}

            <div className="grid grid-cols-7 gap-x-2">
              <div className="col-span-2">
                <p className="text-slate-400 text-sm">Delivery Date</p>
              </div>
              <div className="col-span-5">
                <p className="text-sm">
                  {notification.deliveryDate
                    ? moment(notification.deliveryDate).format(
                        'dddd MMM DD, YYYY',
                      )
                    : 'Not yet set'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Logistic Provider */}
        <div className="space-y-3">
          <p className="text-sm">Logistics Provider</p>
          <div className="pl-2">
            <Profile
              name={notification.logisticsProvider?.name || '---'}
              slug="Logistics Provider"
              image={notification.logisticsProvider?.avatar}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/user/orders/$id"
            params={{ id: notification.order?.id || '' }}
          >
            <button className="btn btn-success text-white">Go to Order</button>
          </Link>
        </div>
      </div>
    </>
  )
}

const OrderDeliveryNotification = ({
  notification,
}: {
  notification: NotificationList
}) => {
  const user = use(UserContext).user
  return (
    <>
      <div className="hidden md:flex items-center justify-between border-b py-2 md:pt-0">
        <h2 className="font-semibold text-sm md:text-2xl">ORDER DELIVERY</h2>
      </div>
      <Breadcrumb />
      <div className="px-4 my-6 space-y-12">
        <div className="space-y-1">
          <h2 className="text-xl">Order Delivery Successful!</h2>
          <p className="text-sm">{notification.summary}</p>
        </div>

        {/* Confetti */}
        <div className="w-full h-[170px] rounded-xl overflow-hidden bg-slate-100">
          <img src={confetti} alt="" />
        </div>

        {/* Products delivered - Buyer */}
        {user?.type === 'buyer' && (
          <div className="space-y-3">
            <p className="text-sm">Products Delivered</p>
            <div className="pl-2">
              <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table text-sm">
                  {/* head */}
                  <thead>
                    <tr>
                      <th className="font-normal">Product</th>
                      <th className="font-normal">Quantity</th>
                      <th className="font-normal text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notification.products?.map((product, idx) => (
                      <tr key={idx}>
                        <td>
                          <div className="flex items-center gap-2">
                            <span className="w-8 h-8 rounded-sm overflow-hidden aspect-square skeleton">
                              <img
                                src={product.image}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            </span>
                            <p>{product.name}</p>
                          </div>
                        </td>
                        <td>
                          {product.quantity} {product.unit}
                        </td>
                        <td className="text-right">
                          <div className="dropdown dropdown-left">
                            <div
                              tabIndex={0}
                              role="button"
                              className="btn btn-ghost bnt-sm btn-square p-1 h-auto w-auto"
                            >
                              <DotsVerticalIcon />
                            </div>
                            <ul
                              tabIndex={0}
                              className="dropdown-content menu min-w-30 w-max bg-base-100 rounded-box z-1 p-1 space-y-1 shadow-sm"
                            >
                              <li className="btn btn-sm btn-ghost items-start hover:text-white text-dark-green-clr hover:bg-dark-green-clr border-0 p-0">
                                <Link
                                  to="/user/orders/product/$slug/review"
                                  className="w-full "
                                  params={{ slug: product.slug }}
                                >
                                  Review Product
                                </Link>
                              </li>
                              <li className="btn btn-sm btn-ghost items-start hover:text-white text-dark-green-clr hover:bg-dark-green-clr border-0">
                                Rate Seller
                              </li>
                              <li className="btn btn-sm btn-ghost btn-error items-start hover:text-white text-error">
                                Report Product
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Products delivered - Seller */}
        {user?.type !== 'buyer' && (
          <div className="space-y-3">
            <p className="text-sm">Product Delivered</p>
            <div className="pl-2">
              <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table text-sm">
                  {/* head */}
                  <thead>
                    <tr>
                      <th className="font-normal">Product</th>
                      <th className="font-normal">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="flex items-center gap-2">
                          <span className="w-8 h-8 rounded-sm overflow-hidden aspect-square skeleton">
                            <img
                              src={notification.product?.image}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </span>
                          <p>{notification.product?.name}</p>
                        </div>
                      </td>
                      <td>
                        {notification.productQuantity}{' '}
                        {notification.product?.unit}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Logistic Provider */}
        <div className="space-y-3">
          <p className="text-sm">Logistics Provider</p>
          <div className="flex items-center gap-4">
            <div className="pl-2">
              <Profile
                name={notification.logisticsProvider?.name || '---'}
                slug="Logistics Provider"
                image={notification.logisticsProvider?.avatar}
              />
            </div>
            <Link
              to="/user/orders/logistics/$id/review"
              params={{
                id: notification.logisticsProvider?.id || '',
              }}
            >
              <button className="btn btn-sm btn-outline font-normal border-dark-green-clr text-dark-green-clr hover:bg-green-100">
                Rate
              </button>
            </Link>
          </div>
        </div>

        {/* Pickup Information */}
        <div className="space-y-3">
          <p className="text-sm">Delivery Information</p>
          <div className="pl-2 space-y-2">
            <div className="grid grid-cols-7 gap-x-2">
              <div className="col-span-2">
                <p className="text-slate-400 text-sm">Delivery Address</p>
              </div>
              <div className="col-span-5">
                <p className="text-sm">{notification.order?.deliveryAddress}</p>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-x-2">
              <div className="col-span-2">
                <p className="text-slate-400 text-sm">Region</p>
              </div>
              <div className="col-span-5">
                <p className="text-sm">{`${notification.order?.deliveryRegion.name}, ${notification.order?.deliveryRegion.lcda}, ${notification.order?.deliveryRegion.state}`}</p>
              </div>
            </div>

            {user?.type !== 'buyer' && (
              <div className="grid grid-cols-7 gap-x-2">
                <div className="col-span-2">
                  <p className="text-slate-400 text-sm">Pickup Date</p>
                </div>
                <div className="col-span-5">
                  <p className="text-sm">
                    {notification.pickupDate
                      ? moment(notification.pickupDate).format(
                          'dddd MMM DD, YYYY',
                        )
                      : 'Not yet set'}
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-7 gap-x-2">
              <div className="col-span-2">
                <p className="text-slate-400 text-sm">Delivery Date</p>
              </div>
              <div className="col-span-5">
                <p className="text-sm">
                  {notification.deliveryDate
                    ? moment(notification.deliveryDate).format(
                        'dddd MMM DD, YYYY',
                      )
                    : 'Not yet set'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button className="btn btn-ghost">Report Issue</button>
        </div>
      </div>
    </>
  )
}

const MilestoneNotification = ({
  notification,
}: {
  notification: NotificationList
}) => {
  return (
    <>
      <div className="hidden md:flex items-center justify-between border-b py-2 md:pt-0">
        <h2 className="font-semibold text-sm md:text-2xl">NEW MILESTONE</h2>
      </div>
      <Breadcrumb />

      <p className="text-sm">{notification.summary}</p>
      <div className="px-4 my-6 space-y-12">
        <div className="space-y-1">
          <h2 className="text-xl">Celebrating Milestone Achievement</h2>
          <p className="text-sm">
            Congratulations. One of your products has reached a new milestone.
          </p>
        </div>

        {/* Confetti */}
        <div className="space-y-4">
          <div className="w-full h-[170px] rounded-xl overflow-hidden bg-slate-100">
            <img src={confetti} alt="" />
          </div>
          <div className="w-full p-4 rounded-xl overflow-hidden bg-green-100">
            <p className="text-sm">Milestone Reached</p>
            <h3 className="font-medium text-xl">10 Views</h3>
          </div>
        </div>

        {/* Product */}
        <div className="grid grid-cols-6 gap-x-2">
          <div className="col-span-1">
            <p className="text-slate-500 text-sm">Product</p>
          </div>
          <div className="col-span-5 space-y-3">
            <p className="font-semibold text-dark-green-clr text-base">
              Fresh Tomatoes
            </p>
            <div className="flex items-center gap-2">
              <div className="w-15 h-15 rounded-lg overflow-hidden aspect-square skeleton">
                <img src="https://picsum.dev/static/103/200/200" alt="" />
              </div>
              <div className="w-15 h-15 rounded-lg overflow-hidden aspect-square skeleton">
                <img src="https://picsum.dev/static/104/200/200" alt="" />
              </div>
              <div className="w-15 h-15 rounded-lg overflow-hidden aspect-square skeleton">
                <img src="https://picsum.dev/static/105/200/200" alt="" />
              </div>
              <div className="w-15 h-15 rounded-lg overflow-hidden aspect-square skeleton">
                <img src="https://picsum.dev/static/106/200/200" alt="" />
              </div>
            </div>
          </div>
        </div>

        {/* What Next */}
        <div className="space-y-3">
          <p className="text-sm">What Next?</p>
          <div className="pl-2 space-y-4">
            {/* Promote */}
            <div className="flex items-center gap-2">
              <span className="flex justify-center items-center w-10 h-10 aspect-square rounded-sm bg-green-100">
                <GoMegaphone className="text-lg text-dark-green-clr -rotate-12" />
              </span>
              <div className="flex items-center justify-between w-full">
                <div>
                  <p className="text-sm">Promote Product</p>
                  <p className="text-xs text-slate-500">
                    Boost your product&apos;s visibility to reach more
                    customers.
                  </p>
                </div>
                <Link
                  to="/seller/products/$slug/promote"
                  params={{
                    slug: 'gaagaghgah',
                  }}
                >
                  <button className="btn btn-ghost btn-sm !text-xs text-dark-green-clr hover:bg-green-50 hover:border-green-200">
                    Promote
                  </button>
                </Link>
              </div>
            </div>

            {/* Share */}
            <div className="flex items-center gap-2">
              <span className="flex justify-center items-center w-10 h-10 aspect-square rounded-sm bg-[#FFDBFD]">
                <GoShareAndroid className="text-lg text-[#6F23C4] -rotate-12" />
              </span>
              <div className="flex items-center justify-between w-full">
                <div>
                  <p className="text-sm">Share Milestone</p>
                  <p className="text-xs text-slate-500">
                    Share your new milestone on your social media accounts.
                  </p>
                </div>
                <button className="btn btn-ghost btn-sm !text-xs">Share</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
