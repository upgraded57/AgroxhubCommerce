import { Link, createFileRoute } from '@tanstack/react-router'
import { use } from 'react'
import { BiEdit } from 'react-icons/bi'
import moment from 'moment'
import { UserContext } from '@/providers/UserContext'
import noAvatar from '@/assets/images/noAvatar.jpeg'

export const Route = createFileRoute('/user/account/')({
  component: RouteComponent,
})

function RouteComponent() {
  const user = use(UserContext).user
  return (
    <>
      <h2 className="font-semibold text-2xl hidden md:block pb-2">
        MY ACCOUNT
      </h2>

      <div className="flex gap-2 flex-col md:flex-row w-full py-12 md:py-6 md:border-t border-b">
        <div className="w-[max-content] mx-auto md:mx-0 flex flex-col md:flex-row gap-4 items-center">
          <div className="w-[100px] md:w-[50px] aspect-square rounded-full overflow-hidden ">
            <img
              src={user?.avatar || noAvatar}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-center md:text-left">
            <p className="text-sm font-semibold">{user?.name}</p>
            <p className="text-sm">{user?.type}</p>
          </span>
        </div>
      </div>

      <div className="p-2 border-b flex justify-between items-center">
        <p className="font-semibold text-sm">GENERAL INFORMATION</p>
        <Link
          to="/user/account/edit"
          className="btn btn-ghost text-sm font-normal hover:bg-transparent"
        >
          EDIT
          <BiEdit />
        </Link>
      </div>

      <div className="p-4">
        <span className="block mb-4">
          <p className="font-semibold text-xs">FULL NAME</p>
          <p className="text-sm">{user?.name}</p>
        </span>
        <span className="block mb-4">
          <p className="font-semibold text-xs">EMAIL ADDRESS</p>
          <p className="text-sm">{user?.email}</p>
        </span>
        <span className="block mb-4">
          <p className="font-semibold text-xs">PHONE NUMBER</p>
          <p className="text-sm">{user?.phoneNumber || '---'}</p>
        </span>
        <span className="block mb-4">
          <p className="font-semibold text-xs">DELIVERY ADDRESS</p>
          <p className="text-sm">{user?.address || '---'}</p>
        </span>
        <span className="block mb-4">
          <p className="font-semibold text-xs">LOCATION</p>
          <div className="flex items-center gap-6">
            <p className="text-sm">
              <b>State:</b> {user?.region?.state || '---'}
            </p>
            <p className="text-sm">
              <b>Lcda:</b> {user?.region?.lcda || '---'}
            </p>
            <p className="text-sm">
              <b>Region:</b> {user?.region?.name || '---'}
            </p>
          </div>
        </span>
        <span className="block mb-4">
          <p className="font-semibold text-xs">PURCHASES</p>
          <p className="text-sm">23. 18 SUCCESSFUL</p>
        </span>
        <span className="block mb-4">
          <p className="font-semibold text-xs">DECLINES</p>
          <p className="text-sm">0</p>
        </span>
        <span className="block mb-4">
          <p className="font-semibold text-xs">REVIEWS</p>
          <p className="text-sm">18</p>
        </span>
        <span className="block">
          <p className="font-semibold text-xs">JOINED SINCE</p>
          <p className="text-sm">
            {moment(user?.createdAt).format('DD MMM, YYYY')}
          </p>
        </span>
      </div>
    </>
  )
}
