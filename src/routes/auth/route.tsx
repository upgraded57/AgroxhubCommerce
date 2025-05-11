import { Link, Outlet, createFileRoute } from '@tanstack/react-router'
import logo from '@/assets/images/logo1.png'

export const Route = createFileRoute('/auth')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-no-repeat">
      <div className="bg-white bg-opacity-75 backdrop-blur-xs shadow-lg w-[90vw] max-w-[400px] rounded-lg p-6 flex flex-col gap-8 items-center justify-center border border-gray-100">
        <Link className="w-[148px]" to="/">
          <img src={logo} alt="Logo" className="w-full object-cover" />
        </Link>
        <Outlet />
      </div>
    </div>
  )
}
