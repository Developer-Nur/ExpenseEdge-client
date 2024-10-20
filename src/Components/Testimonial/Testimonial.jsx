import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Testimonial = () => {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        // Fetch the testimonial JSON data from the public folder
        fetch('/testimonial.json')
            .then((response) => response.json())
            .then((data) => {
                setTestimonials(data);
            })
            .catch((error) => console.error('Error fetching testimonials:', error));
    }, []);

    // Animation variants for the testimonial cards
    const cardVariants = {
        hidden: { opacity: 0, y: 50 }, // Start hidden and below the view
        visible: { opacity: 1, y: 0 }, // Fade in and slide up to position
    };

    return (
        <section className="bg-[#F9FAFB] py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-[#2E236C] mb-8">
                    What Our Clients Say
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.length > 0 ? (
                        testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center"
                                initial="hidden"
                                whileInView="visible" // Triggers animation when in view
                                viewport={{ once: true }} // Ensures it animates only once
                                transition={{ duration: 0.5, delay: index * 0.2 }} // Stagger effect
                                variants={cardVariants} // Apply animation variants
                            >
                                <motion.img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-24 h-24 rounded-full object-cover mb-4"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.5 }} // Scale-up animation
                                />
                                <h5 className="text-lg font-semibold text-[#16423C]">
                                    {testimonial.name}
                                </h5>
                                <span className="text-sm text-gray-500 mb-4">
                                    {testimonial.role}
                                </span>
                                <p className="text-center text-gray-600">
                                    "{testimonial.feedback}"
                                </p>
                            </motion.div>
                        ))
                    ) : (
                        <p className="text-center text-gray-600">Loading testimonials...</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Testimonial;
