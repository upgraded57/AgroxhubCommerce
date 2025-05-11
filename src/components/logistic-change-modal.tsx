import { FaUps } from 'react-icons/fa6'
import { IoClose } from 'react-icons/io5'
import type { SetStateAction } from 'react'

export default function LogisticChangeModal({
  setState,
}: {
  setState: React.Dispatch<SetStateAction<boolean>>
}) {
  return (
    <>
      <div className="fixed w-[100vw] h-[100vh] items-center inset-0 flex justify-center z-50 px-[4vw] backdrop-blur-xs">
        <div className="absolute w-full h-full bg-black opacity-50 -z-10"></div>
        <div className="w-full max-w-[600px] rounded-lg h-auto bg-white pb-6">
          <div className="flex px-4 py-2 justify-between items-center border-b">
            <h3 className="text-md md:text-xl font-semibold uppercase">
              Change Logistic Provider
            </h3>
            <IoClose
              className="text-xl cursor-pointer"
              onClick={() => setState(false)}
            />
          </div>
          <div className="px-4">
            {[1, 2, 3, 4].map((_, idx) => (
              <div className="form-control pr-2" key={idx}>
                <label className="label justify-between gap-2 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="logisticsProvider"
                      className="radio scale-75"
                    />
                    <div className="label-text flex justify-between items-center">
                      <div className="flex gap-2 items-center">
                        <div className="w-8 aspect-square text-white flex items-center justify-center rounded-md bg-dark-blue-clr">
                          <FaUps className="text-2xl" />
                        </div>
                        <span>
                          <p className="text-sm font-semibold">UPS</p>
                          <p className="text-xs">
                            est. delivery date - 29th Jan 2024
                          </p>
                          <p className="text-xs">Delivers to - Doorstep</p>
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm font-semibold">NGN 1,320</p>
                </label>
              </div>
            ))}
          </div>
          <div className="w-full flex justify-center mt-4">
            <button
              className="btn btn-outline uppercase border-2 border-orange-clr text-orange-clr hover:text-white hover:bg-orange-clr hover:border-orange-clr"
              onClick={() => setState(false)}
            >
              Select Logistic Provider
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
