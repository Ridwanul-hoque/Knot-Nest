import React from 'react';

const BioCard = ({ item }) => {
    const { name, biodataType, profileImage, occupation, age } = item;
    return (
        <div className="flex items-center space-x-4 bg-white shadow-xl rounded-2xl p-4 border border-yellow-100 hover:scale-[1.02] transition-transform duration-300 hover:shadow-pink-300/50">
            <div className="w-[100px] h-[100px] rounded-full overflow-hidden border-4 border-yellow-400 shadow-md">
                <img className="w-full h-full object-cover" src={profileImage} alt={name} />
            </div>
            <div className="flex-1">
                <h3 className="text-xl font-bold uppercase text-yellow-600">{name}</h3>
                <p className="text-gray-700">Age: <span className="font-medium">{age}</span></p>
                <p className="text-gray-700">Gender: <span className="text-yellow-500">{biodataType}</span></p>
                <p className="text-gray-700">Profession: <span className="text-yellow-500">{occupation}</span></p>
            </div>
        </div>
    );
};

export default BioCard;
