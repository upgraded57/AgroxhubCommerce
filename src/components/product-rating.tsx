import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa'

export default function ProductRatings({ ratings }: { ratings: string }) {
  const fullStars = Math.floor(parseFloat(ratings)) // whole number part
  const hasHalf = parseFloat(ratings) % 1 >= 0.5 // check for .5 or higher
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0)

  const rating = {
    full: Array.from({ length: fullStars }, (_, i) => i),
    half: hasHalf,
    empty: Array.from({ length: emptyStars }, (_, i) => i),
  }

  return (
    <div className="flex gap-1 items-center text-lg text-yellow-500 py-2">
      {rating.full.map((_, idx) => (
        <FaStar key={`full-${idx}`} className="text-base" />
      ))}

      {rating.half && <FaStarHalfAlt key="half" className="text-base" />}

      {rating.empty.map((_, idx) => (
        <FaRegStar key={`empty-${idx}`} className="text-base" />
      ))}
    </div>
  )
}
