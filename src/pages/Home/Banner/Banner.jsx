import React from 'react';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import img1 from '../../../assets/img1.webp';
import img2 from '../../../assets/img2.jpeg';
import img3 from '../../../assets/img3.jpg';
import img4 from '../../../assets/img4.jpg';
import img5 from '../../../assets/img5.jpg';

const Banner = () => {
    return (
        <Carousel>
            {/* First Image */}
            <div className="relative h-[500px]">
                <img src={img1} alt="Banner 1" className="opacity-50" />
                <div className="absolute inset-0  bg-opacity-50"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-pink-800">
                    <h1 className="text-4xl font-bold">A New Beginning Awaits</h1>
                    <p className="text-lg mt-2">Find your perfect match and start the beautiful journey of love and companionship. Your soulmate is just a click away.</p>
                </div>
            </div>

            {/* Second Image */}
            <div className="relative h-[650px]">
                <img src={img5} alt="Banner 2" className="opacity-50" />
                <div className="absolute inset-0  bg-opacity-50"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-pink-800">
                    <h1 className="text-4xl font-bold">Building Lifelong Connections</h1>
                    <p className="text-lg mt-2">Create a meaningful bond based on trust, understanding, and love. Let us help you find someone who shares your values and dreams.</p>
                </div>
            </div>

            {/* Third Image */}
            <div className="relative h-[500px]">
                <img src={img4} alt="Banner 3" className="opacity-50" />
                <div className="absolute inset-0  bg-opacity-50"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-pink-800">
                    <h1 className="text-4xl font-bold">Join the Path of Love and Happiness</h1>
                    <p className="text-lg mt-2">Take the first step toward a lifetime of joy, love, and togetherness. Explore profiles and meet like-minded individuals ready for commitment.</p>
                </div>
            </div>
        </Carousel>
    );
};

export default Banner;

