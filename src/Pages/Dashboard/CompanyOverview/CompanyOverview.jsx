import React, { useContext, useState } from 'react';
import { AuthInfo } from '../../../Provider/AuthProvider';
import { useQuery, useQueryClient } from '@tanstack/react-query'; // Import useQueryClient
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../../Shared/LoadingSpinner/LoadingSpinner';

const CompanyOverview = () => {
    const { user } = useContext(AuthInfo);
    const queryClient = useQueryClient(); // Initialize query client
    const [selectedData, setSelectedData] = useState({ date: '', income: '', expense: '' });

    const { data: persons = [] } = useQuery({
        queryKey: ['person', user?.email],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/${user?.email}`);
            return data;
        }
    });

    const { data: company = [], isLoading } = useQuery({
        queryKey: ['company', persons?.companyName],
        queryFn: async () => {
            const { data } = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/single-company/${persons?.companyName}`
            );
            return data;
        },
        enabled: !!persons?.companyName // Runs only if companyName exists
    });

    const openModal = (data) => {
        setSelectedData(data); // Store selected row data in state
        document.getElementById('update_modal').showModal(); // Open modal
    };

    const handleUpdateNow = async (e) => {
        e.preventDefault();
        const form = e.target;

        const updatedData = {
            date: selectedData.date, // Use the same date to target the correct entry
            income: form.income.value,
            expense: form.expense.value
        };

        try {
            await axios.put(`${import.meta.env.VITE_SERVER_URL}/update-company-data/${company?._id}`, updatedData);

            // Close the modal after successful update
            document.getElementById('update_modal').close();

            // Show success alert
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Data Updated Successfully',
                showConfirmButton: false,
                timer: 2000
            });

            // Refetch data to reflect the updated income and expense
            queryClient.refetchQueries(['company', persons?.companyName]);
        } catch (error) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Something went wrong',
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="dashboard-watermark h-full">
           <div className='p-6 bg-gray-100'>
           <div className="flex justify-between items-center ">
                <h2 className="text-base font-semibold text-EEPrimary">
                    Hi {persons?.name}
                </h2>
               
                <h2 className="text-base font-semibold text-EEPrimary text-right">
                    Welcome to <br /> {persons?.companyName}
                </h2>
            </div>

            <div>
            <h2 className="text-2xl font-semibold text-gray-800 text-center flex-1 mx-4">
                    Update Your Financial Data
                </h2>
            </div>
           </div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead className='text-xl'>
                        <tr>
                            <th></th>
                            <th>Date</th>
                            <th>Income</th>
                            <th>Expense</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {company?.data?.incomeExpense?.map((item, index) => (
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <td><span >{item.date}</span></td>
                                <td><span className='bg-green-200 p-2 rounded-full'>{item.income ?? 'N/A'}</span></td>
                                <td><span className='bg-red-200 p-2 rounded-full'>{item.expense ?? 'N/A'}</span></td>
                                <td>
                                    <button className="hover:bg-[#433D8B] bg-[#2E236C] p-2 md:p-3  md:px-9 text-green-100" onClick={() => openModal(item)}>
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <dialog id="update_modal" className="modal">
                <div className="modal-box">
                    <form onSubmit={handleUpdateNow}>
                        <button
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            type="button"
                            onClick={() => document.getElementById('update_modal').close()}
                        >
                            ✕
                        </button>
                        <h3 className="font-bold text-lg mb-4">Update Income & Expense</h3>
                        <div className="py-4">
                            <label>Income</label>
                            <input
                                type="number"
                                className="input input-bordered w-full mb-4"
                                value={selectedData.income}
                                onChange={(e) =>
                                    setSelectedData((prev) => ({ ...prev, income: e.target.value }))
                                }
                                name="income"
                                placeholder="Enter new income"
                                required
                            />
                            <label>Expense</label>
                            <input
                                type="number"
                                className="input input-bordered w-full"
                                value={selectedData.expense}
                                onChange={(e) =>
                                    setSelectedData((prev) => ({ ...prev, expense: e.target.value }))
                                }
                                name="expense"
                                placeholder="Enter new expense"
                                required
                            />
                        </div>
                        <button className="btn btn-primary w-full mt-4" type="submit">
                            Update Now
                        </button>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default CompanyOverview;
