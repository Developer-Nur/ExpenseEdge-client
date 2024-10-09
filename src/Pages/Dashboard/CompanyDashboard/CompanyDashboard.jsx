import React, { useState, useEffect, useContext } from 'react';
import CompanyTable from '../CompanyTable/CompanyTable';
import axios from 'axios';
import { AuthInfo } from '../../../Provider/Authprovider';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../../Shared/LoadingSpinner/LoadingSpinner';


const CompanyDashboard = () => {
    const { user } = useContext(AuthInfo); // Ensure this context provides 'user'
    const [companyData, setCompanyData] = useState({});
    const [loading, setLoading] = useState(true);





    // console.log("the company", companyData);
    // console.log("token", localStorage.getItem("access-token"));

    // if the company email and user email matches then fetch the company info 
    useEffect(() => {
        if (user?.email) {
            axios.get(`${import.meta.env.VITE_SERVER_URL}/company-info/${user.email}`)
                .then(res => {
                    // console.log("company data found is", res.data);
                    setCompanyData(res.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching company data:", error);
                    setLoading(false);
                });
        }
    }, [user?.email]);


    // to collect the company value data and update
    const handleSubmit = (e) => {
        e.preventDefault()

        const data = e.target;

        const companyValue = {
            income: data.income.value,
            expense: data.expense.value,
            assets: data.assets.value,
            liabilities: data.liabilities.value,
            equity: data.equity.value
        };


        const token = localStorage.getItem("access-token")
        // console.log("tghe token", token);


        axios.patch(`${import.meta.env.VITE_SERVER_URL}/company/${user.email}`, companyValue, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.data.acknowledged) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                };
                // console.log(response.data);
            })
            .catch(error => {
                console.error("Error submitting form:", error);
            });
    };

    if (loading) {
        return <LoadingSpinner></LoadingSpinner>
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
                            {companyData?.companyName}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-800 text-lg lg:ml-32">
                            <span className="font-medium">Phone: </span>
                            {companyData?.mobileNumber
                            }
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

