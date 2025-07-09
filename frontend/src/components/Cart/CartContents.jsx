import React from 'react'
import { RiDeleteBin3Line } from "react-icons/ri";

function CartContents() {
 
    const cartProducts = [
        {
            productId: 1,
            name: 'T-shirt',
            size: "M",
            color: "Red",
            quantity: 1,
            price: 19.99,
            image: " https://picsum.photos/200?random=1"
        },
        {
            productId: 2,
            name: 'Jeans',
            size: "L",
            color: "Blue",
            quantity: 2,
            price: 49.99,
            image: " https://picsum.photos/200?random=2"
        }
    ]
  return (
      <div>
         { cartProducts.map((product, index) =>  (
              <div key={index} className='flex items-start justify-between py-4 border-b'>
                  <div className='flex items-center'>
                     <img src={product.image} alt={product.name} className='w-20 h-24 object-cover mr-4 rounded' />
                     <div>
                         <h3>{product.name}</h3>
                         <p className='text-sm text-gray-500'>
                             size: {product.size} | color: {product.color}
                         </p>
                         <div className='flex items-center mt-2'>
                             <butto className="border rounded px-2 py-1 text-xl font-medium">-</butto>
                             <span className='mx-2'>{ product.quantity}</span>
                             <button className="border rounded px-2 py-1 text-xl font-medium">+</button>
                             
                         </div>
                     </div>
                  </div>
                  <div>
                     <p className='font-mediem'>$ {product.price.toLocaleString()}</p>
                     <button>
                         <RiDeleteBin3Line className='h-6 w-6 text-red-500' />
                     </button>
                  </div>
              </div>
          ))}
      </div>
  )
}

export default CartContents