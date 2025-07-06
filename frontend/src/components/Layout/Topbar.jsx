import React from 'react'
import { TbBrandMeta } from 'react-icons/tb'
import { IoLogoInstagram } from 'react-icons/io'
import { RiTwitterXLine } from 'react-icons/ri'
function Topbar() {
    return (
        <div className=' bg-gradient-to-r from-blue-600 to-violet-600  text-white'>
          <div className='container mx-auto flex justify-between items-center py-3 px-4 '>
              <div className='hidden md:flex items-center space-x-4'>
                <a href="#" className='hover:text-gray-300'>
                        <TbBrandMeta className='h-5 w-5' />
                </a>

                <a href="#" className='hover:text-gray-300'>
                        <IoLogoInstagram className='h-5 w-5' />
                </a>
                    
                    <a href="#" className='hover:text-gray-300'>
                        <RiTwitterXLine className='h-5 w-4' />
                </a>
                </div>
                <div className='text-sm text-center flex-grow'>
                    <p>We ship worldwide - Fast and reliable shipping!</p>
                </div>
                <div className="text-sm hidden md:block">
                    <a href="tel:+212612344568" className='hover:text-gray-300'>
                        +212 (123) 456  78
                    </a>
                </div>
          </div>
    </div>
  )
}

export default Topbar