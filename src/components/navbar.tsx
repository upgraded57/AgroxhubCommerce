import { IoCartOutline, IoClose } from 'react-icons/io5'
import { AiFillTwitterCircle, AiOutlineUser } from 'react-icons/ai'
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'
import { HiBars3 } from 'react-icons/hi2'
import { use, useEffect, useState } from 'react'
import { LiaDoorOpenSolid } from 'react-icons/lia'
import { useQueryClient } from '@tanstack/react-query'
import { Link, useNavigate } from '@tanstack/react-router'
import toast from 'react-hot-toast'

import logo from '@/assets/images/logo1.png'

import { useGetUser } from '@/api/user'
import noAvatar from '@/assets/images/noAvatar.jpeg'
import { CartContext } from '@/providers/CartContext'

export default function Navbar() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [navOpen, setNavOpen] = useState(false)
  const { isFetching, data: user } = useGetUser()

  const cart = use(CartContext)?.cart
  const refetch = use(CartContext)?.refetch

  window.onresize = () => {
    if (window.innerWidth >= 900) setNavOpen(false)
  }

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

  const handleLogout = () => {
    queryClient.resetQueries()
    localStorage.removeItem('userId')
    localStorage.removeItem('token')
    toast.success('User logged out successfully')
    navigate({ to: '/auth/login', search: { from: undefined } })
  }

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
          <nav
            id="headerNav"
            className={navOpen ? 'basis-2/4 active' : 'basis-2/4'}
          >
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

          {/* Desktop Navigation */}
          <div className="sidenav flex items-center basis-1/4 justify-end text-sm ">
            <Link
              to="/cart"
              className="btn btn-ghost mx-0 py-0 hover:bg-transparent font-normal shadow-none"
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

            {isFetching ? (
              <div className="flex items-center gap-2">
                <span className="loading loading-dots loading-md" />
                <AiOutlineUser className="text-xl" />
              </div>
            ) : user ? (
              // Dropdown trigger
              <div className="dropdown dropdown-end cursor-pointer border-[1px] border-transparent px-4 py-2 rounded hover:border-neutral-content hover:shadow-xs">
                <div tabIndex={0} role="button">
                  <div className="flex items-center gap-3">
                    <p className="hidden md:block">{user.name.split(' ')[0]}</p>
                    <div className="w-5 h-5 rounded-full overflow-hidden">
                      <img
                        src={user.avatar || noAvatar}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Dropdown content */}
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-1 w-max p-2 shadow-sm justify-start"
                >
                  <li>
                    <Link to="/user/account" className="py-3">
                      <div className="w-5 h-5 rounded-full overflow-hidden">
                        <img
                          src={user.avatar || noAvatar}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      View Profile
                    </Link>
                  </li>
                  <li>
                    <button className="py-3" onClick={handleLogout}>
                      <LiaDoorOpenSolid className="text-xl" />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                to="/user/account"
                className="btn btn-ghost font-normal hover:bg-transparent shadow-none"
              >
                <p className="hidden md:block">User</p>
                <AiOutlineUser className="text-xl" />
              </Link>
            )}

            <label className="swap swap-flip btn btn-ghost lg:hidden">
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
