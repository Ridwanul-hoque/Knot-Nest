// import React, { useState } from "react";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// const CheckoutForm = ({ user, biodata, amount, navigate }) => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const [error, setError] = useState("");
//     const [processing, setProcessing] = useState(false);
//     const [success, setSuccess] = useState(false);

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         setProcessing(true);

//         if (!stripe || !elements) return;

//         const card = elements.getElement(CardElement);

//         // Create payment intent on the server
//         const response = await fetch("https://knot-nest-server.vercel.app/create-payment-intent", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${localStorage.getItem("access-token")}`,
//             },
//             body: JSON.stringify({ price: amount }), // Sending the amount (5 dollars)
//         });
//         const { clientSecret } = await response.json();

//         // Confirm card payment
//         const { error, paymentIntent } = await stripe.confirmCardPayment(
//             clientSecret,
//             {
//                 payment_method: {
//                     card: card,
//                     billing_details: {
//                         name: user?.displayName || "Anonymous",
//                         email: user?.email || "No Email",
//                     },
//                 },
//             }
//         );

//         if (error) {
//             setError(error.message);
//             setProcessing(false);
//         } else if (paymentIntent.status === "succeeded") {
//             setSuccess(true);

//             // Save payment info to the server
//             const paymentInfo = {
//                 biodataId: biodata._id,
//                 userEmail: user.email,
//                 amount,
//                 transactionId: paymentIntent.id,
//                 status: "approved",
//             };

//             // Sending payment info to the backend
//             fetch("https://knot-nest-server.vercel.app/payment", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${localStorage.getItem("access-token")}`,
//                 },
//                 body: JSON.stringify(paymentInfo),
//             })
//                 .then((res) => res.json())
//                 .then((data) => {
//                     if (data.insertedId) {
//                         alert("Payment successful!");
//                         navigate("/"); // Redirect to a thank-you page
//                     }
//                 });
//         }

//         setProcessing(false);
//     };

//     return (
//         <form onSubmit={handleSubmit} className="space-y-4">
//             <CardElement
//                 options={{
//                     style: {
//                         base: {
//                             fontSize: "16px",
//                             color: "#424770",
//                             "::placeholder": {
//                                 color: "#aab7c4",
//                             },
//                         },
//                         invalid: {
//                             color: "#9e2146",
//                         },
//                     },
//                 }}
//             />
//             {error && <p className="text-red-500">{error}</p>}
//             {success && <p className="text-green-500">Payment successful!</p>}
//             <button
//                 type="submit"
//                 disabled={!stripe || processing}
//                 className={`px-6 py-2 bg-blue-500 text-white rounded-lg ${processing ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
//                     }`}
//             >
//                 {processing ? "Processing..." : "Pay Now"}
//             </button>
//         </form>
//     );
// };

// export default CheckoutForm;



import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { CreditCard, Lock, Loader2 } from "lucide-react";

const CheckoutForm = ({ biodata, user, amount, onPaymentSuccess, onPaymentError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        padding: '12px',
      },
      invalid: {
        color: '#9e2146',
      },
    },
    hidePostalCode: false,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      onPaymentError("❌ Stripe is not loaded yet. Please try again.");
      return;
    }

    setProcessing(true);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      onPaymentError("❌ Card element not found. Please refresh and try again.");
      setProcessing(false);
      return;
    }

    // Create payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        email: user.email,
        name: user.name,
      },
    });

    if (error) {
      console.log('[error]', error);
      onPaymentError(`❌ ${error.message}`);
      setProcessing(false);
      return;
    }

    // For demo purposes, we'll simulate a successful payment
    // In a real implementation, you'd create a payment intent on your server
    // and confirm it here
    
    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Save payment to your existing database structure
      const paymentData = {
        userEmail: user.email,
        biodataId: biodata._id,
        amount,
        status: "pending",
        stripePaymentMethodId: paymentMethod.id,
      };

      const res = await fetch("https://knot-nest-server.vercel.app/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });

      if (res.ok) {
        onPaymentSuccess("✅ Payment processed successfully! Please wait for admin approval.");
        // Clear the card element
        cardElement.clear();
      } else {
        onPaymentError("❌ Error processing payment. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      onPaymentError("❌ Error processing payment. Please try again.");
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center mb-4">
          <CreditCard className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">Payment Information</h3>
        </div>
        
        <div className="border border-gray-300 rounded-lg p-4 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-colors min-h-[50px]">
          <CardElement 
            options={cardElementOptions}
            onReady={() => {
              console.log("CardElement [ready]");
            }}
            onChange={(event) => {
              console.log("CardElement [change]", event);
            }}
            onFocus={() => {
              console.log("CardElement [focus]");
            }}
            onBlur={() => {
              console.log("CardElement [blur]");
            }}
          />
        </div>
        
        <div className="flex items-center mt-3 text-sm text-gray-600">
          <Lock className="w-4 h-4 mr-1" />
          <span>Your payment information is secure and encrypted</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || processing}
        className={`w-full py-3 px-6 rounded-full font-semibold text-white transition-all duration-200 flex items-center justify-center ${
          processing
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 hover:scale-105 shadow-md'
        }`}
      >
        {processing ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Processing Payment...
          </>
        ) : (
          `Pay $${amount}`
        )}
      </button>
    </form>
  );
};

export default CheckoutForm;