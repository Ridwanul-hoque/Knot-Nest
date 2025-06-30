import React from 'react';
import { FaClock, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

const ContactSection = () => {
    return (
        <div className="bg-white py-16 px-6 md:px-0">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row shadow-xl rounded-xl overflow-hidden border border-yellow-100">
                
                {/* Left: Message */}
                <div className="w-full md:w-2/3 bg-white p-10">
                    <h2 className="text-lg font-semibold text-orange-500 uppercase mb-2">Get In Touch</h2>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Whether you have questions, feedback, or need assistance with your profile or matches,
                        we're here to help. Our team is dedicated to making your search for the right match
                        smooth, safe, and successful.
                    </p>
                    <p className="mt-6 text-gray-700 font-medium">With Care,</p>
                    <p className="text-3xl text-yellow-600 font-signature mt-1">Knot Nest</p>
                </div>

                {/* Right: Info */}
                <div className="w-full md:w-1/3 bg-gradient-to-br from-yellow-100 via-pink-100 to-yellow-100 p-8 flex flex-col justify-center gap-4 text-sm text-gray-800">
                    <div className="flex items-start gap-3">
                        <FaClock className="mt-1 text-yellow-600" />
                        <div>
                            <p className="font-semibold text-gray-800">Mon - Fri: 9 AM - 5 PM</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <FaEnvelope className="mt-1 text-yellow-600" />
                        <div>
                            <p>support@knotnest.com</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <FaPhoneAlt className="mt-1 text-yellow-600" />
                        <div>
                            <p>+880123456789</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <FaMapMarkerAlt className="mt-1 text-yellow-600" />
                        <div>
                            <p>123 Match Lane, Sector 9, Dhaka</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactSection;
