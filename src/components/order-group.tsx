import { FaUps } from 'react-icons/fa6'
import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import LogisticChangeModal from './logistic-change-modal'
import OrderItem from './order-item'

export default function OrderGroup({
  orderGroup,
}: {
  orderGroup: Record<string, any>
}) {
  const [deliveryModalActive, setDeliveryModalActive] = useState(false)
  return (
    <>
      <div className="mb-10 last-of-type:mb-0 border-[1px] border-light-grey-clr rounded-lg overflow-hidden">
        <div className="px-6 py-2 border-b-[1px] border-light-grey-clr">
          <Link
            // to={`/seller/${orderGroup.sellerId}`}
            to="/store/$sellerId"
            params={{
              sellerId: orderGroup.sellerId,
            }}
          >
            <p>
              Store: <b className="link">{orderGroup.sellerName}</b>
            </p>
          </Link>
        </div>
        {orderGroup.orderItems.map(
          (item: Record<string, string>, idx: number) => (
            <OrderItem key={idx} item={item} />
          ),
        )}

        <div className="items-center gap-2 bg-light-grey-clr w-full px-6 py-2">
          <div className="flex items-center justify-between mb-2 border-b-white border-b-[1px] pb-2">
            <p className="text-sm">Logistics</p>
            <p
              className="link text-xs font-semibold"
              onClick={() => setDeliveryModalActive(true)}
            >
              Change
            </p>
          </div>

          <div className="label-text flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <div className="w-8 aspect-square text-white flex items-center justify-center rounded-md bg-dark-blue-clr">
                <FaUps className="text-2xl" />
              </div>
              <span>
                <p className="text-sm font-semibold">UPS</p>
                <p className="text-xs">est. delivery date - 29th Jan 2024</p>
                <p className="text-xs">Delivers to - Doorstep</p>
              </span>
            </div>
          </div>
        </div>
      </div>
      {deliveryModalActive && (
        <LogisticChangeModal setState={setDeliveryModalActive} />
      )}
    </>
  )
}
