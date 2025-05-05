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
        <div className="p-6 bg-gradient-to-br from-pink-100 to-yellow-50 min-h-screen max-w-screen-xl mx-auto my-8 rounded-xl shadow-xl">
            <h2 className="text-4xl font-extrabold text-center mb-10 text-yellow-500 drop-shadow-sm">
                🗣️ User Complaints & Feedback
            </h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-yellow-200 rounded-lg shadow-lg overflow-hidden">
                    <thead className="bg-yellow-400 text-white text-lg">
                        <tr>
                            <th className="px-6 py-4 text-left">👤 User</th>
                            <th className="px-6 py-4 text-left">💬 Comment</th>
                            <th className="px-6 py-4 text-center">⭐ Rating</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm">
                        {reviews.map(review => (
                            <tr key={review._id} className="hover:bg-yellow-50 transition duration-200">
                                <td className="px-6 py-4 font-semibold text-pink-600">{review.user}</td>
                                <td className="px-6 py-4 italic">{review.comment}</td>
                                <td className="px-6 py-4 text-center text-yellow-500 text-lg">
                                    {'⭐'.repeat(review.rating)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserReview;
