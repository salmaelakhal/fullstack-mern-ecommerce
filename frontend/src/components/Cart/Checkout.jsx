import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import PayPalButton from './PayPalButton';


 const cart = {
        products: [
            {
                name: "Stylish Jacket",
                size: "M",
                color: "Black",
                price: 59.99,
                image: "https://picsum.photos/200?random=1",
            },
            {
                name: "Running Shoes",
                size: "10",
                color: "Blue",
                price: 89.99,
                image: "https://picsum.photos/200?random=2",
            },
        ],
        totalPrice: 149.98,
}
    


function Checkout() {
    
    const navigate = useNavigate();
    const [checkoutId, setCheckoutId] = useState(null);
    const [shippingAddress, setShippingAddress] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
        phone: "",
    });


    const handleCreateCheckout = (e) => {
        e.preventDefault();
        setCheckoutId(123);
    }

    const handlePaymentSuccess = (details) => {
        console.log("Payment Successful", details);
        
        navigate('/order-confirmation');
    }

  return (
      <div className="grid grid-col-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tight">
          {/* Left Section  */}
          <div className="bg-white rounded-lg p-6">
              <h2 className="text-2xl uppercase mb-6">
                  Checkout
              </h2>
              <form onSubmit={handleCreateCheckout} action="">
                  <h3 className="text-lg mb-4">
                      Contact Details
                  </h3>
                  <div className="mb-4">
                      <label htmlFor="email" className="block text-gray-700">Email Address</label>
                      <input
                          type="email"
                          id="email"
                          value={shippingAddress.email}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, email: e.target.value })}
                          className="w-full p-2 border rounded "
                          disabled
                      />
                    </div>
                      <h3 className="text-lg mb-4">
                          Delivery
                      </h3>
                      <div className="mb-4 grid grid-cols-2 gap-4">
                          <div className="">
                              <label className="block text-gray-700">First Name</label>
                              <input
                                  value={shippingAddress.firstName}
                                  onChange={(e) =>
                                      setShippingAddress({
                                          ...shippingAddress,
                                          firstName: e.target.value
                                      })}
                                  type="text"
                                  className="w-full p-2 border rounded"
                                  required />
                          </div>
                          {/* /* Last Name */}
                          
                            <div className="">
                              <label className="block text-gray-700">Last Name</label>
                              <input
                                  value={shippingAddress.lastName}
                                  onChange={(e) =>
                                      setShippingAddress({
                                          ...shippingAddress,
                                          lastName: e.target.value
                                      })}
                                  type="text"
                                  className="w-full p-2 border rounded"
                                  required />
                          </div>
                      </div>
                      <div className="mb-4">
                          <label className="block text-gray-700">Address</label>
                          <input
                              value={shippingAddress.address}
                              onChange={(e) =>
                                  setShippingAddress({
                                      ...shippingAddress,
                                      address: e.target.value
                                  })}
                              type="text"
                              className="w-full p-2 border rounded"
                              required
                          />
                      </div>
                      <div className="mb-4 grid grid-cols-2 gap-4">
                            <div className="">
                                <label className="block text-gray-700">City</label>
                                <input
                                    value={shippingAddress.city}
                                    onChange={(e) =>
                                        setShippingAddress({
                                            ...shippingAddress,
                                            city: e.target.value
                                        })}
                                    type="text"
                                    className="w-full p-2 border rounded"
                                    required />
                            </div>
                            <div className="">
                                <label className="block text-gray-700">Postal Code</label>
                                <input
                                    value={shippingAddress.postalCode}
                                    onChange={(e) =>
                                        setShippingAddress({
                                            ...shippingAddress,
                                            postalCode: e.target.value
                                        })}
                                    type="text"
                                    className="w-full p-2 border rounded"
                                    required />
                            </div>
                      </div>
                        <div className="mb-4">
                          <label className="block text-gray-700">Country</label>
                          <input
                              value={shippingAddress.country}
                              onChange={(e) =>
                                  setShippingAddress({
                                      ...shippingAddress,
                                      country: e.target.value
                                  })}
                              type="text"
                              className="w-full p-2 border rounded"
                              required
                          />
                      </div>
                      
                        <div className="mb-4">
                          <label className="block text-gray-700">Phone Number</label>
                          <input
                              value={shippingAddress.phone}
                              onChange={(e) =>
                                  setShippingAddress({
                                      ...shippingAddress,
                                      phone: e.target.value
                                  })}
                              type="text"
                              className="w-full p-2 border rounded"
                              required
                          />
                  </div>
                  <div className="mb-6">
                      {!checkoutId ? (
                          <button type="submit" className='w-full bg-black text-white py-3 rounded'>
                              Continue to Payment
                          </button>
                      ) : (
                              <div className="">
                                  <h3 className="text-lg mb-4">
                                      Pay with Paypal
                                  </h3>
                                  {/* Paypal Component */}
                                  <PayPalButton
                                      amount={100}
                                      onSuccess={handlePaymentSuccess}
                                      onError={(err) => alert("Payment failed, Try again")} />
                              </div>
                      )}
                 </div>
              </form>

          </div>
          
    </div>
  )
}

export default Checkout