import { IoClose } from 'react-icons/io5'
import type { SetStateAction } from 'react'

export default function DeliveryAddressModal({
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
              select delivery address
            </h3>
            <IoClose
              className="text-xl cursor-pointer"
              onClick={() => setState(false)}
            />
          </div>
          <div className="px-4">
            <div className="form-control py-2 border-b">
              <label className="label cursor-pointer justify-start gap-2">
                <input
                  type="radio"
                  name="deliveryAddress"
                  className="radio checked:bg-orange-clr"
                />
                <span className="label-text flex gap-2 items-center">
                  <p className="text-sm">Default location</p>
                  <p className="text-sm font-semibold">
                    298A, Ajegunle Alakuko Lagos
                  </p>
                </span>
              </label>
            </div>

            <div className="form-control py-2">
              <label className="label w-full items-start cursor-pointer gap-2">
                <input
                  type="radio"
                  name="deliveryAddress"
                  className="radio checked:bg-orange-clr"
                />
                <div className="label-text w-full">
                  <p className="text-sm mb-4">Custom Location</p>
                  <form className="w-full">
                    <div className="flex flex-col md:flex-row gap-2 w-full mb-3">
                      <label htmlFor="customState" className="w-full">
                        <p className="text-sm uppercase">State</p>
                        <input
                          type="text"
                          name="customState"
                          id="customState"
                          className="input input-bordered  w-full"
                        />
                      </label>

                      <label htmlFor="customCity" className="w-full">
                        <p className="text-sm uppercase">city</p>
                        <input
                          type="text"
                          name="customCity"
                          id="customCity"
                          className="input input-bordered  w-full"
                        />
                      </label>
                    </div>

                    <label htmlFor="customHomeAddress" className="w-full">
                      <p className="text-sm uppercase">
                        home address (house no, lg, suite)
                      </p>
                      <input
                        type="text"
                        name="customHomeAddress"
                        id="customHomeAddress"
                        className="input input-bordered  w-full"
                      />
                    </label>

                    <label htmlFor="customAdditionalNotes" className="w-full">
                      <p className="text-sm uppercase mt-3">
                        additional note to logistic provider (optional)
                      </p>
                      <input
                        type="text"
                        name="customAdditionalNotes"
                        id="customAdditionalNotes"
                        className="input input-bordered  w-full"
                      />
                    </label>
                  </form>
                </div>
              </label>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <button className="btn btn-outline uppercase  border-orange-clr text-orange-clr hover:text-white hover:bg-orange-clr hover:border-orange-clr">
              choose delivery address
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
