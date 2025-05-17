import { BsSearch } from 'react-icons/bs'

export default function Search() {
  const params = new URLSearchParams(window.location.search).get('q')
  return (
    <form
      action="/products"
      className=" container px-[4vw] mx-auto w-full flex items-center justify-center h-[150px]"
    >
      <div className="relative w-full max-w-[500px] flex items-center">
        <label className="input border-r-0 bg-[#f5f5f5] rounded-r-none flex items-center gap-2 w-full">
          <BsSearch className="text-gray-300" />
          <input
            type="text"
            name="q"
            className="grow"
            placeholder="Search ..."
            defaultValue={params || ''}
          />
        </label>

        <button
          type="submit"
          className="btn px-5 md:px-8 rounded-l-none green-gradient border-0"
        >
          Search
        </button>
      </div>
    </form>
  )
}
