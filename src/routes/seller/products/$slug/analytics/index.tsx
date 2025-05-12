import { Link, createFileRoute } from '@tanstack/react-router'
import { FaStar } from 'react-icons/fa'

export const Route = createFileRoute('/seller/products/$slug/analytics/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <h2 className="font-semibold text-2xl hidden md:block pb-2 border-b mb-6">
        PRODUCT ANALYTICS
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

          <Link
            to="/seller/products/$slug/promote"
            params={{
              slug: 'gaagaghgah',
            }}
            className="btn  border-orange-clr bg-white text-orange-clr hover:bg-orange-clr hover:text-white hover:border-orange-clr uppercase"
          >
            Promote this product
          </Link>
        </div>
      </div>

      <div role="tablist" className="tabs tabs-bordered mt-12">
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab after:w-[max-content]"
          aria-label="Engagements"
          defaultChecked
        />
        <div role="tabpanel" className="tab-content">
          <div className="block md:flex items-center gap-8 justify-around border-t-2 py-2">
            <span className="block pt-2">
              <p className="text-sm font-semibold">VIEWS</p>
              <p className="text-sm">205</p>
            </span>
            <span className="block pt-2">
              <p className="text-sm font-semibold">CARTS</p>
              <p className="text-sm">88</p>
            </span>
            <span className="block pt-2">
              <p className="text-sm font-semibold">SAVES</p>
              <p className="text-sm">189</p>
            </span>
            <span className="block pt-2">
              <p className="text-sm font-semibold">ORDERS</p>
              <p className="text-sm">35</p>
            </span>
          </div>
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab  after:w-[max-content]"
          aria-label="Reviews"
        />
        <div role="tabpanel" className="tab-content ">
          <div className="block md:flex items-center gap-8 justify-around border-t-2 py-2">
            <span className="block pt-2">
              <p className="text-sm font-semibold">VIEWS</p>
              <p className="text-sm">205</p>
            </span>
            <span className="block pt-2">
              <p className="text-sm font-semibold">CARTS</p>
              <p className="text-sm">88</p>
            </span>
            <span className="block pt-2">
              <p className="text-sm font-semibold">SAVES</p>
              <p className="text-sm">189</p>
            </span>
            <span className="block pt-2">
              <p className="text-sm font-semibold">ORDERS</p>
              <p className="text-sm">35</p>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
