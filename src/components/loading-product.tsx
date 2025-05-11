export default function LoadingProduct() {
  return (
    <div className="contEl mb-12">
      <div className="flex gap-4 flex-col md:flex-row">
        <div className="flex flex-col gap-2 w-full basis-1/2">
          <div className="w-full aspect-3/2 rounded-lg  skeleton" />
          <div className="grid grid-cols-4 gap-2">
            <div className="skeleton w-full h-[100px] rounded-lg" />
            <div className="skeleton w-full h-[100px] rounded-lg" />
            <div className="skeleton w-full h-[100px] rounded-lg" />
            <div className="skeleton w-full h-[100px] rounded-lg" />
          </div>
        </div>

        <div className="w-full basis-1/2">
          <div className="w-full h-[40px] rounded skeleton bg-light-grey-clr" />
          <hr className="my-3" />
          <div className="flex flex-col items-start gap-2">
            <div className="w-1/2 h-[40px] rounded skeleton bg-light-grey-clr" />
            <div className="w-2/3 h-[30px] rounded skeleton bg-light-grey-clr" />
          </div>
          <hr className="my-3" />
          <div className="w-full h-[30px] rounded skeleton bg-light-grey-clr" />
          <hr className="my-3" />
        </div>
      </div>
    </div>
  )
}
