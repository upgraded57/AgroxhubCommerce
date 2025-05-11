import { Navigate, createFileRoute, useNavigate } from '@tanstack/react-router'
import { useResendOtpMutation, useVerifyOtpMutation } from '@/api/auth'

export const Route = createFileRoute('/auth/verify-otp/')({
  component: RouteComponent,
})

function RouteComponent() {
  const userId = localStorage.getItem('userId')
  const navigate = useNavigate()

  if (!userId) return <Navigate to="/auth/register" />

  const { mutateAsync: VerifyMutation, isPending } = useVerifyOtpMutation()
  const { mutateAsync: ResendMutation, isPending: ResendingOtp } =
    useResendOtpMutation()
  const verifyotp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.target as HTMLFormElement)
    if (userId) {
      data.append('userId', userId)
    }
    await VerifyMutation(data)
      .then(() => {
        localStorage.removeItem('userId')
        navigate({
          to: '/auth/login',
          search: {
            from: undefined,
          },
        })
      })
      .catch((err) => {
        if (err.response.status === 401 || err.response.status === 404) {
          localStorage.removeItem('userId')
          navigate({
            to: '/auth/login',
            search: {
              from: undefined,
            },
          })
        }
      })
  }

  const handleResend = async () => {
    let data
    if (userId) {
      data = { userId }

      await ResendMutation(data).catch((err) => {
        if (err.response.status === 404) {
          localStorage.removeItem('userId')
          navigate({ to: '/auth/register' })
        }
      })
    }
  }

  return (
    <div className="w-full flex items-center justify-center gap-8 flex-col">
      <p className="text-sm uppercase font-semibold">Verify your otp</p>
      <p className="text-sm">
        A six-digits otp has been sent to your email address. Enter it to
        activate your account
      </p>
      <form onSubmit={verifyotp} className="w-full">
        <label htmlFor="otp">
          <p className="text-sm uppercase">OTP</p>
          <input
            type="otp"
            name="otp"
            id="otp"
            className="input input-bordered w-full mb-8"
            inputMode="numeric"
            required
            maxLength={6}
            disabled={isPending}
          />
        </label>

        <button
          className="btn green-gradient w-full uppercase mt-8"
          disabled={isPending}
        >
          {isPending ? (
            <span className="loading loading-dots loading-md bg-white" />
          ) : (
            'Verify Otp'
          )}
        </button>
      </form>

      <span className="flex items-center justify-center gap-2">
        <p className="text-sm uppercase font-semibold">Didn't receive otp?</p>
        <p
          className={`text-sm uppercase font-semibold text-dark-green-clr cursor-pointer ${
            isPending || (ResendingOtp && 'pointer-events-none')
          }`}
          onClick={handleResend}
        >
          Resend OTP
        </p>
      </span>
    </div>
  )
}
