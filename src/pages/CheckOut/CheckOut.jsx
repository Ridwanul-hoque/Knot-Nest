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
import React, { useState } from "react";
import { useLoaderData, Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const Checkout = () => {
  const biodata = useLoaderData();
  const { user } = useAuth();
  const navigate = useNavigate();

  const amount = 5; // Fixed price in dollars
  const [paymentStatus, setPaymentStatus] = useState("");

  const handlePayment = async () => {
    try {
      // POST request to store payment in the backend
      const paymentData = {
        userEmail: user.email,
        biodataId: biodata._id,
        amount: amount,
        status: "pending", // Payment status initially set to "pending"
      };

      const response = await fetch("http://localhost:5000/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      if (response.ok) {
        setPaymentStatus("Payment is pending. Please wait for admin approval.");
      } else {
        setPaymentStatus("Error during payment. Please try again.");
      }
    } catch (error) {
      console.error("Error during payment:", error);
      setPaymentStatus("Error during payment. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      {biodata && (
        <div className="border p-4 rounded-lg mb-6">
          <h3 className="text-xl font-semibold">{biodata.name}</h3>
          <p>Biodata Type: {biodata.biodataType}</p>
          <p>Occupation: {biodata.occupation}</p>
          <p>Permanent Division: {biodata.permanentDivision}</p>
          <p>Age: {biodata.age} years old</p>
          <p>Price: ${amount}</p>
        </div>
      )}

      {/* Payment Button */}
      <button
        onClick={handlePayment}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Pay ${amount}
      </button>

      {paymentStatus && <p className="mt-4">{paymentStatus}</p>}

      <div className="flex gap-4 mt-4">
        <Link
          to="/"
          className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
        >
          Cancel
        </Link>
      </div>
    </div>
  );
};

export default Checkout;
