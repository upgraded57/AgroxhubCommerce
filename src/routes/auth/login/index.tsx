import {
  Link,
  createFileRoute,
  useNavigate,
  useSearch,
} from '@tanstack/react-router'
import { useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook, FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { useSyncCart } from '@/api/cart'
import { useLoginMutation } from '@/api/auth'
import ErrorMessage from '@/components/error-message'

export const Route = createFileRoute('/auth/login/')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      from: typeof search.from === 'string' ? search.from : undefined,
    }
  },
})

function RouteComponent() {
  const navigate = useNavigate()
  const from = useSearch({
    from: '/auth/login/',
    select: (param: { from?: string }) => param.from,
  })
  const [passwordVisible, setPasswordVisible] = useState(false)
  const initialValues = {
    email: '',
    password: '',
  }

  const { mutate: syncCart } = useSyncCart()

  const validationSchema = Yup.object({
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email address'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long')
      .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
      .matches(/\d/, 'Password must contain at least one number'),
  })
  const { mutateAsync: loginMutation, isPending } = useLoginMutation()
  const handleLogin = async (values: typeof initialValues) => {
    await loginMutation(values)
      .then((res) => {
        localStorage.setItem('token', res.data.token)

        // Sync local storage cart
        if (localStorage.getItem('cart')) {
          const cartItems: Array<CartItem> = JSON.parse(
            localStorage.getItem('cart') || '',
          )
          // Transform cart to fit backend expectation
          const transformedCart = cartItems.map((item) => ({
            ...item,
            productSlug: item.slug,
          }))
          syncCart(transformedCart)
        }
        console.log('Will route to homepage')
        if (from) {
          navigate({ to: from })
        } else {
          navigate({ to: '/' })
        }
      })
      .catch((err) => {
        if (err.status === 401) {
          localStorage.clear()
          localStorage.setItem('userId', err.response.data.userId)
          navigate({
            to: '/auth/verify-otp',
          })
        }
      })
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleLogin,
  })

  return (
    <div className="w-full flex items-center justify-center gap-8 flex-col">
      <p className="text-sm uppercase font-semibold">sign in to your account</p>
      <form onSubmit={formik.handleSubmit} className="w-full">
        <label htmlFor="email" className="block mb-8">
          <p className="text-sm uppercase">email address</p>
          <input
            type="email"
            {...formik.getFieldProps('email')}
            className="input input-bordered w-full"
            disabled={isPending}
          />
          <ErrorMessage formik={formik} fieldName="email" />
        </label>
        <label htmlFor="password" className="block">
          <p className="text-sm uppercase">password</p>
          <div className="input input-bordered w-full join p-0 gap-0">
            <input
              type={passwordVisible ? 'text' : 'password'}
              {...formik.getFieldProps('password')}
              className="w-full h-full join-item px-4"
              disabled={isPending}
            />
            {formik.values.password.length > 1 && (
              <span
                className="join-item btn btn-square btn-ghost shadow-none hover:border-none hover:bg-transparent"
                onClick={() => setPasswordVisible((prev) => !prev)}
              >
                {passwordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
              </span>
            )}
          </div>
          <ErrorMessage formik={formik} fieldName="password" />
        </label>
        <button
          className="btn green-gradient w-full uppercase mt-8"
          disabled={isPending || !formik.isValid || !formik.dirty}
          type="submit"
        >
          {isPending ? (
            <span className="loading loading-dots loading-md bg-white" />
          ) : (
            'sign in'
          )}
        </button>
      </form>
      <div>
        <p className="text-sm uppercase font-semibold mb-4">
          other sign-in options
        </p>
        <div className="flex gap-4 justify-center items-center">
          <button className="btn glass">
            <FcGoogle className="text-2xl" />
          </button>
          <button className="btn glass">
            <FaFacebook className="text-2xl text-blue-600" />
          </button>
        </div>
      </div>
      <span className="flex items-center justify-center gap-2">
        <p className="text-sm uppercase font-semibold">
          don't have an account?
        </p>
        <Link
          to="/auth/register"
          className={`text-sm uppercase font-semibold text-dark-green-clr cursor-pointer ${
            isPending && 'pointer-events-none'
          }`}
        >
          sign up
        </Link>
      </span>
    </div>
  )
}
