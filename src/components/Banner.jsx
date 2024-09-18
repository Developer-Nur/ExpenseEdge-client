import React from 'react';

const Banner = () => {
    return (
        <>
            <section className="flex flex-col md:flex-row justify-center items-center p-6">
                <div className="flex flex-col md:flex-row max-w-6xl w-full">
                    {/* Left Column intro */}
                    <div className="flex-1 p-6 self-center">
                        <h1 className="text-4xl font-bold text-blue-600 mb-4">
                            Grow Your Business with ExpenseEdge
                        </h1>
                        <p className="text-lg text-gray-800 mb-6">
                            Streamline your accounting process and manage your finances
                            efficiently.
                        </p>
                        <button className="btn bg-blue-600 text-white text-w mb-4">Get Started</button>
                    </div>

                    {/* Right Column form */}
                    <div className="flex-1 p-6">
                        <form className="w-full max-w-sm mx-auto bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
                                Sign up for free
                            </h2>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Company Name"
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <select className="select select-bordered w-full">
                                    <option value="bangladesh">Bangladesh</option>
                                    <option value="india">India</option>
                                    <option value="usa">USA</option>
                                </select>
                            </div>
                            <div className="flex items-start mb-4">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    className="checkbox checkbox-primary"
                                    required
                                />
                                <label htmlFor="terms" className="ml-2 text-gray-600">
                                    I agree to the{" "}
                                    <a href="#" className="text-blue-600 underline">
                                        Terms of Service
                                    </a>{" "}
                                    and{" "}
                                    <a href="#" className="text-blue-600 underline">
                                        Privacy Policy
                                    </a>
                                </label>
                            </div>
                            <button type="submit" className="btn btn-primary w-full">
                                Start 14-day Free Trial
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>);
};

export default Banner;

