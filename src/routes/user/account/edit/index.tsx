import { BsCamera } from 'react-icons/bs'
import { useQueryClient } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { use, useState } from 'react'
import { useEditUser } from '@/api/user'
import { UserContext } from '@/providers/UserContext'
import useRegions from '@/hooks/use-regions'

export const Route = createFileRoute('/user/account/edit/')({
  component: RouteComponent,
})

function RouteComponent() {
  const queryClient = useQueryClient()
  const [newAvatar, setNewAvatar] = useState<string | null>(null)
  const user = use(UserContext).user
  const navigate = useNavigate()

  const { isPending, mutateAsync: editUser } = useEditUser()

  const handleEditUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.target as HTMLFormElement)
    await editUser(data).then(() => {
      queryClient.invalidateQueries({
        queryKey: ['User'],
      })

      navigate({ to: '/user/account' })
    })
  }

  const handleSetNewAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      const reader = new FileReader()

      reader.onload = (event) => {
        if (event.target?.result) {
          setNewAvatar(JSON.stringify(event.target.result))
        }
      }

      // Read the file as a data URL
      reader.readAsDataURL(file)
    }
  }

  const { isLoadingRegions, regions, selectedRegion, setSelectedRegion } =
    useRegions()
  const userInitials = user
    ? `${user.name.split(' ')[0][0]}${user.name.split(' ')[1][0]}`
    : ''
  return (
    <form onSubmit={handleEditUser}>
      <h2 className="font-semibold text-2xl hidden md:block pb-2">
        EDIT ACCOUNT
      </h2>

      <div className="flex gap-2 flex-col md:flex-row w-full py-12 md:py-6 md:border-t border-b">
        <div className="w-[max-content] mx-auto md:mx-0 flex flex-col md:flex-row gap-4 items-center relative">
          {user?.avatar ? (
            <div className="w-[150px] aspect-square rounded-full overflow-hidden">
              <img
                src={newAvatar ? newAvatar : user.avatar}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          ) : newAvatar ? (
            <img
              src={newAvatar}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="avatar avatar-placeholder bg-dark-green-clr">
              <div className="w-[150px] text-xl">{userInitials}</div>
            </div>
          )}

          <label
            htmlFor="avatar"
            className="w-12 aspect-square rounded-full green-gradient text-white flex items-center justify-center text-2xl absolute bottom-0 right-0 border-white  cursor-pointer"
          >
            <BsCamera />
          </label>
          <input
            type="file"
            name="avatar"
            id="avatar"
            hidden
            accept="image/*"
            disabled={isPending}
            onChange={handleSetNewAvatar}
          />
        </div>
      </div>

      <div className="p-2 border-b flex justify-between items-center">
        <p className="font-semibold text-sm">PERSONAL INFORMATION</p>
      </div>

      <div className="py-4 px-2">
        <label htmlFor="fullName" className="block mb-4">
          <p className="text-sm">FULL NAME</p>
          <input
            type="text"
            name="fullName"
            id="fullName"
            className="input input-bordered w-full"
            placeholder={user?.name}
            disabled={isPending}
            defaultValue={user?.name || ''}
          />
        </label>

        <label htmlFor="email" className="block mb-4">
          <p className="text-sm">EMAIL ADDRESS</p>
          <input
            type="email"
            name="email"
            id="email"
            className="input input-bordered w-full"
            placeholder={user?.email}
            disabled={isPending}
            defaultValue={user?.email || ''}
          />
        </label>

        <label htmlFor="phoneNumber" className="block mb-4">
          <p className="text-sm">PHONE NUMBER</p>
          <input
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            className="input input-bordered w-full"
            placeholder={user?.phoneNumber}
            disabled={isPending}
            defaultValue={user?.phoneNumber || ''}
          />
        </label>

        <label htmlFor="address" className="block mb-4">
          <p className="text-sm">DELIVERY ADDRESS</p>
          <input
            type="address"
            name="address"
            id="address"
            className="input input-bordered w-full"
            disabled={isPending}
            defaultValue={user?.address}
          />
        </label>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full">
          <label htmlFor="state" className="block w-full">
            <p className="text-sm uppercase">State of residence</p>
            <select
              className="select select-bordered min-w-full"
              defaultValue=""
              name="state"
              disabled={isLoadingRegions || !regions || regions.length < 1}
              onChange={(e) =>
                setSelectedRegion((prev) => ({
                  ...prev,
                  state: e.target.value,
                }))
              }
            >
              <option value="" disabled>
                -- Select State --
              </option>
              <option value="Lagos">Lagos</option>
            </select>
          </label>

          <label htmlFor="lcda" className="block w-full">
            <p className="text-sm uppercase">lcda of residence</p>
            <select
              className="select select-bordered min-w-full"
              defaultValue=""
              name="lcda"
              disabled={isLoadingRegions || !selectedRegion.state}
              onChange={(e) =>
                setSelectedRegion((prev) => ({
                  ...prev,
                  selectedLcda: e.target.value,
                }))
              }
            >
              <option value="" disabled>
                -- Select Lcda --
              </option>
              {selectedRegion.lcda.map((item: string, idx: number) => (
                <option value={item} key={idx}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="regionId" className="block w-full">
            <p className="text-sm uppercase">Region of residence</p>
            <select
              className="select select-bordered min-w-full"
              defaultValue=""
              name="regionId"
              disabled={isLoadingRegions || !selectedRegion.selectedLcda}
              onChange={(e) =>
                setSelectedRegion((prev) => ({
                  ...prev,
                  selectedRegion: e.target.value,
                }))
              }
            >
              <option value="" disabled>
                -- Select Region --
              </option>
              {selectedRegion.region
                ?.sort((a, b) => a.name.localeCompare(b.name))
                .map((item, idx) => (
                  <option value={item.id} key={idx}>
                    {item.name}
                  </option>
                ))}
            </select>
          </label>
        </div>
      </div>

      <div className="p-2 border-b flex justify-between items-center">
        <p className="font-semibold text-sm">PASSWORD UPDATE</p>
      </div>

      <div className="py-4 px-2">
        <label htmlFor="oldPassword" className="block mb-4">
          <p className="text-sm">OLD PASSWORD</p>
          <input
            type="password"
            name="oldPassword"
            id="oldPassword"
            className="input input-bordered w-full"
            disabled={isPending}
            autoComplete="off"
          />
        </label>

        <label htmlFor="newPassword" className="block mb-4">
          <p className="text-sm">NEW PASSWORD</p>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            className="input input-bordered w-full"
            disabled={isPending}
            autoComplete="off"
          />
        </label>

        <label htmlFor="confirmPassword" className="block mb-4">
          <p className="text-sm">CONFIRM PASSWORD</p>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="input input-bordered w-full"
            disabled={isPending}
            autoComplete="off"
          />
        </label>
      </div>

      <div className="flex justify-center items-center">
        <button
          type="submit"
          className="btn btn-outline border-orange-clr  text-orange-clr hover:text-white hover:bg-orange-clr hover:border-orange-clr uppercase"
          disabled={isPending}
        >
          {isPending ? (
            <span className="loading loading-dots loading-md bg-orange-clr" />
          ) : (
            'update account'
          )}
        </button>
      </div>
    </form>
  )
}
