export default function ProductsLoader({
  count,
  type,
}: {
  count: number
  type?: 'list' | 'grid'
}) {
  const array = Array.from({ length: count }, (_, index) => index)

  return type === 'list' ? (
    <div className="w-full">
      {array.map((_, idx) => (
        <div
          className="w-full p-4 flex items-center justify-between border-b"
          key={idx}
        >
          <div className="flex items-center gap-3">
            <div className="skeleton h-[128px] w-[128px] rounded-lg"></div>
            <div className="flex flex-col gap-2">
              <div className="w-[160px] h-6 rounded-md skeleton"></div>
              <div className="w-[140px] h-4 rounded-md skeleton"></div>
              <div className="flex gap-2">
                <div className="w-[80px] h-8 rounded-md skeleton"></div>
                <div className="w-[80px] h-8 rounded-md skeleton"></div>
              </div>
            </div>
          </div>

          <div className="w-[120px] h-12 rounded-lg skeleton"></div>
        </div>
      ))}
    </div>
  ) : (
    <div className="gridEl w-full">
      {array.map((_, idx) => (
        <div className="w-full mb-6 p-4" key={idx}>
          <div className="skeleton h-[128px] w-full rounded-lg"></div>
          <div className="skeleton h-6 rounded-md w-[80%] mt-3"></div>
          <div className="skeleton h-4 rounded-md w-[60%] mt-1"></div>
        </div>
      ))}
    </div>
  )
}
