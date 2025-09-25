import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { use, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import AppLayout from '@/layouts/app-layout'
import { CartContext } from '@/providers/CartContext'
import CartItem from '@/components/cart-item'
import EmptyCart from '@/components/empty-cart'
import { useGetUser } from '@/api/user'
import useRegions from '@/hooks/use-regions'
import { useCreateOrder } from '@/api/checkout'
import { currency } from '@/utils/helpers'

export const Route = createFileRoute('/cart/')({
  component: RouteComponent,
})

function RouteComponent() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const cartItems = use(CartContext)?.cart
  const { data: user } = useGetUser()
  const [customRegion, setCustomRegion] = useState('')

  const [deliveryInfo, setDeliveryInfo] = useState<{
    type: 'default' | 'custom' | null
    address?: string
    regionId?: string
  }>({
    type: null, // either default or custom
    address: '', // address to deliver product to
    regionId: '', // id of selected delivery region
  })

  const { isLoadingRegions, regions, selectedRegion, setSelectedRegion } =
    useRegions()

  const { mutateAsync: createOrder, isPending: isCreatingOrder } =
    useCreateOrder()

  const totalPrice = cartItems
    ? cartItems.reduce((acc, item) => {
        if (item.price) {
          return acc + item.price
        } else return acc
      }, 0)
    : 0

  const handleSetRegion = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion((prev) => ({
      ...prev,
      selectedRegion: e.target.value,
    }))

    setDeliveryInfo((prev) => ({
      ...prev,
      regionId: e.target.value,
    }))

    setCustomRegion(e.target.value)
  }

  const setDelivery = (type: 'default' | 'custom') => {
    if (type === 'default') {
      setDeliveryInfo((prev) => ({
        ...prev,
        type: 'default',
        address: user?.address,
        regionId: user?.region?.id,
      }))
    } else {
      setDeliveryInfo((prev) => ({
        ...prev,
        type: 'custom',
        regionId: customRegion,
      }))
    }
  }

  const handleRouteToLogin = () => {
    const currentLocation = window.location.pathname
    navigate({
      to: `/auth/login?from=${currentLocation}`,
    })
  }

  const handleCheckout = () => {
    if (!deliveryInfo.type) {
      toast.warning('Unable to proceed', {
        description: 'Please choose a delivery option',
        id: 'cartToast',
      })
      return
    }

    if (!deliveryInfo.regionId) {
      toast.warning('Unable to proceed', {
        description: 'Please select a delivery region',
        id: 'cartToast',
      })
      return
    }

    if (!deliveryInfo.address) {
      toast.warning('Unable to proceed', {
        description: 'Please enter a delivery address',
        id: 'cartToast',
      })
      return
    }

    createOrder({
      deliveryAddress: deliveryInfo.address,
      deliveryRegionId: deliveryInfo.regionId,
      cartId: cartItems?.[0]?.cartId,
    }).then((res) => {
      queryClient.invalidateQueries({
        queryKey: ['Order'],
      })
      queryClient.invalidateQueries({
        queryKey: ['Orders'],
      })
      navigate({
        to: `/checkout/${res.data.order.orderNumber}`,
      })
    })
  }

  return (
    <AppLayout>
      <>
        <h2 className="text-lg md:text-2xl font-semibold uppercase text-center my-12">
          shopping cart
        </h2>

        <div className="contEl mb-12">
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item, idx) => <CartItem item={item} key={idx} />)
          ) : (
            <EmptyCart />
          )}

          {cartItems && cartItems.length > 0 && (
            <div className="block my-12 md:flex gap-4">
              {/* Delivery Address */}
              <div className="basis-3/5 mb-6 md:mb-0">
                <div className="w-full border rounded-lg">
                  <p className="text-sm font-semibold p-2 uppercase border-b">
                    delivery location
                  </p>

                  {user ? (
                    <>
                      <div className="w-full rounded-lg h-auto bg-white pb-4">
                        <div className="px-4">
                          {/* Default Delivery Address */}
                          <div className="form-control py-2 border-b">
                            <label className="label cursor-pointer items-start justify-start gap-2">
                              <input
                                type="radio"
                                name="deliveryAddress"
                                className="radio radio-sm md:radio-md checked:bg-orange-clr"
                                disabled={!user.address || !user.regionId}
                                onChange={() => setDelivery('default')}
                              />
                              <div
                                className={`${deliveryInfo.type === 'default' && 'text-black-clr'}`}
                              >
                                <span className="label-text flex flex-col md:flex-row md:gap-2 md:items-center">
                                  <p className="text-sm">Default location</p>
                                  <p className="text-sm font-semibold">
                                    {user.address}
                                  </p>
                                </span>
                                {user.address && user.regionId ? (
                                  <p className="text-sm pt-2">
                                    State - {user.region?.state} <br /> LCDA -{' '}
                                    {user.region?.lcda}
                                    <br /> Region - {user.region?.name}
                                  </p>
                                ) : (
                                  <p className="text-sm pt-2 text-wrap">
                                    <i>
                                      Set your State, LCDA and Region in edit
                                      profile to choose this option
                                    </i>
                                  </p>
                                )}
                              </div>
                            </label>
                          </div>

                          {/* Custom Delivery Address */}
                          <div className="form-control py-2">
                            <label className="label w-full items-start cursor-pointer gap-2">
                              <input
                                type="radio"
                                name="deliveryAddress"
                                className="radio radio-sm md:radio-md checked:bg-orange-clr"
                                onChange={() => {
                                  setDelivery('custom')
                                  setDeliveryInfo((prev) => ({
                                    ...prev,
                                    type: 'custom',
                                  }))
                                }}
                              />
                              <div
                                className={`label-text w-full ${deliveryInfo.type === 'custom' && 'text-black-clr'}`}
                              >
                                <p className="text-sm mb-4">Custom Location</p>
                                <div className="flex flex-col lg:flex-row items-center gap-6 mb-6 w-full">
                                  <label
                                    htmlFor="state"
                                    className="block w-full"
                                  >
                                    <p className="text-sm uppercase">
                                      State of residence
                                    </p>
                                    <select
                                      className="select select-bordered min-w-full"
                                      defaultValue=""
                                      name="state"
                                      disabled={
                                        isLoadingRegions ||
                                        !regions ||
                                        regions.length < 1
                                      }
                                      onChange={(e) =>
                                        setSelectedRegion((prev) => ({
                                          ...prev,
                                          state: e.target.value,
                                        }))
                                      }
                                    >
                                      <option value="" disabled>
                                        -- Select State --
                                      </option>
                                      <option value="Lagos">Lagos</option>
                                    </select>
                                  </label>

                                  <label
                                    htmlFor="lcda"
                                    className="block w-full"
                                  >
                                    <p className="text-sm uppercase">
                                      lcda of residence
                                    </p>
                                    <select
                                      className="select select-bordered min-w-full"
                                      defaultValue=""
                                      name="lcda"
                                      disabled={
                                        isLoadingRegions ||
                                        !selectedRegion.state
                                      }
                                      onChange={(e) =>
                                        setSelectedRegion((prev) => ({
                                          ...prev,
                                          selectedLcda: e.target.value,
                                        }))
                                      }
                                    >
                                      <option value="" disabled>
                                        -- Select Lcda --
                                      </option>
                                      {selectedRegion.lcda.map(
                                        (item: string, idx: number) => (
                                          <option value={item} key={idx}>
                                            {item}
                                          </option>
                                        ),
                                      )}
                                    </select>
                                  </label>

                                  <label
                                    htmlFor="regionId"
                                    className="block w-full"
                                  >
                                    <p className="text-sm uppercase">
                                      Region of residence
                                    </p>
                                    <select
                                      className="select select-bordered min-w-full"
                                      defaultValue=""
                                      name="regionId"
                                      value={customRegion}
                                      disabled={
                                        isLoadingRegions ||
                                        !selectedRegion.selectedLcda
                                      }
                                      onChange={(e) => handleSetRegion(e)}
                                    >
                                      <option value="" disabled>
                                        -- Select Region --
                                      </option>
                                      {selectedRegion.region
                                        ?.sort((a, b) =>
                                          a.name.localeCompare(b.name),
                                        )
                                        .map((item, idx) => (
                                          <option value={item.id} key={idx}>
                                            {item.name}
                                          </option>
                                        ))}
                                    </select>
                                  </label>
                                </div>
                                <label
                                  htmlFor="customAddress"
                                  className="block w-full"
                                >
                                  <p className="text-sm uppercase">
                                    Delivery Address
                                  </p>
                                  <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    disabled={
                                      isLoadingRegions ||
                                      !selectedRegion.selectedRegion
                                    }
                                    onChange={(e) => {
                                      setDeliveryInfo((prev) => ({
                                        ...prev,
                                        address: e.target.value,
                                      }))
                                    }}
                                  />
                                </label>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-full p-6 flex flex-col gap-6 items-center justify-center min-h-[300px]">
                        <p className="text-sm">
                          You must be logged in to continue
                        </p>
                        <div className="w-full flex flex-col md:flex-row justify-center">
                          <button
                            className="btn w-full md:w-max uppercase green-gradient"
                            onClick={handleRouteToLogin}
                          >
                            Login
                          </button>
                          <div className="divider md:divider-horizontal text-xs">
                            OR
                          </div>
                          <Link
                            to="/auth/register"
                            className="btn w-full md:w-max uppercase"
                          >
                            Create an Account
                          </Link>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Order Summary */}
              <div className="basis-2/5">
                <div className="w-full border rounded-lg">
                  <p className="text-sm font-semibold p-2 uppercase border-b">
                    order summary
                  </p>

                  <div className="p-4">
                    <span className="flex items-center justify-between mb-4">
                      <p className="text-sm">Products Price</p>
                      <p className="text-sm font-semibold">
                        {currency(totalPrice)}
                      </p>
                    </span>
                    <span className="flex items-center justify-between my-4">
                      <p className="text-sm">Logistic Cost</p>
                      <p className="text-xs">* Calculated on checkout</p>
                    </span>
                    <span className="flex items-center justify-between mt-4">
                      <p className="text-sm">Total Cost</p>
                      <p className="text-xs">* Calculated on checkout</p>
                    </span>
                  </div>

                  <div className="border-t border-b block p-4 w-full">
                    <p className="text-sm">Promo Code</p>
                    <div className="flex items-center gap-2">
                      <input
                        className="input input-sm input-bordered w-full"
                        placeholder="Email"
                      />
                      <button className="btn btn-warning btn-outline btn-sm hover:text-white">
                        Apply
                      </button>
                    </div>
                  </div>

                  <div className="flex p-4 items-center justify-center">
                    {user ? (
                      <div className="w-full">
                        <button
                          onClick={handleCheckout}
                          className="btn green-gradient w-full uppercase"
                          disabled={isCreatingOrder}
                        >
                          {isCreatingOrder ? (
                            <span className="loading loading-lg loading-dots" />
                          ) : (
                            'proceed to checkout'
                          )}
                        </button>
                        <div className="divider text-sm text-gray-400">OR</div>
                        <button
                          className="btn text-gray-500 uppercase w-full"
                          onClick={() =>
                            toast.warning('Coming soon', {
                              description:
                                "You're not yet eligible for this offer",
                            })
                          }
                        >
                          buy now pay later
                        </button>
                      </div>
                    ) : (
                      <button
                        className="btn w-full uppercase"
                        onClick={handleRouteToLogin}
                      >
                        Login to continue
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    </AppLayout>
  )
}
