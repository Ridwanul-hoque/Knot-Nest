import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";


const BioDetails = () => {
  const bio = useLoaderData();
  const { user } = useAuth(); // Access user from AuthContext
  const [isPremium, setIsPremium] = useState(false);

  const {
    _id,
    name,
    biodataType,
    profileImage,
    permanentDivision,
    age,
    occupation,
    email,
    phone,
  } = bio;

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/isPremium/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setIsPremium(data.isPremium); // Update isPremium state
        });
    }
  }, [user?.email]);

  const handleAddToFavorites = () => {
    fetch(`http://localhost:5000/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
      body: JSON.stringify({
        biodataId: bio._id,
        user: user?.email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          alert("Added to favorites successfully!");
        }
      });
  };

  

  return (
    <div className="p-4">
      <div className="flex items-center gap-4">
        <img src={profileImage} alt={name} className="w-24 h-24 rounded-full" />
        <div>
          <h2 className="text-2xl font-semibold">{name}</h2>
          <p>{biodataType}</p>
          <p>{occupation}</p>
          <p>{permanentDivision}</p>
          <p>{age} years old</p>
        </div>
      </div>

      <div className="mt-4">
        {isPremium ? (
          <>
            <p>
              <strong>Email:</strong> {email}
            </p>
            <p>
              <strong>Phone:</strong> {phone}
            </p>
          </>
        ) : (
          <p className="text-gray-600">
            Contact information is visible to premium members only.
          </p>
        )}
      </div>

      <div className="mt-4 flex gap-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={handleAddToFavorites}
        >
          Add to Favorites
        </button>

        {!user?.isPremium && (
            <Link
              to={`/checkout/${_id}`}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Request Contact Information
            </Link>
          )}
      </div>
    </div>
  );
};

export default BioDetails;
