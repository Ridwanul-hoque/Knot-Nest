import React, { useEffect, useState } from 'react';
import BioCard from '../../Shared/BioCard/BioCard';
import Review from '../../Shared/Review/Review';
import { Link } from 'react-router-dom';

const BioPremium = () => {
  const [Bios, setBios] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/Bio')
      .then(res => res.json())
      .then(data => {
        const premiumBio = data.filter(item => item.role === 'premium');
        setBios(premiumBio);
      })
      .catch((error) => console.error('Error fetching bios:', error));
  }, []);

  return (
    <div className="mb-12 p-6 bg-gray-50">
      <h2 className="text-yellow-500 text-3xl font-semibold text-center mb-8">Premium Bios</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Bios.map(item => (
          <BioCard key={item._id} item={item} />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Link to={"/BioData"} className="px-6 py-2 bg-yellow-500 text-white font-semibold rounded-lg border-2 border-yellow-500 transform transition duration-300 hover:bg-transparent hover:text-yellow-500 hover:border-yellow-500">
          View All BioData's
        </Link>
      </div>
    </div>
  );
};

export default BioPremium;
