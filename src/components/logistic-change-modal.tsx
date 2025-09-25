import { IoClose } from 'react-icons/io5'
import Loader from './loader'
import EmptyFile from './empty-file'
import AvatarComp from './avatar-comp'
import ProductRatings from './product-rating'
import { useGetProviders } from '@/api/checkout'
import { currency } from '@/utils/helpers'

export default function LogisticChangeModal({ groupId }: { groupId: string }) {
  const { isLoading, data: providers, isError } = useGetProviders(groupId)
  return (
    <>
      <dialog id={`order-modal-${groupId}`} className="modal">
        <div className="modal-box p-0">
          <div className="flex p-4 justify-between items-center border-b">
            <h3 className="text-sm lg:text-lg font-semibold uppercase">
              Change Logistic Provider
            </h3>
            <IoClose
              className="text-xl cursor-pointer hover:text-red-clr"
              onClick={() =>
                (
                  document.getElementById(
                    `order-modal-${groupId}`,
                  ) as HTMLDialogElement
                ).close()
              }
            />
          </div>
          {isLoading ? (
            <Loader />
          ) : isError || !providers ? (
            <EmptyFile text="We could not find any logistic provider for this route" />
          ) : (
            <>
              <div className="list w-full">
                {providers.map((provider, idx) => (
                  <div className="list-row w-full " key={idx}>
                    <label className="flex justify-between items-center cursor-pointer list-col-grow">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="logisticsProvider"
                          className="radio scale-75"
                        />
                        <div className="label-text flex justify-between items-center">
                          <div className="flex gap-2 items-center">
                            {provider.avatar ? (
                              <div className="w-12 h-12 rounded bg-light-grey-clr flex items-center justify-center overflow-hidden">
                                <img
                                  src={provider.avatar}
                                  alt=""
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ) : (
                              <AvatarComp size="md" username={provider.name} />
                            )}
                            <span>
                              <p className="text-sm font-semibold">
                                {provider.name}
                              </p>
                              <ProductRatings ratings="4" />
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm font-semibold">
                        {currency(provider.logisticCost)}
                      </p>
                    </label>
                  </div>
                ))}
              </div>
              <div className="w-full flex justify-center my-4 ">
                <button
                  className="btn btn-outline uppercase  border-orange-clr text-orange-clr hover:text-white hover:bg-orange-clr hover:border-orange-clr"
                  onClick={() =>
                    (
                      document.getElementById(
                        `order-modal-${groupId}`,
                      ) as HTMLDialogElement
                    ).close()
                  }
                >
                  Select Logistic Provider
                </button>
              </div>
            </>
          )}
        </div>

        {/* <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div> */}
      </dialog>
    </>
  )
}
