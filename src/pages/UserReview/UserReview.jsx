import React, { useEffect, useState } from 'react';

const UserReview = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('https://knot-nest-server.vercel.app/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
            .catch(error => console.error('Error fetching reviews:', error));
    }, []);

    return (
        <div className="p-6 bg-pink-100 min-h-screen max-w-screen-xl mx-auto my-8">
            <h2 className="text-3xl font-bold text-center mb-6 text-yellow-500">User Complaints</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead className="bg-yellow-500 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left">User</th>
                            <th className="px-6 py-3 text-left">Comment</th>
                            <th className="px-6 py-3 text-center">Rating</th>
                           
                        </tr>
                    </thead>
                    <tbody className="text-gray-800">
                        {reviews.map(review => (
                            <tr key={review._id} className="hover:bg-gray-100">
                                <td className="px-6 py-4">{review.user}</td>
                                <td className="px-6 py-4">{review.comment}</td>
                                <td className="px-6 py-4 text-center text-yellow-500">{'⭐'.repeat(review.rating)}</td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserReview;
