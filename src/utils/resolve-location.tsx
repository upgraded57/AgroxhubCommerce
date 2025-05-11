export const ResolveLocation = (location: any) => {
  if (location.pathname === '/user/account') return 'My Account'
  if (location.pathname.split('/')[3] === 'edit') return 'Edit Account'
  if (location.pathname === '/user/orders') return 'Orders'
  if (location.pathname.includes('saved')) return 'Saved Items'
  if (location.pathname.includes('recent')) return 'Recent Items'
  if (location.pathname === '/user/payment') return 'Payment Methods'
  if (location.pathname === '/user/payment/new') return 'Add New Payment Card'
  if (location.pathname.includes('notifications')) return 'Notifications'
  if (location.pathname.includes('help')) return 'Help Center'
  if (location.pathname.includes('user/review')) return 'Review / Suggestion'
  if (location.pathname.includes('report')) return 'Report a Problem'
  if (location.pathname.includes('/followers')) return 'Followers'
  if (location.pathname.includes('seller/products/create'))
    return 'Create Product'
  if (
    location.pathname.includes('seller/products') &&
    location.pathname.includes('/analytics')
  )
    return 'product analytics'
  if (
    location.pathname.includes('seller/products') &&
    location.pathname.includes('/promote')
  )
    return 'promotion'
  if (
    location.pathname.includes('user/orders') &&
    location.pathname.includes('/review')
  )
    return 'product review'
  return location.pathname.split('/')[2] || ''
}
