import React, { useState } from "react";
import { FaLinkedin, FaTwitter } from "react-icons/fa"; // Importing LinkedIn and Twitter icons

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted: ", formData);
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
    alert("Message sent successfully!");
  };

  return (
    <section className="bg-gradient-to-r from-gray-100 via-white to-gray-100 py-16">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-green-800">Contact Us</h2>
        <p className="text-center text-lg text-gray-500 mt-4 md:mt-6 mb-8 md:mb-16">
          We’d love to hear from you! Reach out with your questions or feedback.
        </p>

        <div className="flex flex-col lg:flex-row lg:space-x-16 space-y-12 lg:space-y-0 justify-center">
          {/* Contact Form */}
          <div className="w-full lg:w-2/3 bg-white p-6 lg:p-10 rounded-xl shadow-2xl transition-transform duration-300 transform hover:scale-105">
            <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-8">
              <div>
                <label className="block text-lg font-semibold text-gray-600">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-600">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-600">Phone Number (Optional)</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                  placeholder="(123) 456-7890"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-600">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                  placeholder="Subject"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-600">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                  rows="5"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-bold transition-transform duration-300 transform hover:scale-105"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div className="w-full lg:w-1/3 bg-white p-6 lg:p-10 rounded-xl shadow-2xl transition-transform duration-300 transform hover:scale-105">
            <h3 className="text-3xl font-extrabold text-gray-700">Other ways to reach us</h3>
            <ul className="mt-6 space-y-4 text-gray-600">
              <li>
                <strong>Email:</strong>{" "}
                <a href="mailto:contact@expense-edge.com" className="text-blue-600">
                  contact@expense-edge.com
                </a>
              </li>
              <li>
                <strong>Phone:</strong> +123-456-7890
              </li>
              <li>
                <strong>Address:</strong> 123 Finance Lane, Business City
              </li>
            </ul>

            {/* Social Media Links */}
            <h3 className="text-2xl font-bold text-gray-700 mt-12">Follow Us</h3>
            <div className="flex space-x-6 mt-6">
              <a href="https://linkedin.com" className="text-blue-600 hover:text-blue-800">
                <FaLinkedin className="w-8 h-8" />
              </a>
              <a href="https://twitter.com" className="text-blue-600 hover:text-blue-800">
                <FaTwitter className="w-8 h-8" />
              </a>
            </div>

            {/* Google Map Embed */}
            <div className="mt-12">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.035839994049!2d144.9560549155321!3d-37.81720944202124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577362a8d38d0b7!2sBusiness%20City!5e0!3m2!1sen!2s!4v1605185646712!5m2!1sen!2s"
                width="100%"
                height="250"
                frameBorder="0"
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
                title="Office Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
