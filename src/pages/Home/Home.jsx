import React from 'react';
import Banner from './Banner/Banner';
import BioPremium from './BioPremium/BioPremium';
import Review from '../Shared/Review/Review';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <BioPremium></BioPremium>
            <Review></Review>
        </div>
    );
};

export default Home;