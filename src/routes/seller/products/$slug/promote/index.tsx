import { createFileRoute } from '@tanstack/react-router'
import { FaCheck, FaStar } from 'react-icons/fa6'

export const Route = createFileRoute('/seller/products/$slug/promote/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <h2 className="font-semibold text-2xl hidden md:block pb-2 border-b mb-6 uppercase">
        promotion
      </h2>

      <div className="flex gap-4 flex-col md:flex-row mt-6 md:mb-0">
        <div className="flex flex-col gap-2 w-full basis-1/2">
          <div className="w-full aspect-3/2 rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1606588260160-0c4707ab7db5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRvbWF0b2VzfGVufDB8fDB8fHww"
              alt="Product image"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div className="aspect-3/2 rounded-md overflow-hidden bg-white">
              <img
                src="https://images.unsplash.com/photo-1606588260160-0c4707ab7db5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRvbWF0b2VzfGVufDB8fDB8fHww"
                alt="Product Image"
                className="w-full h-full object-cover opacity-50 hover:opacity-100"
              />
            </div>
            <div className="aspect-3/2 rounded-md overflow-hidden bg-white">
              <img
                src="https://images.unsplash.com/photo-1562447575-88db38dcc649?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHRvbWF0b2VzfGVufDB8fDB8fHww"
                alt="Product Image"
                className="w-full h-full object-cover opacity-50 hover:opacity-100"
              />
            </div>
            <div className="aspect-3/2 rounded-md overflow-hidden bg-white">
              <img
                src="https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHRvbWF0b2VzfGVufDB8fDB8fHww"
                alt="Product Image"
                className="w-full h-full object-cover opacity-50 hover:opacity-100"
              />
            </div>
            <div className="aspect-3/2 rounded-md overflow-hidden bg-white">
              <img
                src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dG9tYXRvZXN8ZW58MHx8MHx8fDA%3D"
                alt="Product Image"
                className="w-full h-full object-cover opacity-50 hover:opacity-100"
              />
            </div>
          </div>
        </div>

        <div className="w-full basis-1/2">
          <h2 className="text-lg font-semibold md:font-normal md:text-3xl">
            Fresh Tomatoes
          </h2>
          <hr className="my-3" />
          <h1 className="text-lg font-normal md:text-3xl">
            N3,458 + N1,200 <span className="text-sm">(logistics)</span>
          </h1>
          <hr className="my-3" />
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur. Ornare odio at magna mus sed
            elementum eleifend aenean tincidunt. Fringilla adipiscing id nibh
            imperdiet ultricies viverra ipsum rutrum. Elementum nunc diam
            volutpat scelerisque. Morbi duis pharetra ultricies sed.
            Pellentesque facilisis sit aliquam aenean urna facilisis. Malesuada
            venenatis in nunc varius diam vulputate pretium egestas.
          </p>
          <hr className="my-3" />
          <div className="flex items-center gap-2">
            <FaStar className="text-md text-yellow-300" />
            <FaStar className="text-md text-yellow-300" />
            <FaStar className="text-md text-yellow-300" />
            <FaStar className="text-md text-yellow-300" />
            <FaStar className="text-md text-gray-300" />
            <p className="text-sm pl-3">25 Reviews</p>
          </div>
          <hr className="my-3" />
        </div>
      </div>

      <p className="text-sm font-semibold border-b uppercase mt-12">
        promote this product
      </p>

      <div className="carousel carousel-center gap-3 my-6 w-full">
        <div className="carousel-item">
          <div className="rounded-lg text-center border min-w-[250px] py-4">
            <p className="text-center text-sm uppercase my-4 font-semibold text-gray-400">
              tier 1 - free
            </p>
            <h3 className="text-lg uppercase text-orange-clr border-y border-orange-clr py-3 font-semibold">
              regular plan
            </h3>
            <p className="my-4 text-sm font-semibold uppercase text-grey-clr">
              benefits
            </p>
            <span className="flex items-center gap-4 justify-center uppercase my-2">
              <FaCheck className="text-light-green-clr" />
              <p className="text-grey-clr text-sm">+225% VIEWS INCREASE</p>
            </span>
            <span className="flex items-center gap-4 justify-center uppercase my-2">
              <FaCheck className="text-light-green-clr" />
              <p className="text-grey-clr text-sm">+125% ORDER LIKELIHOOD</p>
            </span>
            <span className="flex items-center gap-4 justify-center uppercase my-2">
              <FaCheck className="text-light-green-clr" />
              <p className="text-grey-clr text-sm">SHOW ONLY POSITIVE REVIEW</p>
            </span>
            <span className="flex items-center gap-4 justify-center uppercase my-2">
              <FaCheck className="text-light-green-clr" />
              <p className="text-grey-clr text-sm">PRIORITY DELIVERY</p>
            </span>
            <span className="flex items-center gap-4 justify-center uppercase my-2">
              <FaCheck className="text-light-green-clr" />
              <p className="text-grey-clr text-sm">PRIORITY NOTIFICATION</p>
            </span>
            <span className="flex items-center gap-4 justify-center uppercase my-2">
              <FaCheck className="text-light-green-clr" />
              <p className="text-grey-clr text-sm">-10% LOGISTIC CHARGES</p>
            </span>
          </div>
        </div>

        <div className="carousel-item">
          <div className="rounded-lg text-center border min-w-[270px] py-4 bg-dark-blue-clr">
            <p className="text-center text-sm uppercase my-4 font-semibold text-white">
              tier 2 - NGN 13,000
            </p>
            <h3 className="text-lg uppercase text-orange-clr border-y border-orange-clr py-3 font-semibold">
              vip plan
            </h3>
            <p className="my-4 text-sm font-semibold uppercase text-white">
              benefits
            </p>
            <span className="flex items-center gap-4 justify-center uppercase my-2">
              <FaCheck className="text-light-green-clr" />
              <p className="text-white text-sm">+225% VIEWS INCREASE</p>
            </span>
            <span className="flex items-center gap-4 justify-center uppercase my-2">
              <FaCheck className="text-light-green-clr" />
              <p className="text-white text-sm">+125% ORDER LIKELIHOOD</p>
            </span>
            <span className="flex items-center gap-4 justify-center uppercase my-2">
              <FaCheck className="text-light-green-clr" />
              <p className="text-white text-sm">SHOW ONLY POSITIVE REVIEW</p>
            </span>
            <span className="flex items-center gap-4 justify-center uppercase my-2">
              <FaCheck className="text-light-green-clr" />
              <p className="text-white text-sm">PRIORITY DELIVERY</p>
            </span>
            <span className="flex items-center gap-4 justify-center uppercase my-2">
              <FaCheck className="text-light-green-clr" />
              <p className="text-white text-sm">PRIORITY NOTIFICATION</p>
            </span>
            <span className="flex items-center gap-4 justify-center uppercase my-2">
              <FaCheck className="text-light-green-clr" />
              <p className="text-white text-sm">-10% LOGISTIC CHARGES</p>
            </span>
          </div>
        </div>

        <div className="carousel-item">
          <div className="rounded-lg text-center border min-w-[250px] py-4">
            <p className="text-center text-sm uppercase my-4 font-semibold text-gray-400">
              tier 3 - ngn 20,000
            </p>
            <h3 className="text-lg uppercase text-orange-clr border-y border-orange-clr py-3 font-semibold">
              platinum plan
            </h3>
            <p className="my-4 text-sm font-semibold uppercase text-grey-clr">
              benefits
            </p>
            <span className="flex items-center gap-4 justify-center uppercase my-2">
              <FaCheck className="text-light-green-clr" />
              <p className="text-grey-clr text-sm">+225% VIEWS INCREASE</p>
            </span>
            <span className="flex items-center gap-4 justify-center uppercase my-2">
              <FaCheck className="text-light-green-clr" />
              <p className="text-grey-clr text-sm">+125% ORDER LIKELIHOOD</p>
            </span>
            <span className="flex items-center gap-4 justify-center uppercase my-2">
              <FaCheck className="text-light-green-clr" />
              <p className="text-grey-clr text-sm">SHOW ONLY POSITIVE REVIEW</p>
            </span>
            <span className="flex items-center gap-4 justify-center uppercase my-2">
              <FaCheck className="text-light-green-clr" />
              <p className="text-grey-clr text-sm">PRIORITY DELIVERY</p>
            </span>
            <span className="flex items-center gap-4 justify-center uppercase my-2">
              <FaCheck className="text-light-green-clr" />
              <p className="text-grey-clr text-sm">PRIORITY NOTIFICATION</p>
            </span>
            <span className="flex items-center gap-4 justify-center uppercase my-2">
              <FaCheck className="text-light-green-clr" />
              <p className="text-grey-clr text-sm">-10% LOGISTIC CHARGES</p>
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <button className="btn btn-outline uppercase border-orange-clr text-orange-clr hover:text-white hover:bg-orange-clr ">
          promote product
        </button>
      </div>
    </>
  )
}
