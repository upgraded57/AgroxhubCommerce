import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'
import { LuClipboardList, LuListCheck } from 'react-icons/lu'
import { useGetSellerOrderSummary, useGetSellerOrders } from '@/api/seller'
import OrdersTable from '@/components/orders-table'
import Loader from '@/components/loader'

type OrderPageSearch = {
  status?:
    | 'all'
    | 'delivered'
    | 'in_transit'
    | 'pending'
    | 'returned'
    | undefined
  page?: string
}

export const Route = createFileRoute('/seller/orders/')({
  component: RouteComponent,
  validateSearch: (search: OrderPageSearch) => {
    return {
      status: search.status,
      page: search.page,
    }
  },
})

const summaryBoxStyle =
  'carousel-item min-w-max w-1/4 p-4 flex items-center gap-4 border rounded-lg'

function RouteComponent() {
  const navigate = useNavigate()
  const params = useSearch({
    from: '/seller/orders/',
  })
  const { isLoading, data } = useGetSellerOrders({
    status: params.status,
    page: params.page,
  })

  const orders = data?.orders
  const totalPages = data ? data.pages : 1
  const currentPage = data ? data.page : 1
  const canNext = data ? totalPages > Number(currentPage) : false

  const { isLoading: isLoadingSummary, data: summary } =
    useGetSellerOrderSummary()

  const ordersSummary = [
    {
      title: 'Total Orders',
      icon: <LuClipboardList className="text-2xl text-blue-500" />,
      bg: 'bg-blue-100',
      count: summary?.orders || 0,
    },
    {
      title: 'Total Products',
      icon: <LuClipboardList className="text-2xl text-amber-500" />,
      bg: 'bg-amber-100',
      count: summary?.products || 0,
    },
    {
      title: 'Total Delivered',
      icon: <LuListCheck className="text-2xl text-green-500" />,
      bg: 'bg-green-100',
      count: summary?.delivered || 0,
    },
    {
      title: 'Total Rejected',
      icon: <LuClipboardList className="text-2xl text-blue-500" />,
      bg: 'bg-blue-100',
      count: summary?.rejected || 0,
    },
  ]

  const handlePageChange = (type: 'prev' | 'next') => {
    const page = params.page ? Number(params.page) : 1
    if (type === 'prev' && page === 1) return
    navigate({
      to: '/seller/orders',
      search: {
        status: params.status || undefined,
        page: type === 'prev' ? String(page - 1) : String(page + 1),
      },
    })
  }

  return (
    <>
      <div className="hidden md:flex items-center justify-between border-b py-2 md:pt-0">
        <h2 className="font-semibold text-sm md:text-2xl">ORDER HISTORY</h2>
      </div>

      <div className="flex gap-2 items-center">
        <StatusFilters status={params.status} page={params.page} />
        <DateFilters />
      </div>

      <div className="mb-6 carousel justify-between gap-x-4 w-full">
        {ordersSummary.map((item, idx) => (
          <div className={summaryBoxStyle} key={idx}>
            <span
              className={`${item.bg} w-10 h-10 aspect-square rounded-full grid place-content-center`}
            >
              {item.icon}
            </span>
            <div className="space-y-1">
              <p className="text-sm text-slate-500">{item.title}</p>
              {isLoadingSummary ? (
                <span className="loading loading-spinner text-dark-green-clr loading-lg" />
              ) : (
                <h2 className="text-2xl font-medium">{item.count}</h2>
              )}
            </div>
          </div>
        ))}
      </div>
      {isLoading ? (
        <div className="w-full h-[300px] grid place-content-center">
          <Loader />
        </div>
      ) : (
        orders && (
          <div className="border rounded-lg overflow-hidden">
            <OrdersTable orders={orders} />
            {/* Pagination */}
            {orders.length > 10 && (
              <div className="flex justify-center py-4">
                <div className="join">
                  <button
                    className="join-item btn"
                    onClick={() => handlePageChange('prev')}
                    disabled={Number(currentPage) === 1}
                  >
                    «
                  </button>
                  <button className="join-item btn">
                    Page {currentPage} of {totalPages}
                  </button>
                  <button
                    className="join-item btn"
                    onClick={() => handlePageChange('next')}
                    disabled={!canNext}
                  >
                    »
                  </button>
                </div>
              </div>
            )}
          </div>
        )
      )}
    </>
  )
}

const DateFilters = ({ lg }: { lg?: boolean }) => {
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

const StatusFilters = ({
  status,
  page,
}: {
  status: OrderPageSearch['status']
  page?: string
}) => {
  const navigate = useNavigate()
  return (
    <div className="flex items-center space-x-4 my-4">
      <p className="text-sm">Filter by:</p>
      <select
        defaultValue={status || 'Pick a Status'}
        className="select select-sm w-max uppercase"
        onChange={(e) => {
          navigate({
            to: '/seller/orders',
            search: {
              status: e.target.value.length
                ? (e.target.value as OrderPageSearch['status'])
                : undefined,
              page: page || undefined,
            },
          })
        }}
      >
        <option value="">All Status</option>
        <option value="delivered">Delivered</option>
        <option value="in_transit">In Transit</option>
        <option value="pending">Pending</option>
        <option value="rejected">Rejected</option>
        <option value="canceled">Canceled</option>
      </select>
    </div>
  )
}
