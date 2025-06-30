import React, { useEffect, useState } from "react";
import BioCard from "../../Shared/BioCard/BioCard";
import Review from "../../Shared/Review/Review";
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
    <div className="bg-gradient-to-br from-pink-100 via-yellow-100 to-pink-100 my-8 p-8 rounded-2xl shadow-xl">
      <h2 className="text-yellow-500 text-4xl font-bold text-center mb-10 drop-shadow-sm">
        ✨ Premium Bios ✨
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left group: Info left, image center */}
        <div className="space-y-10">
          {Bios.slice(0, 3).map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-center gap-6"
            >
              {/* Info Left */}
              <div className="bg-white shadow-xl border border-yellow-100 p-6 rounded-2xl w-full max-w-md text-right">
                <h3 className="text-2xl font-bold text-yellow-600 uppercase mb-1">
                  {item.name}
                </h3>
                <p className="text-sm text-pink-600 font-semibold uppercase mb-2">
                  {item.occupation}
                </p>
                <p className="text-gray-700">
                  <strong>Age:</strong> {item.age} &nbsp;|&nbsp;
                  <strong>Gender:</strong>{" "}
                  <span className="text-yellow-500">{item.biodataType}</span>
                </p>
              </div>

              {/* Image Center */}
              <div className="w-[140px] h-[140px] rounded-full overflow-hidden border-4 border-yellow-400 shadow-md shrink-0">
                <img
                  src={item.profileImage}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Right group: Image center, info right */}
        <div className="space-y-10">
          {Bios.slice(3, 6).map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-center gap-6"
            >
              {/* Image Center */}
              <div className="w-[140px] h-[140px] rounded-full overflow-hidden border-4 border-yellow-400 shadow-md shrink-0">
                <img
                  src={item.profileImage}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info Right */}
              <div className="bg-white shadow-xl border border-yellow-100 p-6 rounded-2xl w-full max-w-md text-left">
                <h3 className="text-2xl font-bold text-yellow-600 uppercase mb-1">
                  {item.name}
                </h3>
                <p className="text-sm text-pink-600 font-semibold uppercase mb-2">
                  {item.occupation}
                </p>
                <p className="text-gray-700">
                  <strong>Age:</strong> {item.age} &nbsp;|&nbsp;
                  <strong>Gender:</strong>{" "}
                  <span className="text-yellow-500">{item.biodataType}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <Link
          to={"/BioData"}
          className="relative inline-block px-8 py-3 bg-yellow-500 text-white font-bold rounded-full overflow-hidden shadow-lg transition duration-300 hover:bg-white hover:text-yellow-500 border-2 border-yellow-500 group"
        >
          <span className="absolute inset-0 w-full h-full bg-yellow-100 opacity-0 group-hover:opacity-100 transition duration-300"></span>
          <span className="relative z-10">View All BioData's</span>
        </Link>
      </div>
    </div>
  );
};

export default BioPremium;
