import { Link } from '@tanstack/react-router'
import LogisticChangeModal from './logistic-change-modal'
import OrderItem from './order-item'
import AvatarComp from './avatar-comp'
import { currency } from '@/utils/helpers'

export default function OrderGroup({
  orderGroup,
}: {
  orderGroup: Record<string, any>
}) {
  return (
    <>
      <div className="mb-6 last-of-type:mb-0 border-[1px] border-light-grey-clr rounded-lg overflow-hidden">
        <div className="p-2 border-b-[1px] border-light-grey-clr">
          <Link
            to="/store/$sellerId/products"
            search={{
              category: undefined,
              minPrice: undefined,
              maxPrice: undefined,
              currentPage: undefined,
              rating: undefined,
              region: undefined,
              seller: undefined,
            }}
            params={{
              sellerId: orderGroup.sellerId,
            }}
          >
            <p className="text-sm">
              Store:{' '}
              <b className="link font-semibold">{orderGroup.sellerName}</b>
            </p>
          </Link>
        </div>
        {orderGroup.orderItems.map(
          (item: Record<string, string>, idx: number) => (
            <OrderItem key={idx} item={item} />
          ),
        )}

        <div className="items-center gap-2 bg-light-grey-clr w-full px-4 py-2">
          <div className="flex items-center justify-between mb-2 border-b-white border-b-[1px] pb-2">
            <p className="text-sm">Logistics</p>
            <p
              className="link text-xs font-semibold"
              onClick={() =>
                (
                  document.getElementById(
                    `order-modal-${orderGroup.id}`,
                  ) as HTMLDialogElement
                ).showModal()
              }
            >
              Change
            </p>
          </div>

          <div className="label-text flex justify-between items-center">
            {orderGroup.logisticsProviderId ? (
              <div className="flex gap-2 items-center w-full">
                {orderGroup.logisticProvider.avatar ? (
                  <div className="w-12 h-12 rounded overflow-hidden bg-gray-200">
                    <img
                      src={orderGroup.logisticProvider.avatar}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <AvatarComp
                    size="md"
                    username={orderGroup.logisticProvider.name}
                  />
                )}
                <span>
                  <p className="text-sm font-semibold">
                    {orderGroup.logisticProvider.name}
                  </p>
                  <p className="text-xs">est. delivery date - 29th Jan 2024</p>
                  <p className="text-xs">Delivers to - Doorstep</p>
                </span>
                <div className="ml-auto">
                  <p className="text-sm font-medium">
                    {currency(orderGroup.logisticsCost)}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm">
                We could not find a logistic provider to deliver to this region
              </p>
            )}
          </div>
        </div>
      </div>

      <LogisticChangeModal groupId={orderGroup.id} />
    </>
  )
}
