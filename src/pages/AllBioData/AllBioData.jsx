import React, { useEffect, useState } from 'react';
import AllBioDataCard from './AllBioDataCard';

const AllBioData = () => {
    const [bios, setBios] = useState([]);
    const [filter, setFilter] = useState({ age: '', biodataType: '', permanentDivision: '' });

    useEffect(() => {
        let url = 'https://knot-nest-server.vercel.app/Bio?';

        Object.keys(filter).forEach(key => {
            if (filter[key]) {
                url += `${key}=${filter[key]}&`;
            }
        });

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

    const isActive = (type, value) => filter[type] === value;

    return (
        <div className="max-w-screen-xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filter Sidebar */}
            <div className="bg-gradient-to-br from-pink-100 via-yellow-50 to-white p-6 rounded-2xl shadow-md">
                <h2 className="text-xl font-bold text-pink-700 mb-4">Filter by</h2>

                <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-700">Age</h3>
                    <button
                        onClick={() => handleFilter('age', '20-30')}
                        className={`w-full px-4 py-2 rounded-full text-sm font-medium transition 
                            ${isActive('age', '20-30') ? 'bg-yellow-400 text-white' : 'bg-white text-yellow-500 hover:bg-yellow-100'}`}
                    >
                        20 - 30
                    </button>
                    <button
                        onClick={() => handleFilter('age', '31-40')}
                        className={`w-full px-4 py-2 rounded-full text-sm font-medium transition 
                            ${isActive('age', '31-40') ? 'bg-yellow-400 text-white' : 'bg-white text-yellow-500 hover:bg-yellow-100'}`}
                    >
                        31 - 40
                    </button>

                    <h3 className="text-sm font-semibold text-gray-700 mt-4">Gender</h3>
                    <button
                        onClick={() => handleFilter('biodataType', 'Male')}
                        className={`w-full px-4 py-2 rounded-full text-sm font-medium transition 
                            ${isActive('biodataType', 'Male') ? 'bg-pink-500 text-white' : 'bg-white text-pink-500 hover:bg-pink-100'}`}
                    >
                        Male
                    </button>
                    <button
                        onClick={() => handleFilter('biodataType', 'Female')}
                        className={`w-full px-4 py-2 rounded-full text-sm font-medium transition 
                            ${isActive('biodataType', 'Female') ? 'bg-pink-500 text-white' : 'bg-white text-pink-500 hover:bg-pink-100'}`}
                    >
                        Female
                    </button>

                    <h3 className="text-sm font-semibold text-gray-700 mt-4">Location</h3>
                    <button
                        onClick={() => handleFilter('permanentDivision', 'Dhaka')}
                        className={`w-full px-4 py-2 rounded-full text-sm font-medium transition 
                            ${isActive('permanentDivision', 'Dhaka') ? 'bg-purple-500 text-white' : 'bg-white text-purple-500 hover:bg-purple-100'}`}
                    >
                        Dhaka
                    </button>
                    <button
                        onClick={() => handleFilter('permanentDivision', 'Chittagong')}
                        className={`w-full px-4 py-2 rounded-full text-sm font-medium transition 
                            ${isActive('permanentDivision', 'Chittagong') ? 'bg-purple-500 text-white' : 'bg-white text-purple-500 hover:bg-purple-100'}`}
                    >
                        Chittagong
                    </button>

                    <button
                        onClick={() => setFilter({ age: '', biodataType: '', permanentDivision: '' })}
                        className="w-full mt-6 px-4 py-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-full font-semibold text-sm transition"
                    >
                        Clear Filters
                    </button>
                </div>
            </div>

            {/* Bio Cards */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {bios.length ? (
                    bios.map(bio => <AllBioDataCard key={bio._id} bio={bio} />)
                ) : (
                    <div className="col-span-full text-center text-gray-500 italic mt-10">
                        No biodata found for selected filters.
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllBioData;
