import { useQueryClient } from '@tanstack/react-query'
import { createFileRoute, useParams } from '@tanstack/react-router'
import moment from 'moment'
import { FaStar } from 'react-icons/fa6'
import BeASeller from '@/components/be-a-seller'
import ProductsGrid from '@/components/products-grid'
import SimilarSellers from '@/components/similar-sellers'
import {
  useCheckIsFollowing,
  useFollowSeller,
  useGetSeller,
  useGetSellerMostPurchasedProducts,
  useGetSellerNewestProducts,
} from '@/api/seller'
import { useGetUser } from '@/api/user'
import AvatarComp from '@/components/avatar-comp'

export const Route = createFileRoute('/store/$sellerId/')({
  component: RouteComponent,
})

function RouteComponent() {
  const queryClient = useQueryClient()

  const { data: user } = useGetUser()
  const isBuyer = user && user.type === 'buyer'
  const { sellerId } = useParams({
    from: '/store/$sellerId/',
  })

  const { isLoading, data: seller } = useGetSeller(sellerId)
  const { isLoading: isLoadingSellerProducts, data: sellerProducts } =
    useGetSellerMostPurchasedProducts(sellerId)

  const {
    isLoading: isLoadingSellerNewestProducts,
    data: farmerNewestProducts,
  } = useGetSellerNewestProducts(sellerId)

  const summary = [
    {
      title: 'Products',
      qty: (seller as any)?._count.products || 0,
    },
    {
      title: 'Sales',
      qty: 205,
    },
    {
      title: 'Orders',
      qty: 205,
    },
    {
      title: 'Cart',
      qty: 205,
    },
    {
      title: 'Reviews',
      qty: 205,
    },
    {
      title: 'Followers',
      qty: 205,
    },
  ]

  const {
    isLoading: isCheckingFollowing,
    data: isFollowing,
    isFetching: isFetchingFollowing,
  } = useCheckIsFollowing(sellerId)

  const { mutateAsync: followSeller, isPending: isLoadingFollowSeller } =
    useFollowSeller()

  const handleFollowSeller = () => {
    followSeller(sellerId).then(() => {
      queryClient.invalidateQueries({
        queryKey: ['isFollowing', sellerId],
      })
    })
  }

  return (
    <>
      {/* profile header */}
      <div className="h-[170px] md:h-[312px] overflow-hidden">
        {isLoading ? (
          <div className="skeleton w-full h-full" />
        ) : seller?.coverImg ? (
          <img
            src={seller.coverImg}
            alt="Seller Cover Picture"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="cover-bg" />
        )}
      </div>

      {/* Profile overview */}
      <div className="flex flex-col md:flex-row justify-between contEl md:items-center relative -translate-y-6 md:-translate-y-12">
        <div className="flex gap-3 items-end md:items-center">
          <div className="w-[100px] md:w-[200px] aspect-square border-[5px] border-white bg-light-grey-clr rounded-full overflow-hidden">
            {isLoading ? (
              <div className="skeleton w-full h-full" />
            ) : seller?.avatar ? (
              <img
                src={seller.avatar}
                alt="Seller Profile Image"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex justify-center items-center w-full h-full bg-dark-green-clr">
                <AvatarComp size="lg" username={seller?.name} />
              </div>
            )}
          </div>
          <span>
            {isLoading ? (
              <div className="w-40 h-4 skeleton rounded-md" />
            ) : (
              <h3 className="text-lg md:text-2xl font-semibold">
                {seller?.name}
              </h3>
            )}
            <p className="text-xs md:text-sm text-grey-clr">{seller?.type}</p>
            <p className="text-xs md:text-sm text-grey-clr">
              Seller since - {moment(seller?.createdAt).format('YYYY')}
            </p>
            <div className="flex items-center gap-2">
              <FaStar className="text-md text-yellow-300" />
              <FaStar className="text-md text-yellow-300" />
              <FaStar className="text-md text-yellow-300" />
              <FaStar className="text-md text-yellow-300" />
              <FaStar className="text-md text-gray-300" />
            </div>
          </span>
        </div>
        <div className="flex items-center gap-2 mt-4">
          {isBuyer && (
            <button
              className={`btn btn-sm  ${
                isFollowing
                  ? 'bg-transparent text-yellow-clr  border-yellow-clr hover: hover:border-yellow-clr hover:bg-yellow-clr hover:text-white'
                  : 'bg-transparent text-dark-green-clr  border-dark-green-clr hover: hover:border-dark-green-clr hover:bg-dark-green-clr hover:text-white'
              } uppercase`}
              disabled={
                isCheckingFollowing ||
                isLoadingFollowSeller ||
                isFetchingFollowing
              }
              onClick={handleFollowSeller}
            >
              {isCheckingFollowing ||
              isLoadingFollowSeller ||
              isFetchingFollowing ? (
                <span className="loading loading-spinner" />
              ) : isFollowing ? (
                'unfollow'
              ) : (
                'follow'
              )}
            </button>
          )}
          {user ? (
            <button className="btn uppercase btn-sm btn-outline  border-red-clr text-red-clr hover:text-white hover:bg-red-clr hover:border-red-clr">
              report
            </button>
          ) : (
            ''
          )}
        </div>
      </div>

      {/* Seller review */}
      <div className="w-full bg-light-grey-clr mt-6 mb-12 py-4">
        <div className="contEl">
          <div role="tablist" className="tabs tabs-bordered">
            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab after:w-[max-content] font-semibold"
              aria-label="Seller Analytics"
              defaultChecked
            />
            <div role="tabpanel" className="tab-content">
              <div className="block items-center gap-8 justify-around py-2">
                {summary.map((item, idx) => (
                  <span className="block pt-2" key={idx}>
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="text-sm">{item.qty}</p>
                  </span>
                ))}
              </div>
            </div>

            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab  after:w-[max-content] font-semibold"
              aria-label="Reviews"
            />
            <div role="tabpanel" className="tab-content">
              <div className="block items-center gap-8 justify-around py-2">
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
        </div>
      </div>

      {/* Products */}
      <ProductsGrid
        header="Most Purchased Products"
        products={sellerProducts ? sellerProducts : []}
        isLoading={isLoadingSellerProducts}
        moreLink={`/store/${sellerId}/products/`}
      />
      <ProductsGrid
        header="Newest Products"
        isLoading={isLoadingSellerNewestProducts}
        products={farmerNewestProducts ? farmerNewestProducts : []}
        moreLink={`/store/${sellerId}/products/`}
      />
      {/* <ProductsGrid header="Most Viewed Products" /> */}
      <SimilarSellers header="View Similar Sellers" sellerId={sellerId} />
      <BeASeller />
    </>
  )
}
