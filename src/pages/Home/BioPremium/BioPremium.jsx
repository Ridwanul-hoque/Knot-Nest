import React, { useEffect, useState } from 'react';
import BioCard from '../../Shared/BioCard/BioCard';

const BioPremium = () => {
    const [Bios, setBios] = useState([])
    // const premium = Bio.filter(item => item.role === 'premium')

    useEffect(() => {
        fetch('http://localhost:5000/Bio')
            .then(res => res.json())
            .then(data => {
                const premiumBio = data.filter(item => item.role === 'premium');

                setBios(premiumBio)
            })
    }, [])
    return (
        <div className='mb-12'>
            <h2>Premium Bios</h2>
            <div className='grid md:grid-cols-3 gap-8'>
                {
                    Bios.map(item => <BioCard key={item._id} item={item}></BioCard>)
                }
            </div>
            <div className="flex justify-center mt-6">
                <button className="btn btn-outline border-0 border-b-4 border-white text-white">
                    View All BioData's
                </button>
            </div>
        </div>
    );
};

export default BioPremium;