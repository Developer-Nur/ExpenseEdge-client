import React from "react";
import { FaRegCheckCircle, FaChartBar, FaUserShield, FaGlobe } from "react-icons/fa";
import { motion } from "framer-motion";

const Features = () => {
  const features = [
    {
      id: 1,
      icon: <FaRegCheckCircle className="text-5xl text-[#2E236C]" />,
      title: "Secure Transactions",
      description: "Your business transactions are protected with end-to-end encryption."
    },
    {
      id: 2,
      icon: <FaChartBar className="text-5xl text-[#2E236C]" />,
      title: "Analytics Dashboard",
      description: "Monitor your revenue and growth with comprehensive financial analytics."
    },
    {
      id: 3,
      icon: <FaUserShield className="text-5xl text-[#2E236C]" />,
      title: "User Permissions",
      description: "Manage user roles and set permissions to control access to financial data."
    },
    {
      id: 4,
      icon: <FaGlobe className="text-5xl text-[#2E236C]" />,
      title: "Global Access",
      description: "Manage your accounts from anywhere in the world, with cross-device compatibility."
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-4xl font-bold text-[#2E236C] mb-4">
          Our Features
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          The tools you need to manage your business efficiently.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              className="card shadow-lg p-6 rounded-lg bg-white"
              whileHover={{ scale: 1.05, rotate: 1, boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)" }} // Hover animation
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12">
          <a href="/aboutUs" className="btn bg-[#2E236C] text-white">
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default Features;
