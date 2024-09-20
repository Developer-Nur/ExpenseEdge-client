import React, { useState, useEffect } from 'react';

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

    return (
        <section className="bg-[#F9FAFB] py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-[#16423C] mb-8">
                    What Our Clients Say
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.length > 0 ? (
                        testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center"
                            >
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-24 h-24 rounded-full object-cover mb-4"
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
                            </div>
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
