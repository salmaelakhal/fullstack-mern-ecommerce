import React from 'react'
import Hero from '../components/Layout/Hero'
import GenderCollectionSection from '../components/Products/GenderCollectionSection'
import NewArrivals from '../components/Products/NewArrivals'
import ProductDetails from '../components/Products/ProductDetails'
import ProductGrid from '../components/Products/ProductGrid'
import FeaturedCollection from '../components/Products/FeaturedCollection'

function Home() {

  const placeholderProducts = [
    {
      _id: 1,
      name: 'Product 1',
      price: 120,
      images: [{ url: "https://picsum.photos/200?random=1", }]
  },
  {
      _id: 2,
      name: 'Product 2',
      price: 120,
      images: [{ url: "https://picsum.photos/200?random=2", }]
  },
  {
      _id: 3,
      name: 'Product 3',
      price: 120,
      images: [{ url: "https://picsum.photos/200?random=3", }]
    },
    {
      _id: 1,
      name: 'Product 4',
      price: 120,
      images: [{ url: "https://picsum.photos/200?random=4", }]
  },
  {
      _id: 2,
      name: 'Product 5',
      price: 120,
      images: [{ url: "https://picsum.photos/200?random=5", }]
  },
  {
      _id: 3,
      name: 'Product 6',
      price: 120,
      images: [{ url: "https://picsum.photos/200?random=6", }]
  },
  ]



  return (
      <div>
          <Hero />
          <GenderCollectionSection />
          <NewArrivals/>
      {/* Best sellers */}
      <h2 className='text-3xl text-center font-bold mb-4'>Best Selers</h2>
      <ProductDetails />
      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wears for Women 
        </h2>
        <ProductGrid products={placeholderProducts} />
      </div>
      <FeaturedCollection />
    </div>
  )
}

export default Home