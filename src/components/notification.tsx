import { RiUserFollowLine } from 'react-icons/ri'
import { FiBarChart } from 'react-icons/fi'
import moment from 'moment'

export default function Notification({ item }: { item: Notification }) {
  switch (item.type) {
    // case notificationType.follow:
    case 'follow':
      return (
        <div
          onClick={() => {
            const modalElement = document.getElementById(
              item.id,
            ) as HTMLDialogElement | null
            if (modalElement) {
              modalElement.showModal()
            }
          }}
          className="block py-4 cursor-pointer hover:bg-gray-100 hover:pl-2 transition-all border-b"
          key={item.id}
        >
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 aspect-square bg-dark-blue-clr rounded-md flex items-center justify-center text-white relative">
              {item.unread && (
                <span className="badge badge-xs absolute -top-1 -right-1 bg-red-clr" />
              )}
              <div className="text-xl">
                <RiUserFollowLine />
              </div>
            </div>

            <div className="block">
              <p className="text-sm font-semibold uppercase">{item.subject}</p>
              <p className="text-sm">{item.content}</p>
              <small className="text-xs text-gray-400 font-light">
                {moment(item.createdAt).format('DD MMM, YYYY. hh:mm a')}
              </small>
            </div>
          </div>
          <NotifModal id={item.id} data={item} />
        </div>
      )

    case 'productClicks':
      return (
        <div
          onClick={() => {
            const modalElement = document.getElementById(
              item.id,
            ) as HTMLDialogElement | null
            if (modalElement) {
              modalElement.showModal()
            }
          }}
          className="block py-4 cursor-pointer hover:bg-gray-100 hover:pl-2 transition-all border-b"
          key={item.id}
        >
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 aspect-square bg-dark-blue-clr rounded-md flex items-center justify-center text-white relative">
              {item.unread && (
                <span className="badge badge-xs absolute -top-1 -right-1 bg-red-clr" />
              )}
              <div className="text-xl">
                <FiBarChart />
              </div>
            </div>

            <div className="block">
              <p className="text-sm font-semibold uppercase">{item.subject}</p>
              <p className="text-sm">{item.content}</p>
              <small className="text-xs text-gray-400 font-light">
                {moment(item.createdAt).format('DD MMM, YYYY. hh:mm a')}
              </small>
            </div>
          </div>
          <NotifModal id={item.id} data={item} />
        </div>
      )
  }
}

const NotifModal = ({ id, data }: { id: string; data: Notification }) => {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box">
        <h3 className="font-[500] text-lg">{data.subject}</h3>
        <p className="pt-2 text-sm">{data.content}</p>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  )
}
