import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BioPremium = () => {
  const [Bios, setBios] = useState([]);

  useEffect(() => {
    fetch("https://knot-nest-server.vercel.app/Bio")
      .then((res) => res.json())
      .then((data) => {
        const premiumBio = data.filter((item) => item.role === "premium");
        setBios(premiumBio);
      })
      .catch((error) => console.error("Error fetching bios:", error));
  }, []);

  return (
    <div className="my-16 px-6 lg:px-16">
      <h2 className="text-yellow-600 text-4xl font-bold text-center mb-12 tracking-wide drop-shadow-sm">
        ✨ Premium Bios ✨
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
        {/* LEFT COLUMN */}
        <div className="space-y-14">
          {Bios.slice(0, 3).map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-center gap-6"
            >
              {/* TEXT SECTION */}
              <div className="bg-gradient-to-br from-yellow-100 via-pink-100 to-yellow-100 p-6 rounded-3xl w-full max-w-md text-right shadow-[0_8px_24px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.15)] transition-all duration-300">
                <h3 className="text-2xl font-extrabold text-yellow-700 uppercase mb-1">
                  {item.name}
                </h3>
                <p className="text-sm text-pink-700 font-semibold uppercase mb-2">
                  {item.occupation}
                </p>
                <p className="text-gray-800">
                  <strong>Age:</strong> {item.age} &nbsp;|&nbsp;
                  <strong>Gender:</strong>{" "}
                  <span className="text-yellow-600">{item.biodataType}</span>
                </p>
              </div>

              {/* IMAGE */}
              <div className="w-[140px] h-[140px] rounded-full overflow-hidden border-[6px] border-white shadow-xl">
                <img
                  src={item.profileImage}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-14">
          {Bios.slice(3, 6).map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-center gap-6"
            >
              {/* IMAGE */}
              <div className="w-[140px] h-[140px] rounded-full overflow-hidden border-[6px] border-white shadow-xl ">
                <img
                  src={item.profileImage}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* TEXT SECTION */}
              <div className="bg-gradient-to-br from-yellow-100 via-pink-100 to-yellow-100 p-6 rounded-3xl w-full max-w-md text-left shadow-[0_8px_24px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.15)] transition-all duration-300">
                <h3 className="text-2xl font-extrabold text-yellow-700 uppercase mb-1">
                  {item.name}
                </h3>
                <p className="text-sm text-pink-700 font-semibold uppercase mb-2">
                  {item.occupation}
                </p>
                <p className="text-gray-800">
                  <strong>Age:</strong> {item.age} &nbsp;|&nbsp;
                  <strong>Gender:</strong>{" "}
                  <span className="text-yellow-600">{item.biodataType}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-16">
        <Link
          to={"/BioData"}
          className="relative inline-block px-10 py-3 bg-yellow-500 text-white font-bold rounded-full overflow-hidden shadow-lg transition duration-300 hover:bg-white hover:text-yellow-500 border-2 border-yellow-500 group"
        >
          <span className="absolute inset-0 w-full h-full bg-yellow-100 opacity-0 group-hover:opacity-100 transition duration-300"></span>
          <span className="relative z-10">View All BioData's</span>
        </Link>
      </div>
    </div>
  );
};

export default BioPremium;
