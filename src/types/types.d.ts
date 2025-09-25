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
  purchases?: {
    total: number
    delivered: number
  }
}

declare interface Seller extends User {}

declare interface Product {
  id: string
  categoryId: string
  name: string
  slug: string
  description: string
  quantity: number
  min_sellable_quantity: number
  low_stock_alert_level: number
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
  reviews?: Array<{
    rating: string
    review: string
    createdAt: string
    user: {
      id: string
      name: string
      avatar: string
    }
  }>
}

declare interface NotificationList {
  id: string
  type:
    | 'follow'
    | 'productReview'
    | 'productSave'
    | 'orderPlacement'
    | 'orderPickup'
    | 'orderInTransit'
    | 'orderDelivery'
    | 'milestone'
    | 'orderAssignment'
    | 'outOfStock'
    | 'orderReturn'
  unread: boolean
  subject: string
  summary: string
  attachment?: string
  createdAt: string
  review?: {
    id: string
    rating: string
    review: string
  }
  product?: {
    id: string
    name: string
    image: string
    images?: Array<string>
    unit: string
    slug: string
    totalPrice?: number
  }
  products?: Array<{
    id: string
    name: string
    image: string
    unit: string
    quantity: number
    slug: string
  }>
  buyer?: {
    id: string
    name: string
    avatar: string
  }
  user?: {
    id: string
    name: string
    avatar: string
  }
  follower?: {
    id: string
    name: string
    avatar: string
  }
  logisticsProvider?: {
    id: string
    name: string
    avatar: string
  }
  order?: {
    id: string
    amount: number
    createdAt: string
    deliveryAddress: string
    deliveryRegion: {
      state: string
      lcda: string
      name: string
    }
  }
  productQuantity?: number
  pickupDate?: string
  deliveryDate?: string
  milestone?: string
  rejectionReason?: string
}

declare interface SavedItem {
  id: string
  productId: string
  userId: string
  createdAt: string
}

declare interface Review {
  product: {
    slug: string
    id: string
    name: string
    images: Array<string>
    ratings: number
  }
  reviews: Array<{
    id: string
    rating: string
    review: string
    user: {
      id: string
      avatar: string
      name: string
    }
  }>
  createdAt: string
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
  updatedAt?: string
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
  deliveryDate?: string
  logisticProvider?: User
  orderCompletionCode?: string
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
  unit?: string
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
  withdrawableEarnings: number
}

declare interface SellerOrdersSummary {
  orders: number
  products: number
  delivered: number
  rejected: number
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

declare interface Review {}

declare interface LogisticsProvider {
  address: string | null
  avatar: string | null
  email: string
  id: string
  isActive: boolean
  isVisible: boolean
  name: string
  phone: string | null
  regionId: string | null
}

declare interface SellerOrders {
  createdAt: Date
  deliveryDate?: Date
  pickupDate?: Date
  id: string
  productsCount: number
  status: string
}

declare interface SellerOrder {
  id: string
  pickupAddress: string
  deliveryAddress: string
  pickupDate?: Date
  deliveryDate?: Date
  status: string
  createdAt: Date
  user: {
    name: string
    avatar: string
  }
  logisticsProvider?: {
    name: string
    avatar: string
  }
  products: Array<{
    slug: string
    name: string
    quantity: number
    unit: string
    images: Array<string>
  }>
}

declare interface AllProductsParams {
  category?: string
  region?: string
  page?: string
  minPrice?: string
  maxPrice?: string
  rating?: string
  seller?: string
}
