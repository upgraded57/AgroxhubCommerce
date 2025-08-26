import { Link, createFileRoute, useParams } from '@tanstack/react-router'
import { FaStar } from 'react-icons/fa'
import { useGetSingleProduct } from '@/api/product'
import Loader from '@/components/loader'
import ProductNotFound from '@/components/product-not-found'
import ProductRatings from '@/components/product-rating'

export const Route = createFileRoute('/seller/products/$slug/analytics/')({
  component: RouteComponent,
})

function RouteComponent() {
  const slug = useParams({
    from: '/seller/products/$slug/analytics/',
    select: (p) => p.slug,
  })
  const { data: product, isLoading, isError } = useGetSingleProduct(slug)

  if (isLoading) {
    return <Loader />
  }

  if (!product || isError) {
    return <ProductNotFound type="single" />
  }
  return (
    <>
      <h2 className="font-semibold text-2xl hidden md:block pb-2 border-b mb-6">
        PRODUCT ANALYTICS
      </h2>

      <div className="flex gap-4 flex-col md:flex-row mt-6 md:mb-0">
        <div className="flex flex-col gap-2 w-full basis-1/2">
          <div className="w-full aspect-3/2 rounded-lg overflow-hidden border">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((img, idx) => (
              <div
                className="aspect-3/2 rounded-md overflow-hidden bg-white border"
                key={idx}
              >
                <img
                  src={img}
                  alt={product.name}
                  className="w-full h-full object-cover opacity-50 hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full basis-1/2">
          <h2 className="text-lg font-semibold md:font-normal md:text-3xl">
            {product.name}
          </h2>
          <hr className="my-3" />
          <h1 className="text-lg font-normal md:text-3xl">
            N{product.unitPrice.toLocaleString()}
          </h1>
          <hr className="my-3" />
          <p className="text-sm">{product.description}</p>
          <hr className="my-3" />
          <div className="flex items-center gap-2">
            <ProductRatings ratings={String(product.ratings)} />
            <p className="text-sm pl-3">
              {product.reviews?.length || 0} Reviews
            </p>
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
