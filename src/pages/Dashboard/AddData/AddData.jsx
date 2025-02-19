import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

// AddData Component
export const AddData = () => {
    const { user } = useAuth();
    const [biodata, setBiodata] = useState({
        biodataType: "",
        name: "",
        profileImage: "",
        dob: "",
        height: "",
        weight: "",
        age: "",
        occupation: "",
        race: "",
        fathersName: "",
        mothersName: "",
        permanentDivision: "",
        presentDivision: "",
        expectedPartnerAge: "",
        expectedPartnerHeight: "",
        expectedPartnerWeight: "",
        phone: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBiodata({ ...biodata, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        biodata.email = user.email;
        try {
            const response = await fetch("https://knot-nest-server.vercel.app/Bio", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(biodata),
            });
            const result = await response.json();
            Swal.fire({
                icon: "success",
                title: "Data Added",
                text: `Data has been added successfully!`,
            });
        } catch (error) {
            console.error("Error adding biodata:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to add biodata. Please try again.",
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-lg">
            <h2 className="text-3xl font-bold mb-8 text-yellow-500">Add Your Biodata</h2>
            <div className="grid grid-cols-2 gap-4">
                <select
                    name="biodataType"
                    onChange={handleChange}
                    required
                    className="p-3 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    required
                    className="p-3 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <input
                    type="url"
                    name="profileImage"
                    placeholder="Profile Image URL"
                    onChange={handleChange}
                    className="p-3 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <input
                    type="date"
                    name="dob"
                    onChange={handleChange}
                    className="p-3 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <input
                    type="number"
                    name="height"
                    placeholder="Height (cm)"
                    onChange={handleChange}
                    required
                    className="p-3 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <input
                    type="number"
                    name="weight"
                    placeholder="Weight (kg)"
                    onChange={handleChange}
                    required
                    className="p-3 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    onChange={handleChange}
                    className="p-3 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <select
                    name="occupation"
                    onChange={handleChange}
                    required
                    className="p-3 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                    <option value="">Select Occupation</option>
                    <option value="Student">Student</option>
                    <option value="Job">Job</option>
                    <option value="House Wife">House Wife</option>
                </select>
                <select
                    name="race"
                    onChange={handleChange}
                    required
                    className="p-3 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                    <option value="">Select Race</option>
                    <option value="Fair">Fair</option>
                    <option value="Dark">Dark</option>
                    <option value="Brown">Brown</option>
                </select>
                <input
                    type="text"
                    name="fathersName"
                    placeholder="Father's Name"
                    onChange={handleChange}
                    className="p-3 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <input
                    type="text"
                    name="mothersName"
                    placeholder="Mother's Name"
                    onChange={handleChange}
                    className="p-3 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <select
                    name="permanentDivision"
                    onChange={handleChange}
                    required
                    className="p-3 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                    <option value="">Select Permanent Division</option>
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chattagram">Chattagram</option>
                    <option value="Rangpur">Rangpur</option>
                    <option value="Barisal">Barisal</option>
                    <option value="Khulna">Khulna</option>
                    <option value="Mymensingh">Mymensingh</option>
                    <option value="Sylhet">Sylhet</option>
                </select>
                <select
                    name="presentDivision"
                    onChange={handleChange}
                    required
                    className="p-3 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                    <option value="">Select Present Division</option>
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chattagram">Chattagram</option>
                    <option value="Rangpur">Rangpur</option>
                    <option value="Barisal">Barisal</option>
                    <option value="Khulna">Khulna</option>
                    <option value="Mymensingh">Mymensingh</option>
                    <option value="Sylhet">Sylhet</option>
                </select>
                <input
                    type="number"
                    name="expectedPartnerAge"
                    placeholder="Expected Partner Age"
                    onChange={handleChange}
                    className="p-3 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <input
                    type="number"
                    name="expectedPartnerHeight"
                    placeholder="Expected Partner Height (cm)"
                    onChange={handleChange}
                    className="p-3 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <input
                    type="number"
                    name="expectedPartnerWeight"
                    placeholder="Expected Partner Weight (kg)"
                    onChange={handleChange}
                    className="p-3 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <input
                    type="email"
                    value={user.email}
                    readOnly
                    className="p-3 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 cursor-not-allowed"
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Mobile Number"
                    onChange={handleChange}
                    required
                    className="p-3 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
            </div>
            <button
                type="submit"
                className="mt-6 w-full bg-pink-800 text-yellow-500 py-3 rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-700"
            >
                Submit
            </button>
        </form>
    );
};

export default AddData;
