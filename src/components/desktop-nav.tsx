import { Link } from '@tanstack/react-router'
import { use } from 'react'
import { UserContext } from '@/providers/UserContext'

interface Props {
  userLinks: Array<{
    path: string
    title: string
  }>
  sellerLinks: Array<{
    path: string
    title: string
  }>
}
export default function DesktopNav({ userLinks, sellerLinks }: Props) {
  const user = use(UserContext).user
  const isSeller = user?.type === 'wholesaler' || user?.type === 'farmer'
  return (
    <div className="nav-lg basis-1/4 hidden md:block uppercase text-sm sticky top-[100px]">
      <div className="bg-light-grey-clr rounded-lg w-full overflow-hidden mb-5">
        {userLinks.map((userLink, idx) => (
          <Link
            key={idx}
            to={userLink.path}
            className="list block py-2 px-4 border-b hover:bg-gray-200"
          >
            {userLink.title}
          </Link>
        ))}
      </div>

      {isSeller && (
        <>
          <p className="text-sm font-bold uppercase mb-2">sellers</p>
          <div className="bg-light-grey-clr rounded-lg w-full overflow-hidden">
            {sellerLinks.map((sellerLink, idx) => (
              <Link
                key={idx}
                to={sellerLink.path}
                className="list block py-2 px-4 border-b hover:bg-gray-200"
              >
                {sellerLink.title}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
