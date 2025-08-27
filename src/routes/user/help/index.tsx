import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/user/help/')({
  component: RouteComponent,
})

const helps = [
  {
    icon: '📘',
    title: 'Getting Started',
    desc: 'Learn how to create an account, set up your profile, and start using the app.',
    color: '#BBDEFB', // light blue
  },
  {
    icon: '🛒',
    title: 'Buying Produce',
    desc: 'Steps for browsing, adding items to cart, and placing orders securely.',
    color: '#FFE0B2', // light orange
  },
  {
    icon: '🚜',
    title: 'Selling Produce',
    desc: 'Guidelines for listing your farm products and managing inventory.',
    color: '#C8E6C9', // light green
  },
  {
    icon: '💳',
    title: 'Payments',
    desc: 'Understand payment methods, wallet top-up, and refund process.',
    color: '#E1BEE7', // light purple
  },
  {
    icon: '📦',
    title: 'Logistics & Delivery',
    desc: 'Learn how deliveries work and how to track your orders in real-time.',
    color: '#FFCDD2', // light red
  },
  {
    icon: '👩🏽‍🌾',
    title: 'Farmer Support',
    desc: 'Resources and support services available for farmers on the platform.',
    color: '#D7CCC8', // light brown/grey
  },
  {
    icon: '🔔',
    title: 'Notifications',
    desc: 'Customize alerts for orders, promotions, and important updates.',
    color: '#C5CAE9', // light indigo
  },
  {
    icon: '🔐',
    title: 'Account & Security',
    desc: 'Manage account settings, passwords, and secure your data.',
    color: '#B2DFDB', // light teal
  },
  {
    icon: '❓',
    title: 'FAQs',
    desc: 'Browse frequently asked questions for quick solutions.',
    color: '#FFCCBC', // light deep orange
  },
]

function RouteComponent() {
  return (
    <>
      <div className="hidden md:flex items-center justify-between border-b py-2 md:pt-0">
        <h2 className="font-semibold text-sm md:text-2xl">HELP CENTER</h2>
      </div>

      <div className="my-6">
        <div className="mb-6">
          <p className="text-sm">
            Find help by browsing through the most common topics
          </p>
        </div>
        <div className="grid help-grid gap-2">
          {helps.map((help, idx) => (
            <div
              className="px-2 py-6 rounded-lg space-y-1 border border-transparent bg-slate-50 text-center hover:shadow hover:bg-slate-100 hover:border-light-grey-clr cursor-pointer transition"
              key={idx}
            >
              <div
                className="w-10 h-10 rounded-full aspect-square flex items-center justify-center mx-auto"
                style={{
                  backgroundColor: help.color,
                }}
              >
                <span className="scale-150">{help.icon}</span>
              </div>
              <p className="text-sm font-medium">{help.title}</p>
              {/* <p className="text-sm font-light">{help.desc.slice(0, 20)}</p> */}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
