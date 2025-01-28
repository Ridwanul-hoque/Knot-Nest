import React, { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';

const Favourite = () => {
    const { user } = useAuth();
    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        if (user?.email) {
            // Fetch favourites for the logged-in user
            fetch(`http://localhost:5000/favourites?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);  // Log the response to check its format
                    if (Array.isArray(data)) {
                        setFavourites(data);  // Only set data if it's an array
                    } else {
                        setFavourites([]);  // In case the response is not an array, reset to an empty array
                    }
                })
                .catch(error => console.error('Error fetching favourites:', error));
        }
    }, [user?.email]);

    return (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {favourites.length === 0 && (
                <p className="text-center col-span-full text-gray-500">No favourites found.</p>
            )}

            {Array.isArray(favourites) && favourites.map(fav => (
                <div key={fav.biodataId} className="rounded-lg shadow-lg bg-white p-4">
                    <img 
                        src={fav.profileImage || 'https://via.placeholder.com/150'} 
                        alt={fav.name} 
                        className="w-full h-48 object-cover rounded-md mb-4"
                    />
                    <h3 className="text-lg font-semibold mb-2">{fav.name}</h3>
                    <p><strong>Age:</strong> {fav.age}</p>
                    <p><strong>Occupation:</strong> {fav.occupation}</p>
                    <p><strong>Division:</strong> {fav.permanentDivision}</p>
                    <p className='text-red-300'>To get more information go to bio data</p>
                    
                </div>
            ))}
        </div>
    );
};

export default Favourite;
