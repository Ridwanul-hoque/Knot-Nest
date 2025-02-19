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
                const response = await fetch('http://localhost:5000/Bio'); // Replace with your API URL
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
            <h1 className="text-3xl font-bold text-center mb-8 text-yellow-600">Admin Dashboard</h1>
            {loading ? (
                <div className="text-center text-lg text-gray-500">Loading...</div>
            ) : (
                <div>
                    {/* Table Section */}
                    <div className="overflow-x-auto mb-10">
                        <table className="table-auto border-collapse border border-gray-300 w-full shadow-lg rounded-lg">
                            <thead className="bg-yellow-500 text-white">
                                <tr>
                                    <th className="border border-gray-300 px-6 py-3 text-left">Total Biodata</th>
                                    <th className="border border-gray-300 px-6 py-3 text-left">Male</th>
                                    <th className="border border-gray-300 px-6 py-3 text-left">Female</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="hover:bg-gray-100">
                                    <td className="border border-gray-300 px-6 py-4 text-center text-lg">{total}</td>
                                    <td className="border border-gray-300 px-6 py-4 text-center text-lg">{maleCount}</td>
                                    <td className="border border-gray-300 px-6 py-4 text-center text-lg">{femaleCount}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Pie Chart Section */}
                    <div className="mb-10">
                        <h2 className="text-2xl font-semibold text-center text-yellow-600 mb-4">Gender Distribution</h2>
                        <div className="w-full max-w-xl mx-auto">
                            <Pie data={pieData} />
                        </div>
                    </div>

                    {/* Bar Chart Section */}
                    <div>
                        <h2 className="text-2xl font-semibold text-center text-yellow-600 mb-4">Biodata Distribution</h2>
                        <div className="w-full max-w-xl mx-auto">
                            <Bar data={barData} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
