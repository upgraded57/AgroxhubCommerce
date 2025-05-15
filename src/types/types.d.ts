declare interface User {
  id: string
  name: string
  email: string
  avatar?: string
  coverImg?: string
  password: string
  isActive: boolean
  points?: number
  type: 'farmer' | 'xforce' | 'affiliate' | 'wholesaler' | 'buyer'
  phoneNumber?: string
  newsletterSubscription: boolean
  createdAt: string
  updatedAt: string
  address?: string
  region?: Region
  regionId?: string
  location?: string
}

declare interface Seller extends User {}

declare interface Product {
  id: string
  categoryId: string
  name: string
  slug: string
  description: string
  quantity: number
  isActive: boolean
  isPromoted: boolean
  promotionLevel: 'basic' | 'advance' | 'plus'
  images: Array<string>
  seller: User
  sellerId: string
  ratings: number
  location: string
  regionId: string
  unit: string
  unitWeight: string
  unitPrice: number
  expiryDate?: string
  discountPercentage?: number
  createdAt: string
  updatedAt: string
  purchases?: number
  views: number
  clicks: number
  reviews?: Array<Review>
}

declare interface Notification {
  id: string
  type:
    | 'follow'
    | 'productReview'
    | 'productSave'
    | 'productOrder'
    | 'productDelivery'
    | 'productShipped'
    | 'productClicks'
  unread: boolean
  subject: string
  content: string
  attachment: string
  createdAt: string
}

declare interface SavedItem {
  id: string
  productId: string
  userId: string
  createdAt: string
}

declare interface Review {
  id: string
  sellerId: string
  productId: string
  userId: string
  rating: number
  subject: string
  description: string
  createdAt: Date
}

declare interface Region {
  id: string
  state: string
  lcda: string
  name: string
  lat: number
  long: number
}

declare interface Category {
  id: string
  name: string
  slug: string
}

declare interface Cart {
  id: string
  userId: string
  cartItems: Array<CartItem>
  createdAt: Date
}

declare interface CartItem {
  name: string
  id: string
  cartId?: string
  slug: string
  quantity: number
  createdAt: string
  image: string
  price: number
  unit: string
  unitPrice: number
}

declare interface Order {
  id: string
  orderNumber: string
  userId?: string
  items: Array<OrderItem>
  productsAmount: number
  logisticsAmount: number
  totalAmount: number
  vat: number
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  createdAt: Date
  updatedAt: Date
  orderGroups: Array<OrderGroup>
  deliveryAddress: string
  deliveryRegion: Region
  deliveryRegionId: string
  status: 'pending' | 'in_transit' | 'delivered' | 'rejected' | 'canceled'
  referenceCode: string
  accessCode: string
  products: number
}

declare interface OrderGroup {
  id: string
  orderItems: Array<OrderItem>
  sellerId: string
  status: 'pending' | 'in_transit' | 'delivered' | 'rejected' | 'canceled'
  logisticsProviderId?: string
  order: Array<Order>
  sellerNote?: string
  logisticsNote?: string
  sellerName?: string
}

declare interface OrderItem {
  id: string
  orderId: string
  orderGroupId: string
  productId: string
  quantity: number
  unitPrice: number
  totalPrice: number
  createdAt: Date
  updatedAt: Date
  image?: string
  name?: string
  slug?: string
}

declare interface SellerSummary {
  products: number
  followers: number
  deliveredProducts: number
  orderedProducts: number
  rejectedProducts: number
  inTransitProducts: number
  cartProducts: number
  totalEarnings: number
}

declare interface ProductsSearchParams {
  category?: string
  region?: string
  currentPage?: string
  minPrice?: string
  maxPrice?: string
  rating?: string
  seller?: string
}

declare interface AlternativeLogisticsProvider {
  address: string | null
  avatar: string | null
  email: string
  id: string
  isActive: boolean
  isVisible: boolean
  logisticCost: number
  name: string
  phone: string | null
  regionId: string | nulll
}
