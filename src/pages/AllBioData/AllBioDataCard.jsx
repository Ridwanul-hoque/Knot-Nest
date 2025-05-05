import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

const AllBioDataCard = ({ bio }) => {
    const { _id, name, biodataType, profileImage, permanentDivision, age, occupation } = bio;

    return (
        <div className="relative bg-gradient-to-br from-white via-pink-50 to-yellow-50 shadow-lg rounded-3xl overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-2xl group">
            <div className="relative">
                <img
                    src={profileImage}
                    alt={name}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-white bg-opacity-90 p-2 rounded-full shadow-md hover:bg-pink-200 transition duration-300">
                    <FaHeart className="text-pink-500" />
                </div>
            </div>
            <div className="p-6 text-gray-800 space-y-3">
                <h2 className="text-2xl font-bold">{name}</h2>
                <p className="text-sm">Age: <span className="font-medium">{age}</span></p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <p>Gender: <span className="font-semibold text-gray-800">{biodataType}</span></p>
                    <p>Profession: <span className="font-semibold text-gray-800">{occupation}</span></p>
                </div>
                <div className="border-t border-gray-200 my-3"></div>
                <p className="text-sm">Address: <span className="font-medium">{permanentDivision}</span></p>

                <div className="flex justify-between items-center pt-4">
                    <Link to={`/BioData/${_id}`}>
                        <button className="px-5 py-2 bg-pink-500 text-white rounded-full font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-yellow-500 hover:shadow-lg">
                            View Details
                        </button>
                    </Link>
                    <p className="text-sm text-gray-500 italic hidden group-hover:block transition duration-300">
                        More Info Below
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AllBioDataCard;
