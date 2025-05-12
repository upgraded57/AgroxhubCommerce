import { Link } from '@tanstack/react-router'

export default function SimilarSeller({ seller }: { seller: Seller }) {
  return (
    <Link
      to="/store/$sellerId"
      params={{
        sellerId: seller.id,
      }}
      className={`w-full rounded-md relative bg-gray-200 overflow-hidden aspect-5/6 border-[1px] ${seller.avatar ? 'border-transparent' : 'border-light-green-clr'}`}
    >
      {seller.avatar ? (
        <img
          src={seller.avatar}
          alt="Farmer Image"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="cover-bg" />
      )}
      <div className="absolute bottom-0 w-full bg-black/40 text-white text-center py-2">
        <h4 className="text-lg">{seller.name}</h4>
        <p className="text-sm">{seller.type}</p>
      </div>
    </Link>
  )
}
