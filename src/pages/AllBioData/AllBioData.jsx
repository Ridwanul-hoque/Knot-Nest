import React, { useEffect, useState } from 'react';
import AllBioDataCard from './AllBioDataCard';

const AllBioData = () => {
    const [bios, setBios] = useState([]);
    const [filter, setFilter] = useState({ age: '', biodataType: '', permanentDivision: '' });

    // Fetch bios with the filter applied
    useEffect(() => {
        let url = 'https://knot-nest-server.vercel.app/Bio?';
        
        // Build the query parameters based on the filter state
        Object.keys(filter).forEach(key => {
            if (filter[key]) {
                url += `${key}=${filter[key]}&`;
            }
        });

        console.log("Fetching from URL:", url); // Debugging the API URL

        fetch(url)
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch data");
                return res.json();
            })
            .then(data => {
                setBios(data);
            })
            .catch(err => {
                console.error("Error fetching bios:", err);
            });
    }, [filter]); 
    const handleFilter = (type, value) => {
        setFilter(prev => ({ ...prev, [type]: value }));
    };

    return (
        <div className="flex max-w-screen-xl mx-auto">
            {/* Filter Sidebar */}
            <div className="w-1/4 p-5 bg-pink-100">
                <h2 className="font-semibold mb-4 text-pink-800">Filter by</h2>
                <button onClick={() => handleFilter('age', '20-30')} className="block mb-2 text-yellow-500">Age: 20-30</button>
                <button onClick={() => handleFilter('age', '31-40')} className="block mb-2 text-yellow-500">Age: 31-40</button>
                <button onClick={() => handleFilter('biodataType', 'Male')} className="block mb-2 text-yellow-500">Gender: Male</button>
                <button onClick={() => handleFilter('biodataType', 'Female')} className="block mb-2 text-yellow-500">Gender: Female</button>
                <button onClick={() => handleFilter('permanentDivision', 'Dhaka')} className="block mb-2 text-yellow-500">Location: Dhaka</button>
                <button onClick={() => handleFilter('permanentDivision', 'Chittagong')} className="block mb-2 text-yellow-500">Location: Chittagong</button>
                <button
                    onClick={() => setFilter({ age: '', biodataType: '', permanentDivision: '' })}
                    className="block mb-2 text-red-500"
                >
                    Clear Filters
                </button>
            </div>

            {/* Bio Data Cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-3/4'>
                {
                    bios.map(bio => <AllBioDataCard key={bio._id} bio={bio} />)
                }
            </div>
        </div>
    );
};

export default AllBioData;
