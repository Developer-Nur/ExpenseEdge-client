import React, { useState } from 'react';
import CompanyTable from '../CompanyTable/CompanyTable';

const CompanyDashboard = () => {
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    return (
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-8 rounded-3xl shadow-2xl max-w-5xl mx-auto mt-10">
            <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Company Revenue Form</h2>
            <form onSubmit={handleSubmit} className="flex space-x-6">
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
            </form>

            {/* Submit Button */}
            <button
                type="submit"
                className="bg-blue-600 text-white py-3 px-6 mt-6 rounded-lg w-full font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300"
            >
                Submit Financial Data
            </button>
            <CompanyTable></CompanyTable>
        </div>
    );
};

export default CompanyDashboard;
