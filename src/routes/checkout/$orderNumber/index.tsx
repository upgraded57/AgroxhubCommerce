import { createFileRoute, useParams } from '@tanstack/react-router'
import { useQueryClient } from '@tanstack/react-query'
import { useGetOrder } from '@/api/checkout'
import { useInitiatePayment } from '@/api/payment'
import { userAddOrderNotes } from '@/api/order'
import EmptyProducts from '@/components/empty-products'
import Loader from '@/components/loader'
import OrderGroup from '@/components/order-group'
import AppLayout from '@/layouts/app-layout'

export const Route = createFileRoute('/checkout/$orderNumber/')({
  component: RouteComponent,
})

function RouteComponent() {
  const orderNumber = useParams({
    from: '/checkout/$orderNumber/',
    select: (p) => p.orderNumber,
  })

  const queryClient = useQueryClient()

  const { data: order, isLoading } = useGetOrder(orderNumber)
  const { mutateAsync: initiatePayment, isPending: isInitiatingPayment } =
    useInitiatePayment()

  const { mutateAsync: addOrderNotes, isPending: isAddingNotes } =
    userAddOrderNotes()

  if (isLoading) return <Loader />

  if (!order) {
    return (
      <EmptyProducts text="Unable to load your order at the moment. Please retry" />
    )
  }

  if (order && Object.entries(order).length === 0) {
    return <EmptyProducts text="You have no open order at this moment" />
  }

  const handleSubmitNotes = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target as HTMLFormElement))

    addOrderNotes({
      orderNumber,
      notes: data,
    }).then(() => {
      queryClient.invalidateQueries({
        queryKey: ['Order', orderNumber],
      })
    })
  }

  const handleInitiatePayment = () => {
    initiatePayment(orderNumber).then((res) => {
      window.location = res.data.data.authorization_url
    })
  }

  return (
    <AppLayout>
      <div className="text-center my-12">
        <h2 className="text-lg md:text-2xl font-semibold uppercase">
          checkout
        </h2>
        <p className="text-sm">Please review your order before checkout</p>
      </div>

      <div className="contEl mb-12 lg:flex gap-4 relative">
        <div className="basis-2/3">
          {order?.orderGroups?.map((orderGroup: any, idx: number) => (
            <OrderGroup key={idx} orderGroup={orderGroup} />
          ))}
        </div>

        <div className="basis-1/3 lg:sticky lg:top-[80px] mt-4 lg:mt-0 grow-0 self-start">
          {/* Additional Information */}
          <form
            className="p-6 bg-light-grey-clr rounded-lg mb-4"
            onSubmit={handleSubmitNotes}
          >
            <p className="text-sm text-center font-semibold uppercase">
              Additional Information
            </p>

            <label className="block my-6" htmlFor="sellerNote">
              <p className="text-xs mb-2">Note to Sellers</p>
              <input
                type="text"
                name="sellerNote"
                id="sellerNote"
                className="input w-full"
                defaultValue={order?.sellerNote}
                disabled={isAddingNotes}
              />
            </label>

            <label className="block" htmlFor="logisticsNote">
              <p className="text-xs mb-2">Note to Logistic Providers</p>
              <input
                type="text"
                name="logisticsNote"
                id="logisticsNote"
                className="input w-full"
                defaultValue={order?.logisticsNote}
                disabled={isAddingNotes}
              />
            </label>

            <button
              type="submit"
              className="btn mt-4 bg-dark-green-clr text-white border-0"
              disabled={isAddingNotes}
            >
              {isAddingNotes ? 'Adding' : 'Add'} Notes
            </button>
          </form>

          {/* Delivery Information */}
          <div className="p-6 bg-light-grey-clr rounded-lg mb-4">
            <p className="text-sm text-center font-semibold uppercase">
              Delivery Information
            </p>

            <span className="block my-6">
              <p className="text-xs">Delivery Region</p>
              <p className="font-medium text-sm">
                {`${order?.deliveryRegion?.state} State, ${order?.deliveryRegion?.lcda} LCDA, ${order?.deliveryRegion?.name} Region`}
              </p>
            </span>

            <span className="block my-6">
              <p className="text-xs">Delivery Address</p>
              <p className="font-medium text-sm">{order?.deliveryAddress}</p>
            </span>
          </div>

          {/* Order Summary */}
          <div className="p-6 bg-light-grey-clr rounded-lg">
            <p className="text-sm font-semibold text-center uppercase mb-6">
              order summary
            </p>

            <div className="mb-6">
              <span className="flex items-center justify-between mb-4">
                <p className="text-sm">Products Price</p>
                <p className="text-sm font-semibold">
                  NGN {order?.productsAmount?.toLocaleString()}
                </p>
              </span>
              <span className="flex items-center justify-between my-4">
                <p className="text-sm">Logistic Cost</p>
                <p className="text-sm font-semibold">
                  NGN {order?.logisticsAmount.toLocaleString()}
                </p>
              </span>
              <span className="flex items-center justify-between mt-4">
                <p className="text-sm">VAT</p>
                <p className="text-sm font-semibold">
                  NGN {order?.vat.toLocaleString()}
                </p>
              </span>
              <span className="flex items-center justify-between mt-4">
                <p className="text-sm">Total Cost</p>
                <p className="text-sm font-semibold">
                  NGN {order?.totalAmount.toLocaleString()}
                </p>
              </span>
            </div>

            <div className="mb-6 w-full">
              <p className="text-sm">Promo Code</p>
              <div className="flex items-center gap-2">
                <input
                  className="input input-sm input-bordered border-2 rounded-md w-full"
                  placeholder="Email"
                />
                <button className="btn btn-sm btn-outline bg-white uppercase rounded-md border-2 border-orange-clr text-orange-clr hover:text-white hover:bg-orange-clr hover:border-orange-clr">
                  apply
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <button
                className="btn green-gradient w-full uppercase"
                onClick={handleInitiatePayment}
                disabled={isInitiatingPayment}
              >
                proceed to pay with paystack
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
