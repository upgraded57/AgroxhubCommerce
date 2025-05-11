import { Link } from '@tanstack/react-router'
import { FaArrowRightLong } from 'react-icons/fa6'
import { HiOutlineEnvelope } from 'react-icons/hi2'
import logo from '@/assets/images/logo-white.png'

export default function Footer({
  noLeanMoreLink,
}: {
  noLeanMoreLink?: boolean
}) {
  return (
    <>
      {!noLeanMoreLink && (
        <div className="contEl my-12">
          <div className="flex justify-between items-center mb-3">
            <h3 className="h-100">About AgroXhub</h3>
            <Link to="/about" className="flex items-center gap-3">
              <p className="text-sm">Learn More About Us</p>
              <FaArrowRightLong className="text-dark-green-clr" />
            </Link>
          </div>
          <p className="text-sm mb-3">
            Agroxhub is your premier online marketplace solution designed
            specifically for the agricultural sector. We connect farmers and
            agribusinesses directly with buyers, providing a seamless platform
            to showcase their products and reach a wider audience.
          </p>

          <p className="text-sm">
            Our mission at Agroxhub is to revolutionize agricultural sales by
            empowering farmers and agribusinesses with innovative tools and
            resources. We are committed to simplifying the sales process,
            increasing efficiency, and driving growth for our users.
          </p>
        </div>
      )}

      <div className="bg-dark-green-clr flex items-center justify-center py-8">
        <img src={logo} alt="logo" className="w-[150px] md:w-[200px]" />
      </div>

      <div className="bg-white py-8 px-[4vw] flex flex-col gap-3 items-center justify-center">
        <h1 className="text-dark-green-clr text-lg md:text-2xl font-semibold">
          JOIN OUR NEWSLETTER
        </h1>
        <form className="flex w-full max-w-(--breakpoint-sm)">
          <label className="input flex items-center w-full gap-2 bg-light-grey-clr rounded-r-none">
            <HiOutlineEnvelope className="text-gray-300" />
            <input type="email" className="grow" placeholder="Email" />
          </label>
          <button
            type="submit"
            className="btn green-gradient rounded-l-none border-0"
          >
            Subscribe
          </button>
        </form>
      </div>

      <footer className="bg-dark-green-clr py-8 text-white">
        <div className="flex flex-col gap-10 md:gap-0 md:flex-row md:justify-between md:items-start contEl">
          <span className="max-w-[150px]">
            <p className="text-sm font-semibold mb-2">CONTACT US</p>
            <p className="text-sm mb-4">
              123, Sample Location, Some state, Nigeria
            </p>
            <p className="text-sm mb-4">
              123 Sample Location, Some state, Nigeria
            </p>
            <p className="text-sm">
              +2348011223344 +2349055667788 +2347088776655
            </p>
          </span>
          <span className="max-w-[150px]">
            <p className="text-sm font-semibold mb-2">QUICK LINKS</p>
            <p className="text-sm">About</p>
            <p className="text-sm">Contact</p>
            <p className="text-sm">Sitemap</p>
            <p className="text-sm">Register / Login</p>
            <p className="text-sm">Become a Member</p>
            <p className="text-sm">Affiliate Marketing</p>
          </span>
          <span className="max-w-[150px]">
            <p className="text-sm font-semibold mb-2">OUR PARTNERS</p>
            <p className="text-sm">DHL</p>
            <p className="text-sm">Jumia Pay</p>
            <p className="text-sm">Interswitch</p>
            <p className="text-sm">NGNC</p>
            <p className="text-sm">Opay</p>
          </span>
          <span className="max-w-[150px]">
            <p className="text-sm font-semibold mb-2">SOCIAL MEDIA</p>
            <p className="text-sm">Facebook</p>
            <p className="text-sm">Intagram</p>
            <p className="text-sm">Twitter</p>
            <p className="text-sm">LinkedIn</p>
            <p className="text-sm">Youtube</p>
          </span>
        </div>

        <p className="text-sm text-center mt-8">
          (C) 2024 Agroxhub. All right reserved
        </p>
      </footer>
    </>
  )
}
