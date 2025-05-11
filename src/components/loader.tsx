export default function Loader({ type }: { type?: string }) {
  if (type && type === 'full') {
    return (
      <div className="w-full h-full fixed inset-0 flex bg-white items-center justify-center">
        <span className="loading loading-spinner text-dark-green-clr loading-lg"></span>
      </div>
    )
  }
  return (
    <div className="w-full h-full min-h-[300px] flex items-center justify-center">
      <span className="loading loading-spinner text-dark-green-clr loading-lg"></span>
    </div>
  )
}
