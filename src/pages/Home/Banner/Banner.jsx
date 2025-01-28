import React from 'react';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import img1 from '../../../assets/img1.webp';
import img2 from '../../../assets/img2.jpeg';
import img3 from '../../../assets/img3.jpg';

const Banner = () => {
    return (
        <Carousel>
            {/* First Image */}
            <div className="relative h-[500px]">
                <img src={img1} alt="Banner 1" className="opacity-50" />
                <div className="absolute inset-0  bg-opacity-50"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <h1 className="text-4xl font-bold">Heading 1</h1>
                    <p className="text-lg mt-2">This is a paragraph for the first image.</p>
                </div>
            </div>

            {/* Second Image */}
            <div className="relative h-[650px]">
                <img src={img2} alt="Banner 2" className="opacity-50" />
                <div className="absolute inset-0  bg-opacity-50"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <h1 className="text-4xl font-bold">Heading 2</h1>
                    <p className="text-lg mt-2">This is a paragraph for the second image.</p>
                </div>
            </div>

            {/* Third Image */}
            <div className="relative h-[500px]">
                <img src={img3} alt="Banner 3" className="opacity-50" />
                <div className="absolute inset-0  bg-opacity-50"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <h1 className="text-4xl font-bold">Heading 3</h1>
                    <p className="text-lg mt-2">This is a paragraph for the third image.</p>
                </div>
            </div>
        </Carousel>
    );
};

export default Banner;

