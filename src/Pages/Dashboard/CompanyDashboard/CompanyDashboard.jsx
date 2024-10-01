import React, { useState, useEffect, useContext } from 'react';
import CompanyTable from '../CompanyTable/CompanyTable';
import axios from 'axios';
import { AuthInfo } from '../../../Provider/Authprovider';

const CompanyDashboard = () => {
    const { user } = useContext(AuthInfo);

    const [formData, setFormData] = useState({
        income: '',
        expense: '',
        assets: '',
        liabilities: '',
        equity: '',
        companyName: '',
        phoneNumber: ''
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("https://expense-edge.vercel.app/companies")
            .then(response => {
                const companies = response.data;
                const firstCompany = companies[0];

                if (firstCompany) {
                    setFormData(prevFormData => ({
                        ...prevFormData,
                        companyName: firstCompany.name || '',
                        phoneNumber: firstCompany.mobileNumber || ''
                    }));
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
        axios.post("https://expense-edge.vercel.app/company-data", formData)
            .then(response => {
                console.log(response.data);
                console.log("Form submitted:", formData);
            })
            .catch(error => {
                console.error("Error submitting form:", error);
            });
    };

    if (loading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            {/* Title Section */}
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-12 tracking-wide">Company Dashboard</h1>

            {/* Company Information */}
            <div className="bg-gray-100 p-8 rounded-xl shadow-md mb-10 border border-gray-300">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Company Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                        <p className="text-gray-800 text-lg lg:ml-32">
                            <span className="font-medium">Name: </span>
                            {formData.companyName}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-800 text-lg lg:ml-32">
                            <span className="font-medium">Phone: </span>
                            {formData.phoneNumber}
                        </p>
                    </div>
                </div>
            </div>

            {/* Financial Form */}
            <form onSubmit={handleSubmit} className="bg-blue-50 p-10 rounded-xl shadow-lg mb-10 border border-gray-300">
                <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Financial Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Income */}
                    <div>
                        <label className="block text-gray-800 font-medium mb-2">Income</label>
                        <input
                            type="number"
                            name="income"
                            value={formData.income}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="Enter total income"
                        />
                    </div>

                    {/* Expense */}
                    <div>
                        <label className="block text-gray-800 font-medium mb-2">Expense</label>
                        <input
                            type="number"
                            name="expense"
                            value={formData.expense}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="Enter total expense"
                        />
                    </div>

                    {/* Assets */}
                    <div>
                        <label className="block text-gray-800 font-medium mb-2">Assets</label>
                        <input
                            type="number"
                            name="assets"
                            value={formData.assets}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="Enter total assets"
                        />
                    </div>

                    {/* Liabilities */}
                    <div>
                        <label className="block text-gray-800 font-medium mb-2">Liabilities</label>
                        <input
                            type="number"
                            name="liabilities"
                            value={formData.liabilities}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="Enter total liabilities"
                        />
                    </div>

                    {/* Equity */}
                    <div>
                        <label className="block text-gray-800 font-medium mb-2">Equity</label>
                        <input
                            type="number"
                            name="equity"
                            value={formData.equity}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="Enter total equity"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#16423C] text-white font-semibold py-3 px-6 mt-10 rounded-lg shadow hover:bg-blue-700 transition duration-300"
                >
                    Submit Financial Data
                </button>
            </form>

            {/* Company Table Section */}
            <div>
                <CompanyTable />
            </div>
        </div>
    );
};

export default CompanyDashboard;
