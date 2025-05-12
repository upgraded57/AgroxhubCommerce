import { createFileRoute, useParams } from '@tanstack/react-router'

export const Route = createFileRoute('/user/orders/$id/review/')({
  component: RouteComponent,
})

function RouteComponent() {
  const productId = useParams({
    from: '/user/orders/$id/review/',
  })
  console.log(productId)
  return (
    <>
      <h2 className="hidden border-b pb-2 md:block font-semibold text-2xl uppercase">
        product review
      </h2>

      <div className="flex gap-4 flex-col md:flex-row mt-6">
        <div className="flex flex-col gap-2 w-full basis-1/3">
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

        <div className="w-full basis-2/3">
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
        </div>
      </div>

      <div className="my-12">
        <p className="text-sm font-semibold uppercase border-b">
          review this product
        </p>
        <div className="my-4 flex gap-2 items-center">
          <p className="text-sm">Product Rating:</p>
          <div className="rating gap-2">
            <input
              type="radio"
              name="rating-1"
              className="mask mask-star-2 bg-orange-400"
              defaultChecked
            />
            <input
              type="radio"
              name="rating-1"
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-1"
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-1"
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-1"
              className="mask mask-star-2 bg-orange-400"
            />
          </div>
        </div>

        <label htmlFor="productReview" className="block">
          <p className="text-sm">Product Review</p>
          <textarea
            id="productReview"
            className="textarea textarea-bordered  w-full"
          ></textarea>
        </label>
      </div>

      <div className="mt-12">
        <p className="text-sm font-semibold uppercase border-b">
          review the logistic service
        </p>
        <div className="my-4 flex gap-2 items-center">
          <p className="text-sm">Logistic Service Rating:</p>
          <div className="rating gap-2">
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
              defaultChecked
            />
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
            />
          </div>
        </div>

        <label htmlFor="logisticsReview" className="block">
          <p className="text-sm">Logistic Service Review</p>
          <textarea
            id="logisticsReview"
            className="textarea textarea-bordered  w-full"
          ></textarea>
        </label>
      </div>

      <button className="btn mt-4 btn-outline  border-orange-clr text-orange-clr hover:text-white hover:bg-orange-clr hover:border-orange-clr uppercase">
        post review
      </button>
    </>
  )
}
