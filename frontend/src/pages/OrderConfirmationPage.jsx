import React from 'react'


const checkout = {
    _id: '123',
    createdAt: new Date(),
    checkoutItems: [
        {
            productId: '1',
            name: 'Product 1',
            color: 'Red',
            size: 'M',
            price: 100,
            quantity: 2,
            images: 'https://picsum.photos/200?random=1',
        },
        {
            productId: '2',
            name: 'Product 2',
            color: 'Blue',
            size: 'L',
            price: 150,
            quantity: 1,
            images: 'https://picsum.photos/200?random=2',
        }
    ],
    shippingAddress: {
        address: '123 Main St',
        city: 'Anytown',
        country: 'USA'
    },
}


const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10); // Add 10 day to the order date
    return orderDate.toLocaleDateString();
}

function OrderConfirmationPage() {
  return (
      <div className='max-w-4xl mx-auto p-6 bg-white'>
          <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
              Thank You for Your Order!
          </h1>

          {checkout &&
              <div className="p-6 rounded-lg border">
                  <div className="flex justify-between mb-20">
                      {/* Order Id and Date  */}
                      <div className="">
                          <h2 className="text-xl font-semibold">
                              Order ID {checkout._id}
                          </h2>
                            <p className="text-gray-500">
                                Order date {new Date(checkout.createdAt).toLocaleDateString()}
                            </p>
                      </div>
                      {/* Estimated Delivery  */}
                      <div className="">
                          <p className="text-emeraled-700 text-sm">
                                Estimated Delivery: {calculateEstimatedDelivery(checkout.createdAt)}
                          </p>
                      </div>
                  </div>
                  {/* Ordered Items */}
                  <div className="mb-20">
                      {checkout.checkoutItems.map((item) => (
                            <div key={item.productId} className="flex items-center mb-4">
                                <img src={item.images} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                                <div className="flex-grow">
                                    <h4 className="text-md font-semibold">{item.name}</h4>
                                    <p className="text-sm text-gray-500">{item.color} |   {item.size}</p>
                              </div>
                              <div className="ml-auto text-right">
                                  <p className="text-md ">${item.price}</p>
                                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                              </div>
                            </div>
                      ))
                      }
                  </div>
                  {/* Payement and Delivery Information  */}
                  <div className="grid grid-cols-2 gap-8">
                      {/* Payment Info  */}
                      <div className="">
                          <h4 className="text-lg font-semibold mb-2">Payment</h4>
                          <p className="text-gray-600">Paypal</p>
                      </div>

                      {/* Delivery Info  */}
                      <div className="">
                          <h4 className="text-lg font-semibold mb-2">Delivery</h4>
                          <p className="text-gray-600">
                              {checkout.shippingAddress.address}
                          </p>
                          <p className="text-gray-600">
                          {checkout.shippingAddress.city}, {" "}
                          {checkout.shippingAddress.country}
                          </p>
                          </div>
                  </div>
          </div>
              
          }
          
    </div>
  )
}

export default OrderConfirmationPage