import { createContext } from 'react'
import { Navigate } from '@tanstack/react-router'
import { jwtDecode } from 'jwt-decode'
import Loader from '../components/loader'
import { useGetUser } from '@/api/user'

interface UserContextProp {
  user?: User | null
}
export const UserContext = createContext<UserContextProp>({ user: null })

// Provider component
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const currentLocation = window.location.pathname
  const token = localStorage.getItem('token') || ''
  if (!token)
    return (
      <Navigate
        to="/auth/login"
        search={{
          from: currentLocation,
        }}
      />
    )

  const decoded = jwtDecode(token)
  const currentDate = new Date().getTime()
  if (decoded.exp && decoded.exp < Math.floor(currentDate / 1000)) {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
  }

  const { isLoading, data: user } = useGetUser()

  if (isLoading) {
    return <Loader type="full" />
  }

  return <UserContext value={{ user }}>{children}</UserContext>
}
