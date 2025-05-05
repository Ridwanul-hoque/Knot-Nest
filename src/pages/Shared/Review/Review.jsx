import React, { forwardRef, useEffect, useState } from 'react';

const Review = forwardRef((props, ref) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('https://knot-nest-server.vercel.app/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
            .catch(error => console.error('Error fetching reviews:', error));
    }, []);

    return (
        <div ref={ref} id="review-section" className="bg-gradient-to-br from-pink-100 via-yellow-100 to-pink-100 my-8 p-8 rounded-2xl shadow-xl">
            <h2 className="text-4xl font-extrabold text-center mb-10 text-yellow-600 drop-shadow-sm">
                🌟 User Experience
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {reviews.map(review => (
                    <div key={review._id} className="bg-white shadow-xl rounded-lg p-6 transform hover:scale-105 transition-all duration-300 ease-in-out group">
                        <div className="relative">
                            <h3 className="text-xl font-semibold text-gray-800">{review.user}</h3>
                            <p className="text-gray-600 mt-2 text-base">{review.comment}</p>
                        </div>
                        <div className="mt-3 text-yellow-500 flex items-center">
                            {'⭐'.repeat(review.rating)}
                            <span className="ml-2 text-gray-500 text-sm">({review.rating})</span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-yellow-100 to-transparent rounded-lg opacity-0 group-hover:opacity-60 transition duration-300 ease-in-out"></div>
                    </div>
                ))}
            </div>
        </div>
    );
});

export default Review;
