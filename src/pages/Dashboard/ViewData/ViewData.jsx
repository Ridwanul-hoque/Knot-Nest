import React, { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const ViewData = () => {
  const { user } = useAuth();
  const [biodata, setBiodata] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBiodata, setSelectedBiodata] = useState(null);
  const [updatedBiodata, setUpdatedBiodata] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/Bio-email?email=${user.email}`);
        const result = await response.json();
        setBiodata(result);
      } catch (error) {
        console.error("Error fetching biodata:", error);
      }
    };
    fetchData();
  }, [user.email]);

  const handleUpdate = (data) => {
    setSelectedBiodata(data);
    setUpdatedBiodata(data);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBiodata({ ...updatedBiodata, [name]: value });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBiodata(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/Bio-email?email=${user.email}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBiodata),
      });
      const result = await response.json();
      console.log("Updated successfully:", result);
      setIsModalOpen(false);
      setSelectedBiodata(null);
      setBiodata((prev) => prev.map((item) => (item._id === result._id ? result : item)));
    } catch (error) {
      console.error("Error updating biodata:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Your Biodata</h2>
      <div className="space-y-4">
        {biodata.map((data) => (
          <div
            key={data._id}
            className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow"
          >
            <div className="flex items-center gap-4">
              <img
                src={data.profileImage || (data.biodataType === "Male" ? "/male.png" : "/female.png")}
                alt="Profile"
                className="w-16 h-16 rounded-full"
              />
              <div>
                <p className="text-lg font-semibold">{data.name}</p>
                <p className="text-gray-600">{data.email}</p>
              </div>
            </div>
            <button
              onClick={() => handleUpdate(data)}
              className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
            >
              Update
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedBiodata && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-6xl w-full">
            <h3 className="text-2xl font-bold mb-4">Update Biodata</h3>
            <form onSubmit={handleSave} className="grid grid-cols-3 gap-4">
              {Object.keys(updatedBiodata).map((key) => (
                key !== "_id" ? (
                  <div key={key} className="mb-4">
                    <label className="block text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                    <input
                      type="text"
                      name={key}
                      value={updatedBiodata[key]}
                      onChange={handleChange}
                      disabled={key === "email" || key === "profileImage"}
                      className={`w-full p-2 border border-gray-300 rounded ${key === "email" || key === "profileImage" ? "bg-gray-200" : ""}`}
                    />
                  </div>
                ) : null
              ))}
              <div className="col-span-3 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-500 text-white p-2 rounded"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-yellow-500 text-white p-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewData;
