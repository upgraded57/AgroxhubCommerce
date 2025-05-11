import noProduct from '@/assets/images/noProduct.jpeg'

export default function EmptyProducts({ text }: { text: string }) {
  return (
    <div className=" w-full flex flex-col items-center justify-center gap-6 py-10">
      <img
        src={noProduct}
        alt=""
        className="pointer-events-none max-w-[200px]"
      />
      <p className="text-sm text-center max-w-sm">{text}</p>
    </div>
  )
}
