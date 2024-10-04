import React, { useContext } from 'react';
import { AuthInfo } from '../../../Provider/Authprovider';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../../Shared/LoadingSpinner/LoadingSpinner';

const CompanyOverview = () => {

    const { user } = useContext(AuthInfo)
    const navigate = useNavigate()

    const { data: persons = [] } = useQuery({
        queryKey: ['person', user?.email],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/${user?.email}`)
            return data
        }
    })
    const { data: company = [], isLoading } = useQuery({
        queryKey: ['company', persons?.companyName],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_SERVER_URL}/single-company/${persons?.companyName}`)
            return data
        }
    })
console.log(company);


    const handleUpdate = async (e) => {
        e.preventDefault()
        const form = e.target
        const income = form.income.value
        const expense = form.expense.value
        const assets = form.assets.value
        const liabilities = form.liabilities.value
        const equity = form.equity.value

        const allData = { income, expense, assets, liabilities, equity }


        await axios.put(`${import.meta.env.VITE_SERVER_URL}/update-company-data/${company?._id}`, allData)
        try {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Data Updated Successfully",
                showConfirmButton: false,
                timer: 2000
            });
        } catch (error) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Something Wrong",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className='dashboard-watermark h-full'>
            <div>
                <h2 className="text-3xl md:text-5xl md:pt-10 text-center font-bold text-EEPrimary mb-4">
                    Welcome {persons?.name} to <br /> {persons?.companyName || company.name}
                </h2>
            </div>

            <div className="bg-transparent mt-20 shadow-xl lg:p-20 pt-10 mx-4 p-5 md:p-10 lg:max-w-5xl lg:mx-auto rounded-xl border-2">
                <h3 className="text-2xl pb-5 md:pb-10 text-center font-semibold mb-4 text-gray-700"> Update Your Financial Information</h3>

                <form onSubmit={handleUpdate}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-9">
                        {/* Income */}
                        <div>
                            <label className="block text-gray-600 font-medium mb-1">Income</label>
                            <input
                                type="number"
                                name="income"
                                defaultValue={company?.data?.income}
                                className="border border-gray-300 p-3 w-full rounded-lg shadow-sm focus:shadow-lg transform hover:scale-105 transition-transform duration-300"
                                placeholder="Enter total income"
                            />
                        </div>

                        {/* Expense */}
                        <div>
                            <label className="block text-gray-600 font-medium mb-1">Expense</label>
                            <input
                                type="number"
                                name="expense"
                                defaultValue={company?.data?.expense}
                                className="border border-gray-300 p-3 w-full rounded-lg shadow-sm focus:shadow-lg transform hover:scale-105 transition-transform duration-300"
                                placeholder="Enter total expense"
                            />
                        </div>

                        {/* Assets */}
                        <div>
                            <label className="block text-gray-600 font-medium mb-1">Assets</label>
                            <input
                                type="number"
                                name="assets"
                                defaultValue={company?.data?.assets}
                                className="border border-gray-300 p-3 w-full rounded-lg shadow-sm focus:shadow-lg transform hover:scale-105 transition-transform duration-300"
                                placeholder="Enter total assets"
                            />
                        </div>

                        {/* Liabilities */}
                        <div>
                            <label className="block text-gray-600 font-medium mb-1">Liabilities</label>
                            <input
                                type="number"
                                name="liabilities"
                                defaultValue={company?.data?.liabilities}
                                className="border border-gray-300 p-3 w-full rounded-lg shadow-sm focus:shadow-lg transform hover:scale-105 transition-transform duration-300"
                                placeholder="Enter total liabilities"
                            />
                        </div>

                        {/* Equity */}
                        <div>
                            <label className="block text-gray-600 font-medium mb-1">Equity</label>
                            <input
                                type="number"
                                name="equity"
                                defaultValue={company?.data?.equity}
                                className="border border-gray-300 p-3 w-full rounded-lg shadow-sm focus:shadow-lg transform hover:scale-105 transition-transform duration-300"
                                placeholder="Enter total equity"
                            />
                        </div>
                    </div>
                    <button type='submit' className='w-full mt-9 p-2 text-white text-2xl hover:bg-[#246460] bg-[#1a4744]'>Submit</button>
                </form>
            </div>

        </div>
    );
};

export default CompanyOverview;