import React from 'react';
import { Link } from 'react-router-dom';
import mensCollectionImage from '../../assets/mens-collection.webp';
import womensCollectionImage from '../../assets/womens-collection.webp';

function GenderCollectionSection() {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Explore Our Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Women's Collection */}
          <div className='relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300'>
            <img
              src={womensCollectionImage}
              alt="Women's Collection"
              className='w-full h-[500px] md:h-[600px] object-cover transform group-hover:scale-105 transition-transform duration-500'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8'>
              <div className='text-white'>
                <h2 className='text-3xl lg:text-4xl font-bold mb-3'>
                  Women's Collection
                </h2>
                <p className='text-lg mb-6 max-w-md'>
                  Discover the latest trends in women's fashion
                </p>
                <Link
                  to='/collections/all?gender=Women'
                  className='inline-block px-8 py-3 bg-white text-gray-900 font-medium rounded-full hover:bg-gray-100 transition-colors duration-300'
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>

          {/* Men's Collection */}
          <div className='relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300'>
            <img
              src={mensCollectionImage}
              alt="Men's Collection"
              className='w-full h-[500px] md:h-[600px] object-cover transform group-hover:scale-105 transition-transform duration-500'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8'>
              <div className='text-white'>
                <h2 className='text-3xl lg:text-4xl font-bold mb-3'>
                  Men's Collection
                </h2>
                <p className='text-lg mb-6 max-w-md'>
                  Elevate your style with our premium menswear
                </p>
                <Link
                  to='/collections/all?gender=Men'
                  className='inline-block px-8 py-3 bg-white text-gray-900 font-medium rounded-full hover:bg-gray-100 transition-colors duration-300'
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GenderCollectionSection;