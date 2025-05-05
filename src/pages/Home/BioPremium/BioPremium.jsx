import React, { useEffect, useState } from 'react';
import BioCard from '../../Shared/BioCard/BioCard';
import Review from '../../Shared/Review/Review';
import { Link } from 'react-router-dom';

const BioPremium = () => {
    const [Bios, setBios] = useState([]);

    useEffect(() => {
        fetch('https://knot-nest-server.vercel.app/Bio')
            .then(res => res.json())
            .then(data => {
                const premiumBio = data.filter(item => item.role === 'premium');
                setBios(premiumBio);
            })
            .catch((error) => console.error('Error fetching bios:', error));
    }, []);

    return (
        <div className="bg-gradient-to-br from-pink-100 via-yellow-100 to-pink-100 my-8 p-8 rounded-2xl shadow-xl">
            <h2 className="text-yellow-500 text-4xl font-bold text-center mb-10 drop-shadow-sm">✨ Premium Bios ✨</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {Bios.map(item => (
                    <BioCard key={item._id} item={item} />
                ))}
            </div>

            <div className="flex justify-center mt-10">
                <Link
                    to={"/BioData"}
                    className="relative inline-block px-8 py-3 bg-yellow-500 text-white font-bold rounded-full overflow-hidden shadow-lg transition duration-300 hover:bg-white hover:text-yellow-500 border-2 border-yellow-500 group"
                >
                    <span className="absolute inset-0 w-full h-full bg-yellow-100 opacity-0 group-hover:opacity-100 transition duration-300"></span>
                    <span className="relative z-10">View All BioData's</span>
                </Link>
            </div>
        </div>
    );
};

export default BioPremium;
