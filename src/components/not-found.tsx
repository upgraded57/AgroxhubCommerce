import { Link } from '@tanstack/react-router'
import { GiFarmer } from 'react-icons/gi'
import Navbar from './navbar'

export default function NotFound() {
  return (
    <div className="h-screen w-full">
      <Navbar />
      <div className="contEl h-full">
        <div className="flex items-center justify-center gap-10 h-full -mt-[100px]">
          <GiFarmer className="text-[140px]" />
          <div>
            <h1 className="text-6xl font-bold">Page not found!</h1>
            <p className="max-w-md mt-4">
              The page you are looking for might have been removed, had its name
              changed or is temporarily unavailable
            </p>
            <div className="flex items-center gap-4 mt-6">
              <button
                className="btn btn-outline border-orange-clr border-2 text-orange-clr hover:text-white hover:bg-orange-clr hover:border-orange-clr uppercase"
                onClick={() => window.history.back()}
              >
                Go Back
              </button>
              <Link to="/">
                <button className="btn bg-orange-clr  text-white border-2 border-orange-clr uppercase hover:bg-orange-clr hover:border-orange-clr">
                  Go Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
