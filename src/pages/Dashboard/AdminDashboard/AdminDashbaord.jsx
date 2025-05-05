import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const AdminDashboard = () => {
    const [bioData, setBioData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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

    // Chart Data
    const pieData = {
        labels: ['Male', 'Female'],
        datasets: [
            {
                data: [maleCount, femaleCount],
                backgroundColor: ['#FF6384', '#36A2EB'],
                hoverBackgroundColor: ['#FF4379', '#56A9E7'],
            },
        ],
    };

    const barData = {
        labels: ['Total Biodata', 'Male', 'Female'],
        datasets: [
            {
                label: 'Biodata Count',
                data: [total, maleCount, femaleCount],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                borderColor: ['#FF4379', '#56A9E7', '#FFB84D'],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="p-8 bg-pink-50 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-10 text-yellow-600">Admin Dashboard</h1>
            {loading ? (
                <div className="text-center text-lg text-gray-500">Loading...</div>
            ) : (
                <div className="space-y-12">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-md text-center border border-yellow-100">
                            <h3 className="text-xl font-semibold text-gray-600">Total Biodata</h3>
                            <p className="text-3xl font-bold text-yellow-600 mt-2">{total}</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md text-center border border-yellow-100">
                            <h3 className="text-xl font-semibold text-gray-600">Male</h3>
                            <p className="text-3xl font-bold text-blue-500 mt-2">{maleCount}</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md text-center border border-yellow-100">
                            <h3 className="text-xl font-semibold text-gray-600">Female</h3>
                            <p className="text-3xl font-bold text-pink-500 mt-2">{femaleCount}</p>
                        </div>
                    </div>

                    {/* Pie Chart Section */}
                    <div>
                        <h2 className="text-2xl font-semibold text-center text-yellow-600 mb-4">Gender Distribution</h2>
                        <div className="w-full max-w-xl mx-auto bg-white p-4 rounded-xl shadow-md">
                            <Pie data={pieData} />
                        </div>
                    </div>

                    {/* Bar Chart Section */}
                    <div>
                        <h2 className="text-2xl font-semibold text-center text-yellow-600 mb-4">Biodata Distribution</h2>
                        <div className="w-full max-w-xl mx-auto bg-white p-4 rounded-xl shadow-md">
                            <Bar data={barData} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
