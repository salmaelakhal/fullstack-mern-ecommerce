import React from 'react'
import { Link } from 'react-router-dom';
import { TbBrandMeta  } from 'react-icons/tb'
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { FiPhoneCall } from "react-icons/fi";

function Footer() {
  return (
    <footer className="border-t py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0">
        <div>
          <h3 className='text-lg text-gray-800 mb-4'>News letter</h3>
          <p className='text-gray mb-4'>
            Be the first t hear about new products, exclusive events,
            and online offers.
          </p>
          <p className='font-medium text-sm text-gray-600 mb-6 '>Sign up and get 10% off yours first order.</p>

          {/* Newsletter from */}
          <form className="flex">
            <input type="email"
              placeholder='Enter your email'
              className='p-3 w-full text-sm border-t border-l border-b border-gray-300 rounded rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-6-500 transition-all required'
            />
            <button type='submit' className='bg-black text-white px-6 py-3 text-sm rouned-r-md hover:bg-gray-800 transition-all'>Subscribe</button>
          </form>
        </div>
        {/* Shop Links */}
        <div>
          <h3 className='text-lg text-gray-800 mb-4'>Shop</h3>
          <ul className='space-y-2 text-gray-600'>
            <li>
              <Link to='#' className='hover:text-gray-800 transition-colors'>Men's top wear</Link>
            </li>

            <li>
              <Link to='#' className='hover:text-gray-800 transition-colors'>Women's top wear</Link>
            </li>

            <li>
              <Link to='#' className='hover:text-gray-800 transition-colors'>Men's bottom wear</Link>
            </li>

            <li>
              <Link to='#' className='hover:text-gray-800 transition-colors'>Women's bottom wear</Link>
            </li>


          </ul>
        </div>

      {/* Support Link */}
      
      <div>
          <h3 className='text-lg text-gray-800 mb-4'>Support</h3>
          <ul className='space-y-2 text-gray-600'>
            <li>
              <Link to='#' className='hover:text-gray-800 transition-colors'>COntact Us</Link>
            </li>

            <li>
              <Link to='#' className='hover:text-gray-800 transition-colors'>About Us</Link>
            </li>

            <li>
              <Link to='#' className='hover:text-gray-800 transition-colors'>FAQs</Link>
            </li>

            <li>
              <Link to='#' className='hover:text-gray-800 transition-colors'>Features</Link>
            </li>

          </ul>
        </div>

        {/* Fllow us */}
        <div>
          <h3 className='text-lg text-gray-800 mb-4'>Follow Us</h3>
          <div className='flex items-center space-x-4 mb-6'>
            <a href="https://www.facebook.com"
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-gray-300'
            >
              <TbBrandMeta className='h-5 w-5' />
            </a>

            <a href="https://www.facebook.com"
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-gray-300'
            >
              <IoLogoInstagram className='h-5 w-5' />
            </a>

            <a href="https://www.facebook.com"
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-gray-300'
            >
              <RiTwitterXLine className='h-4 w-4' />
            </a>

          </div>

          <p className='text-gray-500'>Call Us</p>
          <FiPhoneCall className='inline-block mr-2' />
          0123456789
        </div>
      </div>
      {/* Footer bottom */}
      <div className=' container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6'>
        <p className='text-gray-500 text-sm tracking-tighter text-center'>
          &copy; 2023 MERNify. All rights reserved.
        </p>
      </div>
    </footer>

  )
}


export default Footer