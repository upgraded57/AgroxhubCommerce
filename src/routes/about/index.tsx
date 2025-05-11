import { createFileRoute } from '@tanstack/react-router'
import { HiOutlineArrowsRightLeft } from 'react-icons/hi2'
import { BsDatabaseCheck, BsTruck } from 'react-icons/bs'
import { MdCurrencyExchange } from 'react-icons/md'
import { TbMoneybag } from 'react-icons/tb'
import faqImg from '@/assets/images/faqimg.png'
import AppLayout from '@/layouts/app-layout'

export const Route = createFileRoute('/about/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AppLayout noLeanMoreLink>
      <div className="w-full h-[320px] relative overflow-hidden">
        <div className="relative w-full h-full overflow-hidden bg-[url('../../src/assets/images/aboutbg.png')] bg-[right_-100px_bottom] md:bg-right bg-cover"></div>
        <div className="absolute inset-0 w-full h-full bg-linear-to-t from-[#22955C] to-transparent md:bg-linear-to-r"></div>
        <div className="contEl w-full h-full inset-0 absolute flex justify-center md:justify-start items-end md:items-center">
          <span className="text-white text-center md:text-left pb-[60px] md:pb-0">
            <h1 className="text-5xl font-bold pb-[20px]">
              Welcome to Agroxhub
            </h1>
            <h3 className="text-2xl">Your Trusted Agricultural Marketplace</h3>
          </span>
        </div>
      </div>

      {/* About */}
      <div className="contEl my-12">
        <h3 className="h-100 mb-3">About AgroXhub</h3>
        <p className="text-sm mb-3">
          Agroxhub is your premier online marketplace solution designed
          specifically for the agricultural sector. We connect farmers and
          agribusinesses directly with buyers, providing a seamless platform to
          showcase their products and reach a wider audience.
        </p>
      </div>

      {/* Mission */}
      <div className="contEl my-12">
        <h3 className="h-100 mb-3">Mission</h3>
        <p className="text-sm mb-3">
          Our mission at Agroxhub is to revolutionize agricultural sales by
          empowering farmers and agribusinesses with innovative tools and
          resources. We are committed to simplifying the sales process,
          increasing efficiency, and driving growth for our users.
        </p>
      </div>

      {/* Vision */}
      <div className="contEl my-12">
        <h3 className="h-100 mb-3">
          Vision - Transforming Agriculture, One Transaction at a Time
        </h3>
        <p className="text-sm mb-3">
          At Agroxhub, we envision a future where every agricultural producer
          has the opportunity to thrive in a digital marketplace. We strive to
          be the catalyst for positive change in the industry, fostering
          connections and driving innovation across the agricultural ecosystem.
        </p>
      </div>

      {/* Our Story */}
      <div className="contEl my-12">
        <h3 className="h-100 mb-3">Our Story - From Seed to Harvest</h3>
        <p className="text-sm mb-3">
          Agroxhub started with a simple idea - to bridge the gap between
          farmers and buyers, creating a platform that values transparency and
          simplicity. Born out of a passion for agriculture, our journey is
          about empowering farmers and providing buyers with easy access to
          quality produce.
        </p>
      </div>

      {/* Why choose Agroxhub */}
      <div className="contEl my-12">
        <h3 className="h-100 mb-3">Why Choose Agroxhub?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          <div className="flex flex-row md:flex-col gap-4 items-center justify-center w-full">
            <div className="w-[70px] md:w-[120px] aspect-square bg-linear-to-t from-dark-green-clr to-light-green-clr rounded-full flex items-center justify-center">
              <HiOutlineArrowsRightLeft className="text-white text-3xl md:text-6xl" />
            </div>
            <span className="text-left md:text-center">
              <p className="uppercase text-sm font-semibold">ONE-STOP SHOP</p>
              <p className="text-sm">
                Effortlessly explore a central hub for top-quality agricultural
                products.
              </p>
            </span>
          </div>

          <div className="flex flex-row-reverse md:flex-col gap-4 items-center justify-center w-full">
            <div className="w-[70px] md:w-[120px] aspect-square bg-linear-to-t from-dark-green-clr to-light-green-clr rounded-full flex items-center justify-center">
              <BsDatabaseCheck className="text-white text-3xl md:text-6xl" />
            </div>
            <span className="text-left md:text-center">
              <p className="uppercase text-sm font-semibold">
                SMOOTH PURCHASES
              </p>
              <p className="text-sm">
                Enjoy hassle-free buying with our user-friendly interface.
              </p>
            </span>
          </div>

          <div className="flex flex-row md:flex-col gap-4 items-center justify-center w-full">
            <div className="w-[70px] md:w-[120px] aspect-square bg-linear-to-t from-dark-green-clr to-light-green-clr rounded-full flex items-center justify-center">
              <MdCurrencyExchange className="text-white text-3xl md:text-6xl" />
            </div>
            <span className="text-left md:text-center">
              <p className="uppercase text-sm font-semibold">
                DIVERSE SELECTION
              </p>
              <p className="text-sm">
                Choose from a wide array of fresh produce and artisanal goods.
              </p>
            </span>
          </div>

          <div className="flex flex-row-reverse md:flex-col gap-4 items-center justify-center w-full">
            <div className="w-[70px] md:w-[120px] aspect-square bg-linear-to-t from-dark-green-clr to-light-green-clr rounded-full flex items-center justify-center">
              <TbMoneybag className="text-white text-3xl md:text-6xl" />
            </div>
            <span className="text-left md:text-center">
              <p className="uppercase text-sm font-semibold">
                AFFORDABLE TRANSACTIONS
              </p>
              <p className="text-sm">
                Save with cost-effective price and even earn cashback per
                purchase.
              </p>
            </span>
          </div>

          <div className="flex flex-row md:flex-col gap-4 items-center justify-center w-full">
            <div className="w-[70px] md:w-[120px] aspect-square bg-linear-to-t from-dark-green-clr to-light-green-clr rounded-full flex items-center justify-center">
              <BsTruck className="text-white text-3xl md:text-6xl" />
            </div>
            <span className="text-left md:text-center">
              <p className="uppercase text-sm font-semibold">FAST DELIVERY</p>
              <p className="text-sm">
                Get your product to your door step with our reliable delivery
                service
              </p>
            </span>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="contEl my-12">
        <h3 className="h-100 mb-6">How it Works</h3>

        <div className="max-w-(--breakpoint-md) mx-auto">
          <div className="flex flex-row-reverse justify-between items-center my-12 gap-5">
            <div className="rounded-lg w-[170px] md:w-[280px] aspect-square overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1556745753-b2904692b3cd?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Image"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h3 className="text-lg md:text-2xl font-semibold uppercase mb-2 md:mb-6">
                sign up
              </h3>
              <p className="text-sm max-w-[350px]">
                Create your account in minutes. Join a community of farmers and
                buyers who value simplicity
              </p>
            </div>
          </div>

          <div className="flex  justify-between items-center my-12 gap-5">
            <div className="rounded-lg w-[170px] md:w-[280px] aspect-square overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1677751177812-eef0b47b888d?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Image"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h3 className="text-lg md:text-2xl font-semibold uppercase mb-2 md:mb-6">
                BROWSE YOUR DESIRED PRODUCT
              </h3>
              <p className="text-sm max-w-[350px]">
                We have a huge gallery of products. Simply browse through and
                order your desired products.
              </p>
            </div>
          </div>

          <div className="flex flex-row-reverse justify-between items-center my-12 gap-5">
            <div className="rounded-lg w-[170px] md:w-[280px] aspect-square overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1577153651485-d6f478de99d2?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Image"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h3 className="text-lg md:text-2xl font-semibold uppercase mb-2 md:mb-6">
                CONNECT WITH BUYERS
              </h3>
              <p className="text-sm max-w-[350px]">
                Engage with a network of buyers ready to explore and purchase
                your offerings
              </p>
            </div>
          </div>

          <div className="flex  justify-between items-center my-12 gap-5">
            <div className="rounded-lg w-[170px] md:w-[280px] aspect-square overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1598063414123-d8fd7fb018b2?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Image"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h3 className="text-lg md:text-2xl font-semibold uppercase mb-2 md:mb-6">
                TRANSACTION SIMPLICITY
              </h3>
              <p className="text-sm max-w-[350px]">
                Experience a straightforward transaction, ensuring a hassle-free
                process for both parties
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* join agroxhub */}
      <div className="contEl my-[100px]">
        <div className="flex justify-between items-center gap-4">
          <div className="md:basis-3/5">
            <h1 className="text-[36px] lg:text-[50px] font-medium text-orange-clr">
              Join Agroxhub Today: Grow your Agricultural Experience
            </h1>
            <div className="md:hidden max-h-[200px] overflow-hidden rounded-md border-[3px] mt-3 border-orange-clr">
              <img
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Image"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm mt-3">
              Whether you are a farmer looking to expand your reach or a buyer
              wanting the freshest products, Agroxhub is the platform for you.
              Join us today, and let's grow together
            </p>
            <div className="flex items-center gap-4 mt-6">
              <p className="text-sm">Ready to get started?</p>
              <button type="button" className="btn green-gradient">
                SIGN UP NOW!
              </button>
            </div>
          </div>

          <div className="hidden md:block basis-2/5">
            <div className="max-w-[430px] max-h-[470px] overflow-hidden rounded-md border-[3px] border-orange-clr">
              <img
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Programs */}
      <div className="mb-12 bg-light-grey-clr py-12 ">
        <div className="contEl flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="basis-1/2 flex flex-col gap-3 items-center justify-center">
            <h3 className="text-lg md:text-2xl uppercase font-bold">
              AFFILIATE PROGRAM
            </h3>
            <div className="w-full max-h-[200px] rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Affilate Image"
                className="w-full h-full object-cover "
              />
            </div>
            <h3 className="text-lg md:text-2xl uppercase font-bold">
              GROW WITH US, EARN WITH US
            </h3>
            <p className="text-sm text-center">
              Join our affiliate program and become a Agroxhub advocate! Share
              the benefits of our platform, and earn commissions for every
              farmer or buyer who joins through your referral. Let's grow
              together!
            </p>
            <button type="button" className="btn green-gradient uppercase">
              get started
            </button>
          </div>

          <div className="basis-1/2 flex flex-col gap-3 items-center justify-center">
            <h3 className="text-lg md:text-2xl uppercase font-bold">
              PARTNERSHIP
            </h3>
            <div className="w-full max-h-[200px] rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1521790797524-b2497295b8a0?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Affilate Image"
                className="w-full h-full object-cover "
              />
            </div>
            <h3 className="text-lg md:text-2xl uppercase font-bold">
              CULTIVATING SUCCESS TOGETHER
            </h3>
            <p className="text-sm text-center">
              We welcome partnerships with organizations that share our vision.
              Whether you are a farm-related business, tech provider, or
              community organization, let’s collaborate to cultivate success in
              agriculture.
            </p>
            <button type="button" className="btn green-gradient uppercase">
              get started
            </button>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="my-12 contEl md:px-12 md:flex justify-around items-center gap-12">
        <div className="basis-1/2">
          <img
            src={faqImg}
            alt="Frequently asked questions"
            className="hidden md:block mx-auto"
          />
        </div>

        <div className="">
          <h2 className="text-[18px] md:text-2xl uppercase font-semibold mb-6 text-dark-green-clr">
            your questions, answered
          </h2>

          {/* Accordion */}
          <div className="collapse ">
            <input
              type="radio"
              name="faq"
              className="min-h-[2rem]"
              defaultChecked
            />
            <div className="collapse-title border-b py-0 px-1 min-h-0">
              <p className="text-sm font-semibold">What is Agroxhub</p>
            </div>
            <div className="collapse-content py-0 pt-2 px-2">
              <p className="text-sm">
                Signing up as a buyer is quick and easy! Visit our website,
                click on "Sign Up," and follow the simple registration process.
              </p>
            </div>
          </div>

          <div className="collapse ">
            <input type="radio" name="faq" className="min-h-[2rem]" />
            <div className="collapse-title border-b py-0 px-1 min-h-0">
              <p className="text-sm font-semibold">
                How do I Sign Up as a Buyer?
              </p>
            </div>
            <div className="collapse-content py-0 pt-2 px-2">
              <p className="text-sm">
                Signing up as a buyer is quick and easy! Visit our website,
                click on "Sign Up," and follow the simple registration process.
              </p>
            </div>
          </div>

          <div className="collapse ">
            <input type="radio" name="faq" className="min-h-[2rem]" />
            <div className="collapse-title border-b py-0 px-1 min-h-0">
              <p className="text-sm font-semibold">Are Transactions Secure?</p>
            </div>
            <div className="collapse-content py-0 pt-2 px-2">
              <p className="text-sm">
                Signing up as a buyer is quick and easy! Visit our website,
                click on "Sign Up," and follow the simple registration process.
              </p>
            </div>
          </div>

          <div className="collapse ">
            <input type="radio" name="faq" className="min-h-[2rem]" />
            <div className="collapse-title border-b py-0 px-1 min-h-0">
              <p className="text-sm font-semibold">
                How can I place an order on AgroXHub?
              </p>
            </div>
            <div className="collapse-content py-0 pt-2 px-2">
              <p className="text-sm">
                Signing up as a buyer is quick and easy! Visit our website,
                click on "Sign Up," and follow the simple registration process.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="my-12 bg-dark-orange-clr py-10">
        <div className="contEl  flex flex-col md:flex-row items-center justify-center md:justify-between gap-10">
          <div className="w-full md:basis-1/2 text-left text-white">
            <h3 className="h-300">
              Contact Us. <br />
              Let's Connect
            </h3>
            <p className="text-sm md:text-lg">
              Have questions or suggestions? We're here for you! <br /> &nbsp;{' '}
              <br /> Join Agroxhub today and experience a new era in
              agricultural transactions. Let's cultivate prosperity together!
            </p>
          </div>

          <form className="w-full md:basis-1/2 flex flex-col gap-4 items-start">
            <label htmlFor="name" className="w-full">
              <p className="text-sm uppercase text-white">email</p>
              <input type="text" id="name" className="input w-full" />
            </label>
            <label htmlFor="phone" className="w-full">
              <p className="text-sm uppercase text-white">phone number</p>
              <input type="text" id="phone" className="input w-full" />
            </label>
            <label htmlFor="address" className="w-full">
              <p className="text-sm uppercase text-white">
                address (your physical address)
              </p>
              <input type="text" id="address" className="input w-full" />
            </label>
            <button
              type="submit"
              className="btn green-gradient uppercase w-max"
            >
              contact us
            </button>
          </form>
        </div>
      </div>
    </AppLayout>
  )
}
