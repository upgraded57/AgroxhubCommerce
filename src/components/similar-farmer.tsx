import { Link } from '@tanstack/react-router'
import noAvatar from '@/assets/images/noAvatar.jpeg'

export default function SimilarFarmer({ seller }: { seller: Seller }) {
  return (
    <Link
      to="/seller/$sellerId"
      params={{
        sellerId: seller.id,
      }}
      className="w-full rounded-md relative overflow-hidden aspect-5/6"
    >
      <img
        src={seller.avatar || noAvatar}
        alt="Farmer Image"
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 w-full bg-black/40 text-white text-center py-2">
        <h4 className="text-lg">{seller.name}</h4>
        <p className="text-sm">{seller.type}</p>
      </div>
    </Link>
  )
}
