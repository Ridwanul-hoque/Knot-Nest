import React, { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../pages/Shared/Footer/Footer';
import Navbar from '../pages/Shared/Navbar/Navbar';

const Main = () => {
    const reviewRef = useRef(null);

    const scrollToReview = () => {
        if (reviewRef.current) {
            reviewRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <div>
            <div className='bg-pink-800'>
                <Navbar scrollToReview={scrollToReview}></Navbar>
            </div>
            <Outlet></Outlet>
            
            <div className='bg-pink-800'>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Main;