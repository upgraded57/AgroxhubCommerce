import Farmer from './similar-seller'
import FarmerLoader from './farmer-loader'
import EmptyProducts from './empty-products'
import { useGetSimilarSellers } from '@/api/seller'

export default function SimilarSellers({
  header,
  sellerId,
}: {
  header: string
  sellerId: string
}) {
  const { isLoading, data: sellers, isError } = useGetSimilarSellers(sellerId)
  return (
    <div className="px-[4vw] max-w-(--breakpoint-xl) mx-auto mb-12">
      <h3 className="text-xl text-black-clr font-semibold mb-2">
        {header || 'Buy from Best Selling Sellers'}
      </h3>
      {isLoading ? (
        <FarmerLoader count={4} />
      ) : isError || !sellers ? (
        <EmptyProducts text="No similar seller found" />
      ) : (
        <div className="gridEl gap-4">
          {sellers
            .sort(() => Math.random() - 0.5)
            .slice(0, 4)
            .map((seller, idx) => (
              <Farmer seller={seller} key={idx} />
            ))}
        </div>
      )}
    </div>
  )
}
