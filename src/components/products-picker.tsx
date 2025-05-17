import { BiSolidHot } from 'react-icons/bi'
import { Link } from '@tanstack/react-router'
import { useGetProductCategories } from '@/api/product'

export default function ProductsPicker() {
  const roundedBtnStyle = 'btn btn-circle btn-sm p-1 bg-yellow-clr'
  const { isLoading, data: categories = [] } = useGetProductCategories()

  return (
    <div className="contEl mb-12">
      <div className="carousel gap-4 w-full">
        {isLoading
          ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((_, idx) => (
              <div
                key={idx}
                className="carousel-item carousel-start btn font-normal skeleton bg-gray-100 hover:bg-gray-200"
              >
                <div className="w-14 h-3 rounded-md bg-white"></div>
                <BiSolidHot className="btn btn-circle btn-sm p-1 bg-white text-gray-200" />
              </div>
            ))
          : categories.map((category, idx) => (
              <Link
                to="/products"
                search={{
                  category: category.slug,
                  region: undefined,
                  currentPage: undefined,
                  minPrice: undefined,
                  maxPrice: undefined,
                  rating: undefined,
                  seller: undefined,
                }}
                className="carousel-item carousel-start btn font-normal"
                key={idx}
              >
                {category.name}
                <BiSolidHot className={roundedBtnStyle} />
              </Link>
            ))}
      </div>
    </div>
  )
}
