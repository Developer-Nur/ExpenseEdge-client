import React, { useState, useEffect, useContext } from 'react';
import CompanyTable from '../CompanyTable/CompanyTable';
import axios from 'axios';
import { AuthInfo } from '../../../Provider/Authprovider';
import Swal from 'sweetalert2';
// import LoadingSpinner from '../../../shared/LoadingSpinner/LoadingSpinner';
import LoadingSpinner from '../../../Shared/LoadingSpinner/LoadingSpinner';


const CompanyDashboard = () => {
    const { user } = useContext(AuthInfo); // Ensure this context provides 'user'
    const [companyData, setCompanyData] = useState({});
    const [loading, setLoading] = useState(true);





    console.log("the company", user.email);
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
            equity: data.equity.value,
            expectedIncome: data.expectedIncome.value
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
        <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Title Section */}
        <h1 className="text-4xl font-bold text-center text-[#17153B] mb-16 tracking-wide">
          Company Dashboard
        </h1>
      
        {/* Company Information */}
        <div className="bg-white rounded-lg p-4 shadow-md mb-8 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
  <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-start">
    Company Information
  </h2>
  <div className="space-y-2">
    <div>
      <p className="text-gray-700 text-base">
        <span className="font-semibold text-gray-900">Name: </span>
        {companyData?.companyName}
      </p>
    </div>
    <div>
      <p className="text-gray-700 text-base">
        <span className="font-semibold text-gray-900">Phone: </span>
        {companyData?.mobileNumber}
      </p>
    </div>
  </div>
</div>


      
        {/* Financial Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-gradient-to-r from-blue-50 to-purple-100 p-12 rounded-3xl shadow-xl mb-12 border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
        >
          <h3 className="text-3xl font-semibold text-gray-800 mb-10 text-center">
            Financial Information
          </h3>
      
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Income */}
            <div>
              <label className="block text-gray-800 font-semibold mb-3">Income</label>
              <input
                type="number"
                name="income"
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-300 focus:outline-none hover:shadow-lg transition-shadow duration-200"
                placeholder="Enter total income"
              />
            </div>
      
            {/* Expense */}
            <div>
              <label className="block text-gray-800 font-semibold mb-3">Expense</label>
              <input
                type="number"
                name="expense"
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-300 focus:outline-none hover:shadow-lg transition-shadow duration-200"
                placeholder="Enter total expense"
              />
            </div>
      
            {/* Assets */}
            <div>
              <label className="block text-gray-800 font-semibold mb-3">Assets</label>
              <input
                type="number"
                name="assets"
                defaultValue={companyData.data?.balanceData[0].amount || 0}
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-300 focus:outline-none hover:shadow-lg transition-shadow duration-200"
                placeholder="Enter total assets"
              />
            </div>
      
            {/* Liabilities */}
            <div>
              <label className="block text-gray-800 font-semibold mb-3">
                Liabilities
              </label>
              <input
                type="number"
                name="liabilities"
                defaultValue={companyData.data?.balanceData[1].amount || 0}
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-300 focus:outline-none hover:shadow-lg transition-shadow duration-200"
                placeholder="Enter total liabilities"
              />
            </div>
      
            {/* Equity */}
            <div>
              <label className="block text-gray-800 font-semibold mb-3">Equity</label>
              <input
                type="number"
                name="equity"
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-300 focus:outline-none hover:shadow-lg transition-shadow duration-200"
                placeholder="Enter total equity"
              />
            </div>
      
            {/* Expected Income */}
            <div>
              <label className="block text-gray-800 font-semibold mb-3">
                Expected Income
              </label>
              <input
                type="number"
                name="expectedIncome"
                defaultValue={companyData.data?.balanceData[3].amount || 0}
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-300 focus:outline-none hover:shadow-lg transition-shadow duration-200"
                placeholder="Enter expected income"
              />
            </div>
          </div>
      
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 px-6 mt-10 rounded-xl shadow-lg hover:opacity-90 transition-opacity duration-300"
          >
            Submit Financial Data
          </button>
        </form>
      
        {/* Company Table Section */}
        <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <CompanyTable />
        </div>
      </div>
      

    );
};

export default CompanyDashboard;

