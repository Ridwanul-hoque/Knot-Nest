import React, { useState } from "react";
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
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto mt-10 p-10 bg-white/30 backdrop-blur-lg shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-3xl border border-white/20 transform transition duration-500 hover:scale-[1.02] bg-gradient-to-br from-pink-50 via-yellow-50 to-pink-100 "
    >
      <h2 className="text-4xl font-bold text-center text-pink-800 mb-10 drop-shadow-lg">
        Add Your Biodata
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: "Select Gender", name: "biodataType", type: "select", options: ["Male", "Female"] },
          { label: "Name", name: "name", type: "text" },
          { label: "Profile Image URL", name: "profileImage", type: "url" },
          { label: "Date of Birth", name: "dob", type: "date" },
          { label: "Height (cm)", name: "height", type: "number" },
          { label: "Weight (kg)", name: "weight", type: "number" },
          { label: "Age", name: "age", type: "number" },
          {
            label: "Occupation",
            name: "occupation",
            type: "select",
            options: ["Student", "Job", "House Wife"],
          },
          {
            label: "Race",
            name: "race",
            type: "select",
            options: ["Fair", "Dark", "Brown"],
          },
          { label: "Father's Name", name: "fathersName", type: "text" },
          { label: "Mother's Name", name: "mothersName", type: "text" },
          {
            label: "Permanent Division",
            name: "permanentDivision",
            type: "select",
            options: ["Dhaka", "Chattagram", "Rangpur", "Barisal", "Khulna", "Mymensingh", "Sylhet"],
          },
          {
            label: "Present Division",
            name: "presentDivision",
            type: "select",
            options: ["Dhaka", "Chattagram", "Rangpur", "Barisal", "Khulna", "Mymensingh", "Sylhet"],
          },
          { label: "Expected Partner Age", name: "expectedPartnerAge", type: "number" },
          { label: "Expected Partner Height (cm)", name: "expectedPartnerHeight", type: "number" },
          { label: "Expected Partner Weight (kg)", name: "expectedPartnerWeight", type: "number" },
        ].map((field, index) => (
          <div className="relative" key={index}>
            {field.type === "select" ? (
              <select
                name={field.name}
                onChange={handleChange}
                required
                className="p-4 w-full bg-white/60 backdrop-blur-md border border-pink-300 rounded-xl shadow-inner text-gray-800 focus:outline-none focus:ring-4 focus:ring-pink-400 focus:border-transparent transition-all duration-300"
              >
                <option value="">{field.label}</option>
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.name}
                placeholder={field.label}
                onChange={handleChange}
                required={
                  !["profileImage", "dob", "age", "fathersName", "mothersName", "expectedPartnerAge", "expectedPartnerHeight", "expectedPartnerWeight"].includes(field.name)
                }
                className="p-4 w-full bg-white/60 backdrop-blur-md border border-pink-300 rounded-xl shadow-inner text-gray-800 focus:outline-none focus:ring-4 focus:ring-pink-400 focus:border-transparent transition-all duration-300"
              />
            )}
          </div>
        ))}

        {/* Read-only Email */}
        <div className="relative">
          <input
            type="email"
            value={user.email}
            readOnly
            className="p-4 w-full bg-white/70 border border-yellow-300 rounded-xl shadow-inner text-gray-700 focus:outline-none cursor-not-allowed"
          />
        </div>

        {/* Mobile Number */}
        <div className="relative">
          <input
            type="text"
            name="phone"
            placeholder="Mobile Number"
            onChange={handleChange}
            required
            className="p-4 w-full bg-white/60 backdrop-blur-md border border-pink-300 rounded-xl shadow-inner text-gray-800 focus:outline-none focus:ring-4 focus:ring-pink-400 transition-all duration-300"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-10 w-full bg-gradient-to-r from-pink-700 to-yellow-500 text-white text-lg font-semibold py-4 rounded-xl shadow-lg hover:from-yellow-600 hover:to-pink-600 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-pink-300 transition-all duration-500 ease-in-out"
      >
        Submit
      </button>
    </form>
  );
};

export default AddData;
