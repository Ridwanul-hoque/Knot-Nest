import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import img1 from '../../../assets/img1.webp';
import img2 from '../../../assets/img2.jpeg';
import img3 from '../../../assets/img3.jpg';
import img4 from '../../../assets/img4.jpg';
import img5 from '../../../assets/img5.jpg';

const slides = [
  {
    image: img1,
    title: "A New Beginning Awaits",
    text: "Find your perfect match and start the beautiful journey of love and companionship. Your soulmate is just a click away.",
  },
  {
    image: img5,
    title: "Building Lifelong Connections",
    text: "Create a meaningful bond based on trust, understanding, and love. Let us help you find someone who shares your values and dreams.",
  },
  {
    image: img4,
    title: "Join the Path of Love and Happiness",
    text: "Take the first step toward a lifetime of joy, love, and togetherness. Explore profiles and meet like-minded individuals ready for commitment.",
  },
  {
    image: img2,
    title: "Where Matches Are Made in Heaven",
    text: "Your destiny is waiting. Connect with genuine profiles and discover your life partner effortlessly.",
  },
  {
    image: img3,
    title: "Make the First Move Today",
    text: "Take control of your love story. It starts right here, right now.",
  }
];

const Banner = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % slides.length);
    }, 6000); // 6-second loop

    return () => clearInterval(interval);
  }, []);

  const slide = slides[index];

  return (
    <div className="relative w-full h-[700px] overflow-hidden">
      {/* Blurred background image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.image}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt="Banner Background"
            className="w-full h-full object-cover filter blur-md brightness-75"
          />
        </motion.div>
      </AnimatePresence>

      {/* Optional gradient overlay for extra contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />

      {/* Clean text over blurred background */}
      <motion.div
        key={slide.title}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4"
      >
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        >
          {slide.title}
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-white mt-4 max-w-3xl drop-shadow-[0_1px_8px_rgba(0,0,0,0.7)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {slide.text}
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Banner;
