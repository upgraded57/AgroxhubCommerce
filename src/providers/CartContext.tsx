import { createContext, useEffect, useState } from 'react'

import { toast } from 'sonner'

import type { ReactNode } from 'react'
import type { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import {
  useAddItemToCart,
  useGetCartItems,
  useUpdateCartItem,
} from '@/api/cart'

interface CartContextProps {
  cart: Array<CartItem>
  addToCart: (item: CartItem) => void
  updateCartItem: (
    slug: string,
    type: 'increment' | 'decrement' | 'delete',
  ) => void
  clearCart: () => void
  isAddingItemToCart: boolean
  isLoadingCart: boolean
  isUpdatingItem: boolean
  refetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<Array<CartItem>, Error>>
}

export const CartContext = createContext<CartContextProps | undefined>(
  undefined,
)

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Array<CartItem>>([])
  const {
    isLoading: isLoadingCart,
    data: cartItems,
    refetch,
  } = useGetCartItems()
  const { mutateAsync: addItemToCart, isPending: isAddingItemToCart } =
    useAddItemToCart()

  const { mutateAsync: updatetItem, isPending: isUpdatingItem } =
    useUpdateCartItem()

  const token = localStorage.getItem('token') || null

  // Refetch cart data
  useEffect(() => {
    if (token) {
      refetch()
    }
  }, [])

  // Sync cart
  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      setCart(cartItems)
      localStorage.setItem('cart', JSON.stringify(cartItems))
    } else {
      const existingCart = localStorage.getItem('cart')
      const savedCart = existingCart ? JSON.parse(existingCart) : []
      setCart(savedCart)
    }
  }, [cartItems])

  // Save to localStorage whenever cart updates
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }, [cart])

  // Add item to cart
  const addToCart = (item: CartItem) => {
    if (token) {
      addItemToCart(item).then((res) => {
        setCart(res.data.cart)
      })
    } else {
      const itemExists = cart.some((c) => c.slug === item.slug)
      if (itemExists) {
        setCart((prevCart) =>
          prevCart.map((c) => (c.slug === item.slug ? item : c)),
        )
      } else {
        setCart((prevCart) => [...prevCart, item])
      }
      toast.success('Success', {
        description: 'Product added to cart',
        id: 'cartToast',
      })
    }
  }

  // Update cart tem
  const updateCartItem = (
    slug: string,
    type: 'increment' | 'decrement' | 'delete',
  ) => {
    if (token) {
      if (cart.length === 1) {
        localStorage.removeItem('cart')
      }
      updatetItem({ slug, type }).then((res) => {
        setCart(res.data.cart)
      })
    } else {
      const item = cart.find((p) => p.slug === slug)
      if (item) {
        if (type === 'delete') {
          if (cart.length === 1) {
            localStorage.removeItem('cart')
          }
          setCart((prev) => prev.filter((el) => el.slug !== item.slug))
        } else {
          // Increment or decrement quantity and update price
          setCart((prev) =>
            prev.map((el) => {
              if (el.slug !== slug) return el

              const newQuantity =
                type === 'increment' ? el.quantity + 1 : el.quantity - 1

              return {
                ...el,
                quantity: newQuantity,
                price: newQuantity * el.unitPrice,
              }
            }),
          )
        }
        toast.success('Success', {
          description:
            type === 'delete'
              ? 'Product removed from cart'
              : 'Product quantity updated successfully',
          id: 'cartToast',
        })
      }
    }
  }

  // Clear cart
  const clearCart = () => {
    setCart([])
    localStorage.removeItem('cart')
  }

  return (
    <CartContext
      value={{
        cart,
        addToCart,
        updateCartItem,
        clearCart,
        isAddingItemToCart,
        isLoadingCart,
        refetch,
        isUpdatingItem,
      }}
    >
      {children}
    </CartContext>
  )
}

export default CartProvider
