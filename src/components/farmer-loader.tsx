export default function FarmerLoader({ count }: { count: number }) {
  const array = Array.from({ length: count }, (_, index) => index)

  return (
    <div className="gridEl w-full">
      {array.map((_, idx) => (
        <div className="w-full mb-6 p-4" key={idx}>
          <div className="skeleton w-full aspect-5/6 rounded-lg relative flex items-center justify-center">
            <div className="w-[90%] h-5 rounded-md bg-white absolute bottom-10"></div>
            <div className="w-[70%] h-3 rounded-md bg-white absolute bottom-4"></div>
          </div>
        </div>
      ))}
    </div>
  )
}
