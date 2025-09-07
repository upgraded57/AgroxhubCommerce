import { useQueryClient } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { use, useEffect, useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa6'
import { PiEmptyBold } from 'react-icons/pi'
import { IoCartOutline, IoHeart, IoHeartDislikeOutline } from 'react-icons/io5'
import { toast } from 'sonner'
import { useGetSavedProducts, useSaveProduct } from '../api/saves'
import ProductRatings from './product-rating'
import type { SetStateAction } from 'react'
import { CartContext } from '@/providers/CartContext'

export default function ProductDetail({ product }: { product: Product }) {
  const [qty, setQty] = useState(product.min_sellable_quantity)

  // Save product as recently viewed to localStorage
  useEffect(() => {
    const existingRecentProducts = localStorage.getItem('recent')
    const recentProducts = existingRecentProducts
      ? JSON.parse(existingRecentProducts)
      : []
    if (!recentProducts.includes(product.slug)) {
      recentProducts.unshift(product.slug)
      if (recentProducts.length > 6) recentProducts.splice(6)
      localStorage.setItem('recent', JSON.stringify(recentProducts))
    }
  }, [product.slug])

  const [currentImg, setCurrentImg] = useState(product.images[0])

  return (
    <div className="contEl mb-12">
      <div className="flex gap-4 flex-col md:flex-row">
        <ProductImages
          currentImg={currentImg}
          setCurrentImg={setCurrentImg}
          images={product.images}
        />
        <div className="w-full basis-1/2">
          {/* Product description */}
          <div className="w-full">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold md:font-normal md:text-3xl">
                {product.name}
              </h2>
              {product.quantity === 0 && (
                <span className="badge badge-warning badge-sm rounded-md text-white gap-1">
                  <PiEmptyBold />
                  Out of Stock
                </span>
              )}
            </div>
            <hr className="my-3" />
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-normal md:text-3xl">
                N{product.unitPrice.toLocaleString()}
              </h1>
              <p className="text-sm">per {product.unit}</p>
            </div>
            <hr className="my-3" />
            <p className="text-sm">{product.description}</p>
            <hr className="my-3" />
            <div className="flex items-center gap-2">
              <ProductRatings ratings={String(product.ratings)} />

              <p className="text-sm pl-3">
                {product.reviews?.length || 0} Reviews
              </p>
              {product.reviews && product.reviews.length > 0 && (
                <Link
                  to="/product/$slug/reviews"
                  params={{
                    slug: product.slug,
                  }}
                  className="text-sm text-dark-green-clr underline"
                >
                  <p className="text-sm">View All</p>
                </Link>
              )}
            </div>
          </div>
          <hr className="my-3" />

          {product.quantity !== 0 && (
            <ProductQtyChangeBtns
              qty={qty}
              min={product.min_sellable_quantity}
              setQty={setQty}
              total={product.quantity}
              productUnit={product.unit}
            />
          )}
          {product.quantity !== 0 && (
            <>
              <hr className="my-3" />
              <ProductActionBtns qty={qty} product={product} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

const ProductImages = ({
  currentImg,
  setCurrentImg,
  images,
}: {
  currentImg: string
  setCurrentImg: React.Dispatch<SetStateAction<string>>
  images?: Array<string>
}) => {
  return (
    <div className="flex flex-col gap-2 w-full basis-1/2">
      <div className="w-full aspect-3/2 rounded-lg bg-gray-200 overflow-hidden border">
        <img
          src={currentImg || ''}
          alt="Product image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {images?.map((item, idx) => (
          <div
            className="aspect-3/2 rounded-md overflow-hidden bg-gray-200 cursor-zoom-in border"
            key={idx}
            onClick={() => setCurrentImg(item)}
          >
            <img
              src={item}
              alt="Product Image"
              className={`w-full h-full object-cover ${
                item === currentImg
                  ? 'opacity-100  border-orange-clr rounded-md'
                  : 'opacity-50 hover:opacity-100'
              } `}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

const ProductActionBtns = ({
  qty,
  product,
}: {
  qty: number
  product: Product
}) => {
  const queryClient = useQueryClient()
  const token = localStorage.getItem('token')
  const [isSavedProduct, setIsSavedProduct] = useState(false)
  const addProductToCart = use(CartContext)?.addToCart
  const isAddingItemToCart = use(CartContext)?.isAddingItemToCart

  const { data: savedProducts, isFetching: isFetchingSavedProducts } =
    useGetSavedProducts()

  const { mutateAsync: saveProduct, isPending: isSavingProduct } =
    useSaveProduct()

  const handleSaveProduct = async () => {
    if (!token) {
      toast.error('Error', {
        description: 'Please login to continue',
        id: 'saveToast',
      })
      return
    }
    try {
      await saveProduct(product.id)
      queryClient.invalidateQueries({
        queryKey: ['Saves'],
      })
      setIsSavedProduct((prev) => !prev)
    } catch (error) {
      toast.error('Error', {
        description: 'An error occurred. Please try again.',
      })
    }
  }

  const handleAddProductToCart = () => {
    if (addProductToCart) {
      addProductToCart({
        name: product.name,
        slug: product.slug,
        quantity: qty,
        image: product.images[0],
        price: product.unitPrice * qty,
        unit: product.unit,
        unitPrice: product.unitPrice,
        id: product.id,
        createdAt: product.createdAt,
      })
    }
  }

  // Determine if the product is saved
  useEffect(() => {
    if (savedProducts) {
      const isSaved = savedProducts.some(
        (item) => item.productId === product.id,
      )
      setIsSavedProduct(isSaved)
    }
  }, [savedProducts, product.id])

  return (
    <div className="flex items-center gap-2">
      <button
        className="btn green-gradient text-white"
        disabled={isAddingItemToCart}
        onClick={() => handleAddProductToCart()}
      >
        {isAddingItemToCart ? (
          <span className="loading loading-dots" />
        ) : (
          'Add to Cart'
        )}
        <IoCartOutline className="text-2xl" />
      </button>
      <button
        className="btn  border-orange-clr bg-white text-orange-clr hover:bg-orange-clr hover:text-white hover:border-orange-clr disabled:border-gray-200"
        onClick={handleSaveProduct}
        disabled={isSavingProduct || isFetchingSavedProducts}
      >
        {isFetchingSavedProducts ? (
          <span className="loading loading-dots loading-md" />
        ) : isSavedProduct ? (
          'Unsave'
        ) : (
          'Save'
        )}
        {isSavedProduct ? (
          <IoHeartDislikeOutline className="text-2xl" />
        ) : (
          <IoHeart className="text-2xl" />
        )}
      </button>
    </div>
  )
}

const ProductQtyChangeBtns = ({
  qty,
  min,
  setQty,
  productUnit,
  total,
}: {
  qty: number
  min: number
  setQty: React.Dispatch<SetStateAction<number>>
  productUnit?: string
  total: number
}) => {
  const handleChangeQty = (type: 'increment' | 'decrement') => {
    if (type === 'increment') {
      setQty((prev) => {
        if (prev < total) {
          return prev + 1
        } else {
          toast.warning('Error', {
            description: `Cannot order more than ${total} ${productUnit}${total > 1 ? 's' : ''}`,
          })
          return prev
        }
      })
    } else {
      setQty((prev) => {
        if (prev > min) {
          return prev - 1
        } else {
          toast.error('Error', {
            description: `At least ${min} ${productUnit}s is sellable`,
          })
          return prev
        }
      })
    }
  }
  return (
    <>
      <div className="join">
        <button
          className="join-item btn"
          onClick={() => handleChangeQty('decrement')}
          disabled={qty <= min}
        >
          <FaMinus />
        </button>
        <div className="join-item flex items-center justify-center border-[1px] text-xl min-w-[100px] px-2">
          {qty} {productUnit}
        </div>
        <button
          className="join-item btn"
          onClick={() => handleChangeQty('increment')}
        >
          <FaPlus />
        </button>
      </div>
      <p className="text-sm mt-3">
        Minimum {min} {productUnit}
        {min > 1 ? 's' : ''} sellable in one order | {total} {productUnit}
        {total > 1 ? 's' : ''} still in stock
      </p>
    </>
  )
}
