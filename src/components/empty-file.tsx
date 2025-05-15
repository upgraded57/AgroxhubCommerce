import Lottie from 'lottie-react'
import AnimationNoFile from '@/assets/json/AnimationNoFile.json'

export default function EmptyFile({ text }: { text: string }) {
  return (
    <div className="w-full flex flex-col items-center justify-center py-10">
      <div className="w-[200px] h-[200px]">
        <Lottie animationData={AnimationNoFile} width={200} height={200} />
      </div>
      <p className="text-sm text-center max-w-sm">{text}</p>
    </div>
  )
}
