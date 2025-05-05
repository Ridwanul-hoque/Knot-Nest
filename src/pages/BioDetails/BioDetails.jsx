import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { FaEnvelope, FaPhone, FaHeart } from "react-icons/fa";

const BioDetails = () => {
    const bio = useLoaderData();
    const { user } = useAuth();
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
            fetch(`https://knot-nest-server.vercel.app/isPremium/${user.email}`)
                .then((res) => res.json())
                .then((data) => setIsPremium(data.isPremium));
        }
    }, [user?.email]);

    const handleAddToFavorites = () => {
        fetch(`https://knot-nest-server.vercel.app/add-favorite`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
            body: JSON.stringify({
                biodataId: bio._id,
                userEmail: user?.email,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    alert("Added to favorites successfully!");
                } else {
                    alert("This biodata is already in your favorites.");
                }
            });
    };

    return (
        <div className="max-w-3xl mx-auto px-6 py-8">
            <div className="bg-gradient-to-br from-white via-pink-50 to-yellow-50 shadow-xl rounded-3xl p-6 space-y-6">
                {/* Profile Header */}
                <div className="flex items-center gap-6">
                    <img
                        src={profileImage}
                        alt={name}
                        className="w-28 h-28 rounded-full object-cover shadow-md"
                    />
                    <div className="text-gray-800 space-y-1">
                        <h2 className="text-3xl font-bold">{name}</h2>
                        <p className="text-sm text-pink-600 font-medium">{biodataType}</p>
                        <p className="text-sm">{occupation}</p>
                        <p className="text-sm">{permanentDivision}</p>
                        <p className="text-sm">{age} years old</p>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="mt-4">
                    {isPremium ? (
                        <div className="space-y-2 text-gray-700">
                            <p className="flex items-center gap-2">
                                <FaEnvelope className="text-pink-500" />
                                <span>{email}</span>
                            </p>
                            <p className="flex items-center gap-2">
                                <FaPhone className="text-pink-500" />
                                <span>{phone}</span>
                            </p>
                        </div>
                    ) : (
                        <p className="text-gray-500 italic">
                            Contact information is available to <strong>premium members</strong> only.
                        </p>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-wrap gap-4">
                    <button
                        className="flex items-center gap-2 px-5 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full font-semibold shadow-md transition-transform transform hover:scale-105"
                        onClick={handleAddToFavorites}
                    >
                        <FaHeart /> Add to Favorites
                    </button>

                    {!isPremium && (
                        <Link
                            to={`/checkout/${_id}`}
                            className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold shadow-md transition-transform transform hover:scale-105"
                        >
                            Request Contact Information
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BioDetails;
