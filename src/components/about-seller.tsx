import { FaArrowRightLong, FaStar } from 'react-icons/fa6'
import moment from 'moment'
import { Link } from '@tanstack/react-router'

export default function AboutSeller({
  seller,
  reviews,
  ratings,
}: {
  seller: Product['seller']
  reviews: Product['reviews']
  ratings: number
}) {
  return (
    <div className="bg-light-grey-clr w-full px-[4vw] mb-12">
      <div className="contEl mx-auto py-5">
        <div role="tablist" className="tabs tabs-bordered">
          <AboutSellerTab seller={seller} />
          <ReviewsTab reviews={reviews} ratings={ratings} />
        </div>

        <Link
          to="/store/$sellerId"
          params={{
            sellerId: seller.id,
          }}
          className="w-full justify-end flex items-center gap-3"
        >
          <p className="text-sm">View Seller's Store</p>
          <FaArrowRightLong className="text-dark-green-clr" />
        </Link>
      </div>
    </div>
  )
}

const AboutSellerTab = ({ seller }: { seller: Product['seller'] }) => {
  const sellerInitials =
    seller.name.split(' ')[0][0] + seller.name.split(' ')[1][0]

  return (
    <>
      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        className="tab after:w-[max-content]"
        aria-label="About the Seller"
        defaultChecked
      />
      <div role="tabpanel" className="tab-content py-10">
        <div className="flex gap-3 items-center">
          {seller.avatar ? (
            <div className="w-15 aspect-square rounded-full overflow-hidden">
              <img
                src={seller.avatar}
                alt="Seller Image"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="avatar avatar-placeholder">
              <div className="bg-dark-green-clr text-white w-15 rounded-full">
                <p>{sellerInitials}</p>
              </div>
            </div>
          )}
          <div>
            <h3 className="text-2xl font-semibold">{seller.name}</h3>
            {/* <p className="text-sm">Large quantity tomato producer</p> */}
          </div>
        </div>

        <div className="mt-5">
          <span className="block pt-2">
            <p className="text-sm font-semibold">Company Name</p>
            <p className="text-sm">{seller.name}</p>
          </span>
          <span className="block pt-2">
            <p className="text-sm font-semibold">Joined Date</p>
            <p className="text-sm">
              {moment(seller.createdAt).format('DD MMMM, YYYY')}
            </p>
          </span>
          <span className="block pt-2">
            <p className="text-sm font-semibold">Farmer Location</p>
            <p className="text-sm">{seller.address || '--- ---'}</p>
          </span>
          {/* <span className="block pt-2">
            <p className="text-sm font-semibold">Followers</p>
            <p className="text-sm">23</p>
          </span>
          <span className="block pt-2">
            <p className="text-sm font-semibold">Successful Sales</p>
            <p className="text-sm">92%</p>
          </span> */}
        </div>
      </div>
    </>
  )
}

const ReviewsTab = ({
  reviews,
  ratings,
}: {
  reviews: Product['reviews']
  ratings: number
}) => {
  const Profile = ({
    image,
    name,
    slug,
  }: {
    image?: string
    name: string
    slug: string
  }) => {
    const initials = name.split(' ')[0][0] + name.split(' ')[1][0]
    return (
      <div className="flex items-center gap-4">
        {image ? (
          <div className="avatar skeleton rounded-full">
            <div className="w-16 rounded-full overflow-hidden">
              <img src={image} className="w-full h-full object-cover" />
            </div>
          </div>
        ) : (
          <div className="avatar avatar-placeholder">
            <div className="bg-dark-green-clr w-16 rounded-full text-white">
              <span className="text-xl uppercase font-medium">{initials}</span>
            </div>
          </div>
        )}
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-xs text-slate-500">{slug}</p>
        </div>
      </div>
    )
  }

  const GetProductRatings = () => {
    if (ratings) {
      const positive = Array.from({ length: ratings }, (_, index) => index)
      const empty = Array.from({ length: 5 - ratings }, (_, index) => index)

      return { positive, empty }
    }
    return { positive: [], empty: [] }
  }

  const productRating = GetProductRatings()

  return (
    <>
      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        className="tab after:w-[max-content]"
        aria-label="Reviews and Ratings"
      />
      <div role="tabpanel" className="tab-content py-10 space-y-4">
        {reviews?.length ? (
          <>
            <Profile
              name={reviews[0].user.name || ''}
              slug={
                moment(reviews[0].createdAt).format('MMM DD, YYYY') || '---'
              }
              image={reviews[0].user.avatar}
            />
            <div className="">
              <div className="flex gap-1 items-center text-lg text-orange-400 py-2">
                {productRating.positive.map((_, idx) => (
                  <FaStar key={idx} />
                ))}
                {productRating.empty.map((_, idx) => (
                  <FaStar className="text-gray-300" key={idx} />
                ))}
              </div>
              <p className="text-sm">{reviews[0].review}</p>
            </div>
          </>
        ) : (
          <p className="text-sm pl-6">This product has no review yet!</p>
        )}
      </div>
    </>
  )
}
