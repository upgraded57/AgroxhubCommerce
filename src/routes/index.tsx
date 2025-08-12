import { createFileRoute } from '@tanstack/react-router'
import Hero from '@/components/hero'
import ProductsPicker from '@/components/products-picker'
import Search from '@/components/search'
import ProductsList from '@/components/products-list'
import Farmers from '@/components/sellers'
import BeASeller from '@/components/be-a-seller'
import AppLayout from '@/layouts/app-layout'
import NotFound from '@/components/not-found'

export const Route = createFileRoute('/')({
  component: App,
  notFoundComponent: NotFound,
})

function App() {
  return (
    <AppLayout>
      <Search />
      <Hero />
      <ProductsPicker />
      <ProductsList header="Flours and Mills" category="flours_and_mills" />
      <ProductsList header="Herbs and Spices" category="herbs_and_spices" />
      <ProductsList header="Fruits" category="fruits" />
      <Farmers header="Buy From Best Sellers" />
      <ProductsList header="Milk and Cream" category="milk_and_cream" />
      <ProductsList header="Vegetables" category="vegetables" />

      <BeASeller />
    </AppLayout>
  )
}
