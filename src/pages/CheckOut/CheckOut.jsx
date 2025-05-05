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

  const amount = 5; // Fixed price
  const [paymentStatus, setPaymentStatus] = useState("");

  const handlePayment = async () => {
    try {
      const paymentData = {
        userEmail: user.email,
        biodataId: biodata._id,
        amount,
        status: "pending",
      };

      const res = await fetch("https://knot-nest-server.vercel.app/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });

      if (res.ok) {
        setPaymentStatus("✅ Payment is pending. Please wait for admin approval.");
      } else {
        setPaymentStatus("❌ Error during payment. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      setPaymentStatus("❌ Error during payment. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-pink-600 mb-6">Secure Checkout</h2>

      {biodata && (
        <div className="bg-gradient-to-br from-white via-pink-50 to-yellow-50 border rounded-3xl shadow-lg p-6 mb-6">
          <h3 className="text-2xl font-semibold text-gray-800">{biodata.name}</h3>
          <p className="text-gray-600">Biodata Type: {biodata.biodataType}</p>
          <p className="text-gray-600">Occupation: {biodata.occupation}</p>
          <p className="text-gray-600">Location: {biodata.permanentDivision}</p>
          <p className="text-gray-600">Age: {biodata.age} years</p>
          <p className="mt-2 font-bold text-green-600">Access Price: ${amount}</p>
        </div>
      )}

      <button
        onClick={handlePayment}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-md transition-transform transform hover:scale-105 duration-200"
      >
        Pay ${amount}
      </button>

      {paymentStatus && (
        <div
          className={`mt-4 px-4 py-2 rounded-lg font-medium ${
            paymentStatus.includes("✅")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {paymentStatus}
        </div>
      )}

      <div className="mt-6">
        <Link
          to="/"
          className="inline-block px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-full font-medium transition"
        >
          Cancel
        </Link>
      </div>
    </div>
  );
};

export default Checkout;
