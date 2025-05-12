import Lottie from 'lottie-react'
import AnimationNoProduct from '@/assets/json/AnimationNoProduct.json'

export default function EntityNotFound({
  text,
  title,
}: {
  text: string
  title: string
}) {
  return (
    <div className="px-[4vw] lg:px-0">
      <div className="w-full max-w-lg mx-auto p-10 pt-0 rounded-lg border-[1px] border-light-grey-clr mb-10 overflow-x-hidden">
        <div className="w-[250px] h-[250px] relative -left-12 mb-6">
          <Lottie
            animationData={AnimationNoProduct}
            width={250}
            height={250}
            loop={false}
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-lg font-semibold">{title}</h1>
          <p className="text-sm">{text}</p>
        </div>
      </div>
    </div>
  )
}
