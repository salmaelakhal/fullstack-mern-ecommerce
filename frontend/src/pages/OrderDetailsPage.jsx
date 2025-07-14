import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

function OrderDetailsPage() {

  const { id } = useParams(); // Assuming you are using react-router to get the order ID from the URL
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const mockOrderDetails = {
      _id: id,
      createdAt: new Date(),
      isPaid: true, 
      isDelivered: false,
      paymentMethod: 'PayPal',
      shippingMethod: 'Standard',
      shippingAddress: { city: 'Anytown', country: 'USA' },
      orderItems: [
        {
          productId: '1',
          name: 'Product 1',
          price: 100,
          quantity: 2,
          images: 'https://picsum.photos/200?random=1',
        },
        {
          productId: '2',
          name: 'Product 2',
          price: 150,
          quantity: 1,
          images: 'https://picsum.photos/200?random=2',
        }
      ],
    };
    setOrderDetails(mockOrderDetails);

  }, [id]);


  return (
    <div className='max-w-7xl mx-auto p-4 sm:p-6 '>
      <h2 className="text-2xl ms:text-3xl font-bold mb-6">Order Details</h2>
      {!orderDetails ? (
        <p>No Order details found</p>
      ) : (
        <div className="p-4 sm:p-6 rounded-lg border">
          {/* Order Details */}
          <div className="flex flex-col sm:flex-row justify-between mb-8">
            <div>
              <h3 className="text-lg md:text-xl font-semibold">
                Order ID: #{orderDetails._id}
              </h3>
              <p className="text-gray-600">
                {new Date(orderDetails.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0">
           <span
            className={`px-3 py-1 rounded-full text-sm font-medium mb-2
              ${orderDetails.isPaid
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'}`}
          >
            {orderDetails.isPaid ? 'Approved' : 'Pending'}
                </span>
                
             <span
            className={`px-3 py-1 rounded-full text-sm font-medium mb-2
              ${orderDetails.isDelivered
                ? 'bg-green-100 text-green-700'
                : 'bg-yellow-100 text-yellow-700'}`}
          >
            {orderDetails.isDelivered ? 'Delivered' : 'Pending Delivery'}
          </span>


            </div>

          </div>

              {/* Custom, Payement, Shipping Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-9">
                <div>
                  <h4 className="text-lg font-semibold mb-2">Payment Info</h4>
                  <p>Payment Method: {orderDetails.paymentMethod}</p>
                  <p>Status: {orderDetails.isPaid ? 'Paid' : 'Pending'}</p>
              </div>
              
               <div>
                  <h4 className="text-lg font-semibold mb-2">Shipping Info</h4>
                  <p>Shipping Method: {orderDetails.shippingMethod}</p>
                  <p>adress: {`${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.country}`}</p>
                </div>
            </div>
            
            {/* Product List  */}
            <div className="overflow-x-auto">
              <h4 className="text-lg font-semibold mb-4">Products</h4>
              <table className="min-w-full text-gray-600 mb-4">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Unity Price</th>
                    <th className="px-4 py-2">Quantity</th>
                    <th className="px-4 py-2">Total</th>
                  </tr>
                </thead>
                <tbody className=''>
                  {orderDetails.orderItems.map((item) => (
                    <tr key={item.productId} className='border-b border-gray-300'>
                      <td className="px-4 py-2 flex items-center">
                        <img src={item.images} alt={item.name} className="w-12 h-12 object-cover rounded-lg mr-4"
                        />
                        <Link to={`/product/${item.productId}`} className="text-blue-500 hover:underline"
                        > 
                          {item.name}
                        </Link>
                      </td>
                      <td className="px-4 py-2">${item.price}</td>
                      <td className="px-4 py-2">{item.quantity}</td>
                      <td className="px-4 py-2">${item.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Back to Orders Link  */}
            <Link to='/my-orders' className="text-blue-500 hover:underline">
              Back To My Orders
            </Link>
        </div>

      )
      }

    </div>
  )
}

export default OrderDetailsPage
  