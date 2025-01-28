import React from "react";
import { useLoaderData, Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";


const Checkout = () => {
  const biodata = useLoaderData();
  const { user } = useAuth(); 
  const navigate = useNavigate();

  const handleCheckout = () => {
    const paymentInfo = {
      biodataId: biodata._id,
      userEmail: user.email,
      amount: biodata.price || 0,
      status: "pending",
    };

    fetch("http://localhost:5000/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
      body: JSON.stringify(paymentInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          alert("Payment request submitted successfully!");
          navigate("/"); // Redirect to a thank-you page
        }
      });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      {biodata && (
        <div className="border p-4 rounded-lg">
          <h3 className="text-xl font-semibold">{biodata.name}</h3>
          <p>Biodata Type: {biodata.biodataType}</p>
          <p>Occupation: {biodata.occupation}</p>
          <p>Permanent Division: {biodata.permanentDivision}</p>
          <p>Age: {biodata.age} years old</p>
          <p>Price: ${biodata.price}</p>
        </div>
      )}
      <div className="flex gap-4 mt-4">
        <button
          onClick={handleCheckout}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg"
        >
          Confirm Payment
        </button>
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
