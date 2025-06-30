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
        <div
            ref={ref}
            id="review-section"
            className="bg-gradient-to-br from-pink-100 via-yellow-100 to-pink-100 my-16 p-10 rounded-2xl shadow-xl"
        >
            <h2 className="text-4xl font-extrabold text-center mb-14 text-yellow-600 tracking-wide">
                🌟 User Experience
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {reviews.map(review => (
                    <div
                        key={review._id}
                        className="relative bg-white border border-gray-200 px-6 py-12 text-center shadow-sm group transition-all duration-500 hover:shadow-xl hover:-translate-y-2 rounded-none overflow-hidden"
                    >
                        <h3 className="text-xl font-semibold text-gray-900 uppercase tracking-widest mb-2">
                            {review.user}
                        </h3>

                        <p className="text-sm text-gray-600 mb-6">
                            “{review.comment}”
                        </p>

                        <div className="mt-2 text-yellow-500 font-semibold text-lg tracking-wide">
                            {'⭐'.repeat(review.rating)}
                            <span className="ml-2 text-sm text-gray-400">
                                ({review.rating})
                            </span>
                        </div>

                        <button className="mt-6 text-xs tracking-wide uppercase text-orange-500 group-hover:underline transition-all duration-300">
                            Appreciate ✧
                        </button>

                        {/* Fancy overlay gradient hover effect */}
                        <div className="absolute inset-0 bg-gradient-to-b from-orange-100/40 to-yellow-100/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />
                    </div>
                ))}
            </div>
        </div>
    );
});

export default Review;
