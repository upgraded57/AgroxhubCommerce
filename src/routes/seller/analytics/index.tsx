import { Link, createFileRoute } from '@tanstack/react-router'
import { ImSpinner8 } from 'react-icons/im'
import { HiOutlineViewGridAdd } from 'react-icons/hi'
import { useGetSellerSummary } from '@/api/seller'
import SellerAnalyticsChart from '@/components/charts/seller-analytics-chart'
import { currency } from '@/utils/helpers'

export const Route = createFileRoute('/seller/analytics/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { isLoading, data: summary } = useGetSellerSummary()

  const carouselItemStyle =
    'rounded-lg shadow border p-4 flex w-full items-center gap-4 hover:shadow-lg transition'

  const overviewData = [
    {
      title: 'Total Products',
      count: summary ? summary.products : 0,
    },
    {
      title: 'Products Sold',
      count: summary ? summary.deliveredProducts : 0,
    },
    {
      title: 'Total Earnings',
      count:
        summary && summary.withdrawableEarnings
          ? currency(summary.withdrawableEarnings)
          : 0,
    },
    {
      title: 'Withdrawable Earnings',
      count:
        summary && summary.totalEarnings ? currency(summary.totalEarnings) : 0,
    },
    {
      title: 'Followers',
      count: summary ? summary.followers : 0,
    },
  ]
  return (
    <>
      <div className="hidden md:flex items-center justify-between border-b py-2 md:pt-0">
        <h2 className="font-semibold text-sm md:text-2xl">ANALYTICS</h2>
        <Filter />
      </div>

      <div className="block mt-5 mb-8">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-semibold uppercase">overview</p>
          <Filter lg />
        </div>
        <div className="carousel w-full p-1 rounded-lg shadow border-[1px] border-light-grey-clr">
          {overviewData.map((item, idx) => (
            <div
              className="carousel-item w-[180px] p-4 block border-r-[1px] border-r-light-grey-clr last-of-type:border-0"
              key={idx}
            >
              <p className="text-sm font-light">{item.title}</p>
              {isLoading ? (
                <span className="mt-4 block">
                  <ImSpinner8 className="animate-spin text-2xl text-grey-clr" />
                </span>
              ) : (
                <h1 className="text-3xl font-semibold mt-4 text-dark-green-clr">
                  {item.count}
                </h1>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <p className="text-sm font-semibold uppercase">Quick Actions</p>
        <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-2 mt-2">
          <Link to="/seller/products/create" className={carouselItemStyle}>
            <span className="w-10 h-10 rounded-full grid place-content-center bg-green-100">
              <HiOutlineViewGridAdd className="text-2xl text-green-500" />
            </span>
            <p className="text-sm">Add New Product</p>
          </Link>
          <Link
            to="/seller/orders"
            className={carouselItemStyle}
            search={{
              page: undefined,
              status: undefined,
            }}
          >
            <span className="w-10 h-10 rounded-full grid place-content-center bg-blue-100">
              <HiOutlineViewGridAdd className="text-2xl text-blue-500" />
            </span>
            <p className="text-sm">View Orders</p>
          </Link>
          <Link to="/seller/finance" className={carouselItemStyle}>
            <span className="w-10 h-10 rounded-full grid place-content-center bg-yellow-100">
              <HiOutlineViewGridAdd className="text-2xl text-yellow-500" />
            </span>
            <p className="text-sm">View Finance</p>
          </Link>
        </div>
      </div>

      <div className="block mt-12 py-3 border-t">
        <p className="text-sm font-semibold uppercase mb-5">products</p>
        <div className="w-full h-[400px]">
          <SellerAnalyticsChart summary={summary} />
        </div>
      </div>
    </>
  )
}

const Filter = ({ lg }: { lg?: boolean }) => {
  return (
    <select
      className={`select select-sm uppercase font-normal ${lg && 'md:hidden'}`}
    >
      <option>This Month</option>
      <option>Last Month</option>
      <option>April</option>
      <option>March</option>
      <option>This Year</option>
    </select>
  )
}
