import { IoClose } from 'react-icons/io5'
import Loader from './loader'
import EmptyFile from './empty-file'
import AvatarComp from './avatar-comp'
import type { SetStateAction } from 'react'
import { useGetProviders } from '@/api/checkout'

export default function LogisticChangeModal({
  setState,
  groupId,
}: {
  setState: React.Dispatch<SetStateAction<boolean>>
  groupId: string
}) {
  const { isLoading, data: providers, isError } = useGetProviders(groupId)
  return (
    <>
      <div className="fixed w-[100vw] h-[100vh] items-center inset-0 flex justify-center z-50 px-[4vw] backdrop-blur-xs">
        <div className="absolute w-full h-full bg-black opacity-50 -z-10"></div>
        <div className="w-full max-w-[600px] rounded-lg h-auto bg-white pb-6">
          <div className="flex p-4 justify-between items-center border-b">
            <h3 className="text-sm lg:text-lg font-semibold uppercase">
              Change Logistic Provider
            </h3>
            <IoClose
              className="text-xl cursor-pointer"
              onClick={() => setState(false)}
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
                              <p className="text-xs">
                                est. delivery date - 29th Jan 2024
                              </p>
                              <p className="text-xs">Delivers to - Doorstep</p>
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm font-semibold">
                        N {provider.logisticCost}
                      </p>
                    </label>
                  </div>
                ))}
              </div>
              <div className="w-full flex justify-center mt-4">
                <button
                  className="btn btn-outline uppercase  border-orange-clr text-orange-clr hover:text-white hover:bg-orange-clr hover:border-orange-clr"
                  onClick={() => setState(false)}
                >
                  Select Logistic Provider
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
