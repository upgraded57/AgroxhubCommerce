import { createFileRoute } from '@tanstack/react-router'
import { ImSpinner8 } from 'react-icons/im'
import { useGetSellerSummary } from '@/api/seller'
import SellerAnalyticsChart from '@/components/charts/seller-analytics-chart'

export const Route = createFileRoute('/seller/analytics/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { isLoading, data: summary } = useGetSellerSummary()

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
      count: summary ? summary.totalEarnings : 0,
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

      <div className="block mt-5">
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
