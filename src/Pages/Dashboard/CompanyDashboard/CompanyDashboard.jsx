import React, { useState, useEffect, useContext } from 'react';
import CompanyTable from '../CompanyTable/CompanyTable';
import axios from 'axios';
import { AuthInfo } from '../../../Provider/Authprovider';

const CompanyDashboard = () => {
    const {user} = useContext(AuthInfo);

    const [formData, setFormData] = useState({
        companyName: '',
        email: '',
        phoneNumber: '',
        income: '',
        expense: '',
        assets: '',
        liabilities: '',
        equity: ''
    });

    const [loading, setLoading] = useState(true);

    // Fetch company data from API on component mount
    useEffect(() => {
        axios.get("https://expense-edge.vercel.app/companies")
            .then(response => {
                // Assuming the API returns an array of companies
                const companies = response.data;

                // Using the first company in the array as the default for the form
                const firstCompany = companies[0]; // Adjust this logic based on which company you want to use

                if (firstCompany) {
                    setFormData({
                        companyName: firstCompany.name || '',
                        email: firstCompany.email || '',
                        phoneNumber: firstCompany.mobileNumber || '',
                        income: '', // Leave income blank for user input
                        expense: '', // Leave expense blank for user input
                        assets: '', // Leave assets blank for user input
                        liabilities: '', // Leave liabilities blank for user input
                        equity: '' // Leave equity blank for user input
                    });
                }
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching company data:", error);
                setLoading(false);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.patch(`${import.meta.env.VITE_SERVER_URL}/company/${user.email}`, formData)
            .then(response => {
                console.log(response.data);
                console.log("Form submitted:", formData);
            })
            .catch(error => {
                console.error("Error submitting form:", error);
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-8 rounded-3xl shadow-2xl max-w-5xl mx-auto mt-10">
            <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Company Revenue Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="flex space-x-6">
                    {/* Company Details Section */}
                    <div className="bg-white p-6 rounded-xl shadow-inner flex-1">
                        <h3 className="text-xl font-semibold mb-4 text-gray-700">Company Information</h3>
                        <div className="mb-4">
                            <label className="block text-gray-600 font-medium mb-1">Company Name</label>
                            <input
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                className="border border-gray-300 p-3 w-full rounded-lg shadow-sm focus:shadow-lg transform hover:scale-105 transition-transform duration-300"
                                placeholder="Enter company name"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-600 font-medium mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="border border-gray-300 p-3 w-full rounded-lg shadow-sm focus:shadow-lg transform hover:scale-105 transition-transform duration-300"
                                placeholder="Enter company email"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-600 font-medium mb-1">Phone Number</label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="border border-gray-300 p-3 w-full rounded-lg shadow-sm focus:shadow-lg transform hover:scale-105 transition-transform duration-300"
                                placeholder="Enter phone number"
                            />
                        </div>
                    </div>

                    {/* Financial Details Section */}
                    <div className="bg-white p-6 rounded-xl shadow-inner flex-1">
                        <h3 className="text-xl font-semibold mb-4 text-gray-700">Financial Information</h3>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Income */}
                            <div className="mb-4">
                                <label className="block text-gray-600 font-medium mb-1">Income</label>
                                <input
                                    type="number"
                                    name="income"
                                    value={formData.income}
                                    onChange={handleChange}
                                    className="border border-gray-300 p-3 w-full rounded-lg shadow-sm focus:shadow-lg transform hover:scale-105 transition-transform duration-300"
                                    placeholder="Enter total income"
                                />
                            </div>

                            {/* Expense */}
                            <div className="mb-4">
                                <label className="block text-gray-600 font-medium mb-1">Expense</label>
                                <input
                                    type="number"
                                    name="expense"
                                    value={formData.expense}
                                    onChange={handleChange}
                                    className="border border-gray-300 p-3 w-full rounded-lg shadow-sm focus:shadow-lg transform hover:scale-105 transition-transform duration-300"
                                    placeholder="Enter total expense"
                                />
                            </div>

                            {/* Assets */}
                            <div className="mb-4">
                                <label className="block text-gray-600 font-medium mb-1">Assets</label>
                                <input
                                    type="number"
                                    name="assets"
                                    value={formData.assets}
                                    onChange={handleChange}
                                    className="border border-gray-300 p-3 w-full rounded-lg shadow-sm focus:shadow-lg transform hover:scale-105 transition-transform duration-300"
                                    placeholder="Enter total assets"
                                />
                            </div>

                            {/* Liabilities */}
                            <div className="mb-4">
                                <label className="block text-gray-600 font-medium mb-1">Liabilities</label>
                                <input
                                    type="number"
                                    name="liabilities"
                                    value={formData.liabilities}
                                    onChange={handleChange}
                                    className="border border-gray-300 p-3 w-full rounded-lg shadow-sm focus:shadow-lg transform hover:scale-105 transition-transform duration-300"
                                    placeholder="Enter total liabilities"
                                />
                            </div>

                            {/* Equity */}
                            <div className="mb-4">
                                <label className="block text-gray-600 font-medium mb-1">Equity</label>
                                <input
                                    type="number"
                                    name="equity"
                                    value={formData.equity}
                                    onChange={handleChange}
                                    className="border border-gray-300 p-3 w-full rounded-lg shadow-sm focus:shadow-lg transform hover:scale-105 transition-transform duration-300"
                                    placeholder="Enter total equity"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-3 px-6 mt-6 rounded-lg w-full font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300"
                >
                    Submit Financial Data
                </button>
            </form>

            <CompanyTable />
        </div>
    );
};

export default CompanyDashboard;
