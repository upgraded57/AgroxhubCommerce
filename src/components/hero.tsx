import heroImg1 from '@/assets/images/delivery-img-1.png'

export default function Hero() {
  return (
    <div className="hero w-full max-h-[400px] flex flex-col md:flex-row items-center md:items-start mb-[50px] justify-around px-[4vw] overflow-hidden">
      <span className="text-center md:text-left text-white my-[20px] md:my-[50px] md:py-0">
        <h1 className="h-300">Online Delivery</h1>
        <p className="text-xl lg:text-3xl ">You stay at home, we deliver</p>
        <div className="flex gap-2 items-center justify-center py-2 md:justify-start">
          <div className="w-11 h-1.5 rounded-full cursor-pointer bg-white/50"></div>
          <div className="w-11 h-1.5 rounded-full cursor-pointer bg-white"></div>
          <div className="w-11 h-1.5 rounded-full cursor-pointer bg-white/50"></div>
        </div>
      </span>
      <div className="w-[200px] md:w-[250px] md:mt-[50px] relative flex justify-center">
        <img src={heroImg1} alt="" className="w-full object-contain" />
      </div>
    </div>
  )
}
