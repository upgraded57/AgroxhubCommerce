import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export default function SellerAnalyticsChart({
  summary,
}: {
  summary: SellerSummary | undefined
}) {
  const data = [
    {
      name: 'Total',
      product: summary ? summary.products : 0,
    },
    {
      name: 'Ordered',
      product: summary ? summary.orderedProducts : 0,
    },
    {
      name: 'Delivered',
      product: summary ? summary.deliveredProducts : 0,
    },
    {
      name: 'In Transit',
      product: summary ? summary.inTransitProducts : 0,
    },
    {
      name: 'In Cart',
      product: summary ? summary.cartProducts : 0,
    },
    {
      name: 'Rejected',
      product: summary ? summary.rejectedProducts : 0,
    },
  ]

  return (
    <ResponsiveContainer>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="product" fill="#82ca9d" maxBarSize={50} />
      </BarChart>
    </ResponsiveContainer>
  )
}
