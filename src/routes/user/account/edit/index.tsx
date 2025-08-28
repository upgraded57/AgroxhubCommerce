import { useQueryClient } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { use, useState } from 'react'
import { toast } from 'sonner'
import { IoClose } from 'react-icons/io5'
import { useEditUser } from '@/api/user'
import { UserContext } from '@/providers/UserContext'
import useRegions from '@/hooks/use-regions'
import AvatarComp from '@/components/avatar-comp'

export const Route = createFileRoute('/user/account/edit/')({
  component: RouteComponent,
})

function RouteComponent() {
  const queryClient = useQueryClient()
  const [newAvatar, setNewAvatar] = useState<File | null>(null)
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

  const { isLoadingRegions, regions, selectedRegion, setSelectedRegion } =
    useRegions()

  const handleSetNewAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null
    if (file && file.size > 2 * 1024 * 1024) {
      toast.error('Error', {
        description: 'Avatar size cannot exceed 2MB',
      })
      setNewAvatar(null)
      return
    }
    setNewAvatar(e.target.files ? e.target.files[0] : null)
  }

  const handleClearNewAvatar = () => {
    setNewAvatar(null)
    const avatarInput = document.getElementById('avatar') as HTMLInputElement
    avatarInput.files = null
  }
  return (
    <form onSubmit={handleEditUser}>
      <h2 className="font-semibold text-2xl hidden md:block pb-2">
        EDIT ACCOUNT
      </h2>

      <div className="flex gap-2 flex-col md:flex-row w-full py-12 md:py-6 md:border-t border-b">
        <div className="w-[max-content] mx-auto md:mx-0 flex flex-col md:flex-row gap-4 items-center relative">
          {newAvatar ? (
            <div className="w-[80px] aspect-square rounded-full overflow-hidden bg-slate-100">
              <img
                src={URL.createObjectURL(newAvatar)}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          ) : user?.avatar ? (
            <div className="w-[80px] aspect-square rounded-full overflow-hidden bg-slate-100">
              <img
                src={user.avatar}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <AvatarComp size="lg" username={user?.name} />
          )}

          <div className="flex gap-2">
            {newAvatar && (
              <button
                className="btn btn-sm btn-square"
                onClick={handleClearNewAvatar}
              >
                <IoClose />
              </button>
            )}
            <label htmlFor="avatar" className="btn btn-sm">
              Change
            </label>
            <input
              type="file"
              name="avatar"
              id="avatar"
              hidden
              accept="image/png, image/jpg, image/jpeg"
              disabled={isPending}
              onChange={handleSetNewAvatar}
            />
          </div>
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
          <p className="text-sm">ADDRESS</p>
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
                {user?.region?.state ? user.region.state : '-- Select State --'}
              </option>
              <option value="Lagos">Lagos</option>
              <option value="Lagos">Ogun</option>
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
                {user?.region?.lcda ? user.region.lcda : '-- Select Lcda --'}
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
                {user?.region?.name ? user.region.name : '-- Select Region --'}
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
