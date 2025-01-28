import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
    const [bioData, setBioData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch data using fetch API
        const fetchBioData = async () => {
            try {
                const response = await fetch('https://knot-nest-server.vercel.app/Bio'); // Replace with your API URL
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setBioData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchBioData();
    }, []);

    // Calculate totals
    const total = bioData.length;
    const maleCount = bioData.filter(item => item.biodataType === 'Male').length;
    const femaleCount = bioData.filter(item => item.biodataType === 'Female').length;

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table-auto border-collapse border border-gray-300 w-full">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 px-4 py-2">Total Biodata</th>
                                <th className="border border-gray-300 px-4 py-2">Male</th>
                                <th className="border border-gray-300 px-4 py-2">Female</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 text-center">{total}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{maleCount}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{femaleCount}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
