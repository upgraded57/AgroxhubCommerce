import { use } from 'react'
import { Navigate } from '@tanstack/react-router'
import { UserContext } from '@/providers/UserContext'

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const currentLocation = window.location.pathname
  const user = use(UserContext).user

  if (!user)
    return (
      <Navigate
        to="/auth/login"
        search={{
          from: currentLocation,
        }}
      />
    )
  return children
}
