import React, { useState, useEffect } from "react";
import useAuth from "../../../Hooks/useAuth";

const ContactRequest = () => {
  const { user, loading } = useAuth();
  const [approvedContacts, setApprovedContacts] = useState([]);

  useEffect(() => {
    if (!user || loading) return;

    const fetchData = async () => {
      try {
        // Fetch payments based on the logged-in user's email
        const paymentRes = await fetch("https://knot-nest-server.vercel.app/payment");
        const paymentData = await paymentRes.json();

        // Filter payments that are approved and match the logged-in user
        const approvedPayments = paymentData.filter(
          (payment) => payment.userEmail === user.email && payment.status === "approved"
        );

        // Fetch biodata for each approved payment
        const bioRes = await fetch("https://knot-nest-server.vercel.app/Bio");
        const bioData = await bioRes.json();

        // Map biodata to the corresponding payments
        const matchedBiodata = approvedPayments.map((payment) => 
          bioData.find((bio) => bio._id === payment.biodataId)
        ).filter((bio) => bio); // Remove any undefined values

        setApprovedContacts(matchedBiodata);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user, loading]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Approved Contact Requests</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {approvedContacts.length > 0 ? (
          approvedContacts.map((contact) => (
            <div
              key={contact._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden p-6 border border-gray-200 transform transition-transform hover:scale-105 hover:shadow-xl"
            >
              <div className="relative">
                <img
                  src={contact.profileImage}
                  alt={contact.name}
                  className="w-full h-48 object-cover rounded-md"
                />
                <div className="absolute top-0 left-0 p-4 bg-gradient-to-b from-transparent to-black/40 w-full h-full rounded-md">
                  <h3 className="text-2xl font-semibold text-white">{contact.name}</h3>
                  <p className="text-lg text-white">{contact.occupation}</p>
                </div>
              </div>
              <div className="mt-4 text-gray-700">
                <p className="flex items-center">
                  <span className="font-semibold">Age:</span> {contact.age}
                </p>
                <p className="flex items-center">
                  <span className="font-semibold">Location:</span> {contact.permanentDivision}
                </p>
                <p className="flex items-center">
                  <span className="font-semibold">Email:</span> {contact.email}
                </p>
                <p className="flex items-center">
                  <span className="font-semibold">Phone:</span> {contact.phone}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-4">No approved contact requests found.</p>
        )}
      </div>
    </div>
  );
};

export default ContactRequest;
