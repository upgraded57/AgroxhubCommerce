import { useEffect, useState } from 'react'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useGetProductCategories } from '../api/product'
import { useGetRegions } from '../api/region'
import { useDebounce } from '@/utils/use-debounce'

export default function ProductsFilter({
  sellerPage,
}: {
  sellerPage?: boolean
}) {
  const params = useSearch({
    from: sellerPage ? '/seller/$sellerId/products/' : '/products/',
  })

  const navigate = useNavigate()

  const { isLoading: isLoadingCategories, data: categories } =
    useGetProductCategories()

  const { isLoading: isLoadingRegions, data: regions } = useGetRegions()

  const [filters, setFilters] = useState(params)

  const debouncedFilters = useDebounce(filters, 500)

  // Trigger navigation when debouncedFilters change
  useEffect(() => {
    navigate({
      to: sellerPage ? '/seller/$sellerId/products' : '/products',
      search: debouncedFilters,
      replace: true,
    })
  }, [debouncedFilters])

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target

    setFilters((prev) => ({
      ...prev,
      [name]: value || undefined,
      currentPage: undefined,
    }))
  }

  const handleClearFilters = () => {
    navigate({
      to: sellerPage ? '/seller/$sellerId/products' : '/products',
      search: {
        category: undefined,
        region: undefined,
        currentPage: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        rating: undefined,
        seller: undefined,
      },
    })
  }

  const handleRatingChange = (r: number) => {
    navigate({
      to: sellerPage ? '/seller/$sellerId/products' : '/products',
      search: {
        ...params,
        rating: String(r),
      },
    })
  }

  return (
    <div className="block products-filter py-4 lg:py-0">
      {/* Price */}
      <div className="rounded bg-light-grey-clr p-4">
        <h3 className="text-lg font-semibold">PRICE</h3>
        <div className="flex items-center gap-4 mt-4">
          <label htmlFor="minPrice">
            <p className="text-xs">MIN</p>
            <input
              type="text"
              className="input scale-100 opacity-100 w-full h-[30px] px-2"
              name="minPrice"
              id="minPrice"
              value={filters.minPrice || ''}
              onChange={handleFilterChange}
            />
          </label>
          <label htmlFor="maxPrice">
            <p className="text-xs">MAX</p>
            <input
              type="text"
              className="input w-full h-[30px] px-2"
              name="maxPrice"
              id="maxPrice"
              value={filters.maxPrice || ''}
              onChange={handleFilterChange}
            />
          </label>
        </div>
      </div>

      {/* Location */}
      {!sellerPage && (
        <div className="rounded bg-light-grey-clr p-4 mt-4">
          <h3 className="text-lg font-semibold">LOCATION</h3>
          <div className="w-full overflow-x-hidden mt-2 p-1">
            <select
              name="region"
              onChange={handleFilterChange}
              id="region"
              className="select min-w-full"
              defaultValue=""
              disabled={isLoadingRegions}
            >
              <option value="">All Locations</option>
              {regions?.map((item, idx) => (
                <option value={item.name} key={idx}>
                  {`${item.lcda} - ${item.name}`}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Category */}
      <div className="rounded bg-light-grey-clr p-4 mt-4">
        <h3 className="text-lg font-semibold">CATEGORY</h3>
        <div className="mt-2">
          <select
            name="category"
            onChange={handleFilterChange}
            id="category"
            className="select min-w-full"
            defaultValue={filters.category || ''}
            disabled={isLoadingCategories}
          >
            <option value="">All Categories</option>
            {categories?.map((item, idx) => (
              <option value={item.slug} key={idx}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Seller */}
      {!sellerPage && (
        <div className="rounded bg-light-grey-clr p-4 mt-4">
          <h3 className="text-lg font-semibold">SELLER</h3>
          <div className="mt-2">
            <select
              name="seller"
              onChange={handleFilterChange}
              id="seller"
              className="select min-w-full"
              defaultValue={params.seller || ''}
            >
              <option value="">All Sellers</option>
              <option value="farmer">Farmer</option>
              <option value="wholesaler">Wholesaler</option>
            </select>
          </div>
        </div>
      )}

      {/* Rating */}
      <div className="rounded bg-light-grey-clr p-4 mt-4">
        <h3 className="text-lg font-semibold">RATING</h3>
        <div className="mt-2">
          <div className="rating gap-1">
            {[1, 2, 3, 4, 5].map((r, idx) => (
              <input
                key={idx}
                type="radio"
                name="rating-1"
                className="mask mask-star-2 bg-orange-400"
                value={r}
                defaultValue={params.rating}
                onChange={() => handleRatingChange(r)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Date Posted */}
      <div className="rounded bg-light-grey-clr p-4 mt-4">
        <h3 className="text-lg font-semibold">DATE POSTED</h3>
        <div className="mt-2">
          <label className="label cursor-pointer flex justify-start items-center gap-4">
            <input
              type="checkbox"
              defaultChecked
              className="checkbox scale-75"
            />
            <small className="label-text">Last Week</small>
          </label>
          <label className="label cursor-pointer flex justify-start items-center gap-4">
            <input type="checkbox" className="checkbox scale-75" />
            <small className="label-text">Last Month</small>
          </label>
          <label className="label cursor-pointer flex justify-start items-center gap-4">
            <input type="checkbox" className="checkbox scale-75" />
            <small className="label-text">Last Three Months</small>
          </label>
          <label className="label cursor-pointer flex justify-start items-center gap-4">
            <input type="checkbox" className="checkbox scale-75" />
            <small className="label-text">Last Six Months</small>
          </label>
          <label className="label cursor-pointer flex justify-start items-center gap-4">
            <input type="checkbox" className="checkbox scale-75" />
            <small className="label-text">Last Year</small>
          </label>
        </div>
      </div>

      {/* Clear all filters button */}
      <button
        className="btn btn-sm btn-outline border-orange-clr mt-4 text-orange-clr hover:bg-orange-clr hover:text-white hover:border-orange-clr"
        onClick={handleClearFilters}
      >
        Clear all filters
      </button>
    </div>
  )
}
