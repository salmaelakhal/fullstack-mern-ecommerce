import React from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


function PayPalButton({ amount, onSuccess, onError }) {

 
    
  return (
    <PayPalScriptProvider options={{ "client-id": 'AZTc-AEkZiJTsHzZieMJCSWAOmwtikAHJIswRLec12102Y92TBwUFMxNDziRwNxhOdZuK-iUOHRYJfBw' }}>
          <PayPalButtons
              style={{layout: 'vertical'}}
              createOrder={(data, actions) => {
                  return actions.order.create({
                      purchase_units: [{ amount: { value: amount } }]
                  });
              }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then(onSuccess)
                }}
                onError={onError}
            />
        </PayPalScriptProvider>
  )
}

export default PayPalButton