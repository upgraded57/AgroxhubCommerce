import EmptyProducts from './empty-products'
import FarmerLoader from './farmer-loader'
import SellerCard from './seller-card'
import { useGetSellers } from '@/api/seller'

export default function Sellers({ header }: { header: string }) {
  const { isLoading, data: sellers, isError } = useGetSellers()
  return (
    <div className="px-[4vw] max-w-(--breakpoint-xl) mx-auto mb-12">
      <h3 className="text-xl text-black-clr font-semibold mb-2">
        {header || 'Buy from Best Selling Farmers'}
      </h3>
      {isLoading ? (
        <FarmerLoader count={4} />
      ) : isError || !sellers?.length ? (
        <div className="flex items-center justify-center w-full">
          <EmptyProducts text="We could not find any seller." />
        </div>
      ) : (
        <div className="gridEl gap-4">
          {sellers
            .sort(() => Math.random() - 0.5)
            .slice(0, 4)
            .map((seller, idx) => (
              <SellerCard seller={seller} key={idx} />
            ))}
        </div>
      )}
    </div>
  )
}
