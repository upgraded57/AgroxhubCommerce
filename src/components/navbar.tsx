import { IoCartOutline, IoClose } from 'react-icons/io5'
import { AiFillTwitterCircle, AiOutlineUser } from 'react-icons/ai'
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'
import { HiBars3 } from 'react-icons/hi2'
import { use, useEffect, useState } from 'react'
import { LiaDoorOpenSolid, LiaUserCircle } from 'react-icons/lia'
import { useQueryClient } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { toast } from 'sonner'
import AvatarComp from './avatar-comp'

import logo from '@/assets/images/logo1.png'

import { useGetUser } from '@/api/user'
import { CartContext } from '@/providers/CartContext'

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false)

  const cart = use(CartContext)?.cart
  const refetch = use(CartContext)?.refetch

  useEffect(() => {
    if (refetch) {
      refetch()
    }
  }, [])

  return (
    <>
      <header className="w-full px-[4vw] h-15 flex items-center shadow-md fixed bg-white z-50">
        <div className="contEl px-0 flex justify-between items-center w-full">
          <Link to="/" className="md:basis-1/4">
            <img src={logo} alt="logo" className="w-[150px]" />
          </Link>
          {/* Mobile Navigation */}
          <MobileNav navOpen={navOpen} setNavOpen={setNavOpen} />

          {/* Desktop Navigation */}
          <div className="sidenav flex gap-6 items-center basis-1/4 justify-end text-sm ">
            <Link
              to="/cart"
              className="flex items-center gap-2 mx-0 py-0 hover:bg-transparent font-normal "
            >
              <p className="hidden md:block">Cart</p>
              <div className="relative">
                <IoCartOutline className="text-xl" />
                {cart && cart.length > 0 && (
                  <div className="w-3 h-3 bg-dark-green-clr flex items-center justify-center rounded-full overflow-hidden absolute text-white -top-1 -right-1 border-[1px] border-white">
                    <small className="text-[10px]">{cart.length}</small>
                  </div>
                )}
              </div>
            </Link>

            <UserDropdown />

            {/* Hamburger */}
            <label className="swap swap-flip lg:hidden">
              {/* this hidden checkbox controls the state */}
              <input
                type="checkbox"
                checked={navOpen}
                onChange={() => setNavOpen(!navOpen)}
              />

              {/* hamburger icon */}
              <div className="swap-off">
                <HiBars3 className="text-xl" />
              </div>

              {/* close icon */}
              <div className="swap-on">
                <IoClose className="text-xl" />
              </div>
            </label>
          </div>
        </div>
      </header>
      <div className="h-15" />
    </>
  )
}

const MobileNav = ({
  navOpen,
  setNavOpen,
}: {
  navOpen: boolean
  setNavOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const navLinks = [
    {
      path: '/',
      title: 'Home',
    },
    {
      path: '/products',
      title: 'Products',
    },
    {
      path: '/about',
      title: 'About',
    },
    {
      path: '/contact',
      title: 'Contact',
    },
    {
      path: '/be-a-seller',
      title: 'Become a Seller',
    },
  ]

  window.onresize = () => {
    if (window.innerWidth >= 900) setNavOpen(false)
  }

  return (
    <nav id="headerNav" className={navOpen ? 'basis-2/4 active' : 'basis-2/4'}>
      <ul className="flex items-center justify-between text-sm">
        {navLinks.map((navLink, idx) => (
          <li key={idx} onClick={() => setNavOpen(false)}>
            <Link to={navLink.path}>{navLink.title}</Link>
          </li>
        ))}
      </ul>

      <div className="flex md:hidden absolute bottom-5 w-[100%] flex-col items-center gap-4 border-t-[1px] pt-4">
        <div>
          <img src={logo} alt="logo" className="w-[150px]" />
        </div>
        <div className="flex items-center gap-4">
          <FaFacebook />
          <FaInstagram />
          <FaLinkedin />
          <AiFillTwitterCircle />
          <FaYoutube />
        </div>
      </div>
    </nav>
  )
}

const UserDropdown = () => {
  const queryClient = useQueryClient()
  const { isFetching, data: user } = useGetUser()

  const handleLogout = () => {
    queryClient.resetQueries()
    localStorage.removeItem('token')
    toast.success('Success', {
      description: 'User logged out successfully',
    })
  }

  return isFetching ? (
    <div className="w-9 h-8 flex items-center justify-center">
      <span className="loading loading-spinner" />
    </div>
  ) : user ? (
    // Dropdown trigger
    <div className="dropdown dropdown-end cursor-pointer ">
      <div tabIndex={0} role="button" className="">
        <div className="md:flex items-center gap-3">
          <p className="hidden md:block">{user.name.split(' ')[0]}</p>
          {user.avatar ? (
            <div className="w-8 h-8 rounded-full overflow-hidden skeleton">
              <img src={user.avatar} className="w-full h-full object-cover" />
            </div>
          ) : (
            <AvatarComp size="sm" username={user.name} />
          )}
        </div>
      </div>

      {/* Dropdown content */}
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-1 w-max p-2 shadow-sm justify-start"
      >
        <li>
          <Link to="/user/account" className="py-2">
            <LiaUserCircle className="text-xl" />
            View Profile
          </Link>
        </li>
        <li>
          <button className="py-2" onClick={handleLogout}>
            <LiaDoorOpenSolid className="text-xl" />
            Logout
          </button>
        </li>
      </ul>
    </div>
  ) : (
    <Link
      to="/user/account"
      className="flex items-center gap-2 font-normal hover:bg-transparent "
    >
      <p className="hidden md:block">User</p>
      <AiOutlineUser className="text-xl" />
    </Link>
  )
}
