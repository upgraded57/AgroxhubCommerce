import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { FaFacebook, FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSignupMutation } from '@/api/auth'
import ErrorMessage from '@/components/error-message'

export const Route = createFileRoute('/auth/register/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const [passwordVisible, setPasswordVisible] = useState(false)

  const initialValues = {
    fullName: '',
    email: '',
    password: '',
    type: '',
  }

  const validationSchema = Yup.object({
    fullName: Yup.string()
      .required('Full name is required')
      .min(2, 'Full name must be at least 2 characters long'),
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email address'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long')
      .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
      .matches(/\d/, 'Password must contain at least one number'),
    type: Yup.string().required('Account type is required'),
  })

  const { mutateAsync: SignupMutate, isPending } = useSignupMutation()

  const handleSignup = async (values: typeof initialValues) => {
    await SignupMutate(values).then((res) => {
      if (res.status === 201) {
        const userId = res.data.userId
        localStorage.setItem('userId', userId)
        navigate({ to: '/auth/verify-otp' })
      }
    })
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSignup,
  })

  return (
    <div className="w-full flex items-center justify-center gap-8 flex-col">
      <p className="text-sm uppercase font-semibold">create an account</p>
      <form onSubmit={formik.handleSubmit} className="w-full ">
        <label htmlFor="fullName" className="block mb-8">
          <p className="text-sm uppercase">Full Name</p>
          <input
            type="text"
            {...formik.getFieldProps('fullName')}
            className="input input-bordered w-full"
            disabled={isPending}
          />
          <ErrorMessage formik={formik} fieldName="fullName" />
        </label>
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
        <label htmlFor="type" className="block mt-6">
          <p className="text-sm uppercase">Register as</p>
          <select
            className="select select-bordered min-w-full"
            {...formik.getFieldProps('type')}
          >
            <option value="" disabled>
              -- Select Account Type --
            </option>
            <option value="buyer">Retail Buyer</option>
            <option value="farmer">Farmer</option>
            <option value="wholesaler">Wholesaler</option>
            {/* <option value="xforce">X-Force Agent</option> */}
            {/* <option value="affiliate">Affiliate Marketer</option> */}
          </select>
          <ErrorMessage formik={formik} fieldName="type" />
        </label>
        <button
          className="btn green-gradient w-full uppercase mt-8"
          disabled={isPending || !formik.isValid || !formik.dirty}
          type="submit"
        >
          {isPending ? (
            <span className="loading loading-dots loading-md bg-white" />
          ) : (
            'Sign up'
          )}
        </button>
      </form>
      <div>
        <p className="text-sm uppercase font-semibold mb-4">
          other sign-in options
        </p>
        <div className="flex gap-4 justify-center items-center">
          <button className="btn shadow-lg">
            <FcGoogle className="text-2xl" />
          </button>
          <button className="btn shadow-lg">
            <FaFacebook className="text-2xl text-blue-600" />
          </button>
        </div>
      </div>
      <span className="flex items-center justify-center gap-2">
        <p className="text-sm uppercase font-semibold">
          Already have an account?
        </p>
        <Link
          to="/auth/login"
          search={{
            from: undefined,
          }}
          className={`text-sm uppercase font-semibold text-dark-green-clr cursor-pointer ${
            isPending && 'pointer-events-none'
          }`}
        >
          sign in
        </Link>
      </span>
    </div>
  )
}
