import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import RecentProductListing from '@/components/recent-product-listing'

export default function AppLayout({
  children,
  noLeanMoreLink,
}: {
  children: React.ReactNode
  noLeanMoreLink?: boolean
}) {
  return (
    <>
      <Navbar />
      {children}
      <RecentProductListing />
      <Footer noLeanMoreLink={noLeanMoreLink} />
    </>
  )
}
