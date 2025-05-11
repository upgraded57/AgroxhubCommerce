import { createFileRoute, useParams } from '@tanstack/react-router'
import { useGetSimilarProducts, useGetSingleProduct } from '@/api/product'
import { useGetSellerMostPurchasedProducts } from '@/api/seller'
import Search from '@/components/search'
import AppLayout from '@/layouts/app-layout'
import LoadingProduct from '@/components/loading-product'
import ProductDetail from '@/components/product-detail'
import ProductNotFound from '@/components/product-not-found'
import AboutSeller from '@/components/about-seller'
import ProductsGrid from '@/components/products-grid'
import BeASeller from '@/components/be-a-seller'

export const Route = createFileRoute('/product/$slug/')({
  component: RouteComponent,
})

function RouteComponent() {
  const slug = useParams({
    from: '/product/$slug/',
    select: (params) => params.slug,
  })

  const { isLoading: isLoadingSimilarProducts, data: similarProducts } =
    useGetSimilarProducts(slug)

  const { isLoading, data: product } = useGetSingleProduct(slug)
  const sellerId = product ? product.sellerId : ''
  const { isLoading: isLoadingSellerProducts, data: sellerProducts } =
    useGetSellerMostPurchasedProducts(sellerId)

  return (
    <AppLayout>
      <Search />

      {isLoading ? (
        <LoadingProduct />
      ) : product ? (
        <ProductDetail product={product} />
      ) : (
        <ProductNotFound type="single" />
      )}
      {product && <AboutSeller seller={product.seller} />}

      <ProductsGrid
        header="More Products from Seller"
        isLoading={isLoadingSellerProducts}
        products={sellerProducts ? sellerProducts : []}
        moreLink={`/seller/${sellerId}/products`}
      />

      <ProductsGrid
        header="You may also like"
        isLoading={isLoadingSimilarProducts}
        products={similarProducts ? similarProducts : []}
      />

      <BeASeller />
    </AppLayout>
  )
}
