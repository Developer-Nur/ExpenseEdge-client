import React from "react";

const AboutUs = () => {
    return (
        <div className="bg-gray-100 py-10">
            {/* Hero Section */}
            <section className="bg-[var(--primary-color)] text-white py-20 text-center">
                <div className="max-w-4xl mx-auto px-6">
                    <h1 className="text-5xl font-bold mb-6 text-white">About Us</h1>
                    <p className="text-lg">
                        Welcome to <strong>Expense Edge</strong> – Your trusted partner in mastering financial management.
                    </p>
                </div>
            </section>

            {/* Who We Are Section */}
            <section className="bg-white shadow-lg py-16 shadow-gray-300/50">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-[var(--primary-color)] mb-8">Who We Are</h2>
                    <p className="text-lg text-[var(--text-color)] max-w-3xl mx-auto">
                        At <strong>Expense Edge</strong>, we believe that financial management should be straightforward, insightful,
                        and accessible. Our team of experts has created a platform that redefines how businesses track and manage their financial performance.
                    </p>
                </div>
            </section>

            {/* What We Do Section */}
            <section className="bg-white py-16">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-[var(--primary-color)] mb-8">What We Do</h2>
                    <p className="text-lg text-[var(--text-color)] max-w-3xl mx-auto">
                        We offer a complete financial management system tailored to your business's needs. Whether you're a startup or
                        an established company, <strong>Expense Edge</strong> helps manage income, track expenses, and analyze growth efficiently.
                    </p>
                </div>
            </section>

            {/* Key Features Section */}
            <section className="bg-[#e9e4eb] py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl font-bold text-[var(--primary-color)] text-center mb-12">Our Key Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Income & Expense Tracking",
                                description: "Monitor your business’s financial health with our comprehensive tracking system.",
                            },
                            {
                                title: "Advanced Reporting",
                                description: "Generate in-depth financial reports, including profit and loss statements and cash flow analysis.",
                            },
                            {
                                title: "Revenue Forecasting",
                                description: "Make informed decisions with our accurate and insightful revenue forecasting tools.",
                            },
                            {
                                title: "Budget Management",
                                description: "Set, track, and manage budgets to stay on top of your financial goals.",
                            },
                            {
                                title: "Role-Based Access Control",
                                description: "Ensure data security with customized access for different team members.",
                            },
                            {
                                title: "Custom Alerts & Notifications",
                                description: "Get notified of important financial milestones and potential issues before they happen.",
                            },
                        ].map((feature, index) => (
                            <div key={index} className="bg-white p-8 rounded-lg shadow-md text-center">
                                <h3 className="text-2xl font-semibold text-[var(--secondary-color)] mb-4">{feature.title}</h3>
                                <p className="text-[var(--text-color)]">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="bg-white py-16">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-[var(--primary-color)] mb-8">Our Mission</h2>
                    <p className="text-lg text-[var(--text-color)] max-w-3xl mx-auto">
                        We aim to simplify the financial management process for businesses and help them achieve sustainable growth.
                        With <strong>Expense Edge</strong>, we’re dedicated to providing a platform that enhances efficiency, improves decision-making,
                        and fosters financial clarity.
                    </p>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="bg-white shadow-xl shadow-slate-400 py-16">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-[var(--primary-color)] mb-8">Why Choose Us?</h2>
                    <p className="text-lg text-[var(--text-color)] max-w-3xl mx-auto">
                        At <strong>Expense Edge</strong>, we are not just a financial tool – we are your partner in achieving financial success.
                        Join us in transforming how you manage your business finances and take the next step towards smarter growth.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
