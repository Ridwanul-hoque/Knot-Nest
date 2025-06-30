// import React from "react";
// import { useLoaderData, Link, useNavigate } from "react-router-dom";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import useAuth from "../../Hooks/useAuth";
// import CheckoutForm from "./CheckoutForm";

// // Load Stripe with your publishable key
// const stripePromise = loadStripe("your-publishable-key-from-stripe");

// const Checkout = () => {
//   const biodata = useLoaderData(); // Fetch biodata using the loader
//   const { user } = useAuth(); // Access user from AuthContext
//   const navigate = useNavigate();

//   const amount = 5; // Fixed price for the biodata (in dollars)

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Checkout</h2>
//       {biodata && (
//         <div className="border p-4 rounded-lg mb-6">
//           <h3 className="text-xl font-semibold">{biodata.name}</h3>
//           <p>Biodata Type: {biodata.biodataType}</p>
//           <p>Occupation: {biodata.occupation}</p>
//           <p>Permanent Division: {biodata.permanentDivision}</p>
//           <p>Age: {biodata.age} years old</p>
//           <p>Price: ${amount}</p>
//         </div>
//       )}

//       {/* Stripe Payment Form */}
//       <Elements stripe={stripePromise}>
//         <CheckoutForm
//           user={user}
//           biodata={biodata}
//           amount={amount} // passing the amount to CheckoutForm
//           navigate={navigate}
//         />
//       </Elements>

//       <div className="flex gap-4 mt-4">
//         <Link
//           to="/"
//           className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
//         >
//           Cancel
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Checkout;
// import React, { useState } from "react";
// import { useLoaderData, Link, useNavigate } from "react-router-dom";
// import useAuth from "../../Hooks/useAuth";

// const Checkout = () => {
//   const biodata = useLoaderData();
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const amount = 5; // Fixed price
//   const [paymentStatus, setPaymentStatus] = useState("");

//   const handlePayment = async () => {
//     try {
//       const paymentData = {
//         userEmail: user.email,
//         biodataId: biodata._id,
//         amount,
//         status: "pending",
//       };

//       const res = await fetch("https://knot-nest-server.vercel.app/payment", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(paymentData),
//       });

//       if (res.ok) {
//         setPaymentStatus("✅ Payment is pending. Please wait for admin approval.");
//       } else {
//         setPaymentStatus("❌ Error during payment. Please try again.");
//       }
//     } catch (err) {
//       console.error("Error:", err);
//       setPaymentStatus("❌ Error during payment. Please try again.");
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto px-6 py-10">
//       <h2 className="text-3xl font-bold text-pink-600 mb-6">Secure Checkout</h2>

//       {biodata && (
//         <div className="bg-gradient-to-br from-white via-pink-50 to-yellow-50 border rounded-3xl shadow-lg p-6 mb-6">
//           <h3 className="text-2xl font-semibold text-gray-800">{biodata.name}</h3>
//           <p className="text-gray-600">Biodata Type: {biodata.biodataType}</p>
//           <p className="text-gray-600">Occupation: {biodata.occupation}</p>
//           <p className="text-gray-600">Location: {biodata.permanentDivision}</p>
//           <p className="text-gray-600">Age: {biodata.age} years</p>
//           <p className="mt-2 font-bold text-green-600">Access Price: ${amount}</p>
//         </div>
//       )}

//       <button
//         onClick={handlePayment}
//         className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-md transition-transform transform hover:scale-105 duration-200"
//       >
//         Pay ${amount}
//       </button>

//       {paymentStatus && (
//         <div
//           className={`mt-4 px-4 py-2 rounded-lg font-medium ${
//             paymentStatus.includes("✅")
//               ? "bg-green-100 text-green-700"
//               : "bg-red-100 text-red-700"
//           }`}
//         >
//           {paymentStatus}
//         </div>
//       )}

//       <div className="mt-6">
//         <Link
//           to="/"
//           className="inline-block px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-full font-medium transition"
//         >
//           Cancel
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Checkout;


import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import useAuth from "../../Hooks/useAuth";
import { useLoaderData } from "react-router-dom";

// Load Stripe with error handling
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);

const Checkout = () => {
  const biodata = useLoaderData();
  const { user } = useAuth();
  const amount = 5; // Fixed price
  const [paymentStatus, setPaymentStatus] = useState("");

  const handlePaymentSuccess = (message) => {
    setPaymentStatus(message);
  };

  const handlePaymentError = (message) => {
    setPaymentStatus(message);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  // Debug: Check if Stripe key is loaded
  React.useEffect(() => {
    console.log("Stripe Key:", import.meta.env.VITE_PAYMENT_PK);
    stripePromise.then(stripe => {
      console.log("Stripe loaded:", !!stripe);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleGoBack}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Secure Checkout</h1>
          <p className="text-gray-600">Complete your payment to access contact information</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Summary</h2>
              
              {biodata && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    {biodata.profileImage && (
                      <img
                        src={biodata.profileImage}
                        alt={biodata.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{biodata.name}</h3>
                      <p className="text-gray-600">{biodata.biodataType}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                    <div>
                      <p className="text-sm text-gray-500">Occupation</p>
                      <p className="font-medium">{biodata.occupation}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{biodata.permanentDivision}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Age</p>
                      <p className="font-medium">{biodata.age} years</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Access Price</p>
                      <p className="font-bold text-green-600 text-lg">${amount}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Security Info */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200">
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Secure Payment</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      256-bit SSL encryption
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      PCI DSS compliant
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Money-back guarantee
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="space-y-6">
            <Elements 
              stripe={stripePromise}
              options={{
                appearance: {
                  theme: 'stripe',
                  variables: {
                    colorPrimary: '#2563eb',
                  }
                }
              }}
            >
              <CheckoutForm
                biodata={biodata}
                user={user}
                amount={amount}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentError={handlePaymentError}
              />
            </Elements>

            {/* Payment Status */}
            {paymentStatus && (
              <div
                className={`p-4 rounded-lg font-medium transition-all duration-300 ${
                  paymentStatus.includes("✅")
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-red-100 text-red-700 border border-red-200"
                }`}
              >
                {paymentStatus}
              </div>
            )}

            {/* Test Card Info */}
            {/* <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">Test Mode</h4>
              <p className="text-sm text-yellow-700 mb-2">Use these test card details:</p>
              <div className="text-sm text-yellow-700 font-mono">
                <p>Card Number: 4242 4242 4242 4242</p>
                <p>Expiry: Any future date</p>
                <p>CVC: Any 3 digits</p>
                <p>ZIP: Any 5 digits</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;