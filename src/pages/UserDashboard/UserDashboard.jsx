import React from 'react';
import useAuth from '../../Hooks/useAuth';

const UserDashboard = () => {
  const { user, loading } = useAuth();

  // If loading or no user is present
  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (!user) {
    return <p className="text-center text-gray-500">No user is logged in.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-yellow-500 mb-6">User Dashboard</h2>
        
        {/* User Profile Section */}
        <div className="flex items-center space-x-6 mb-6">
          {/* User Image */}
          <img
            src={user?.photoURL || 'https://via.placeholder.com/150'}
            alt={user.displayName}
            className="w-24 h-24 object-cover rounded-full border-4 border-yellow-500"
          />

          {/* User Information */}
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold text-gray-800">{user.displayName || 'User Name'}</h3>
            <p className="text-gray-600">{user.email || 'No email available'}</p>
          </div>
        </div>

        {/* Optional: Additional User Info */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800">Additional Info</h3>
          <p className="text-gray-600">This is where you can add any extra information about the user.</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
