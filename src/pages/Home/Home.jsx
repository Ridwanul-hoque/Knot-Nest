import React, { useEffect, useRef } from 'react';
import Banner from './Banner/Banner';
import BioPremium from './BioPremium/BioPremium';
import Review from '../Shared/Review/Review';

const Home = () => {
    const reviewRef = useRef(null);

    useEffect(() => {
        const handleScrollToReview = () => {
            reviewRef.current?.scrollIntoView({ behavior: "smooth" });
        };

        window.addEventListener("scrollToReview", handleScrollToReview);
        return () => {
            window.removeEventListener("scrollToReview", handleScrollToReview);
        };
    }, []);
    return (
        <div className='max-w-screen-xl mx-auto'>
            <Banner></Banner>
            <BioPremium></BioPremium>
            <Review ref={reviewRef}></Review>
        </div>
    );
};

export default Home;