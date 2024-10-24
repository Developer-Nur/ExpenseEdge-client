import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import LoadingSpinner from '../../../Shared/LoadingSpinner/LoadingSpinner';
import Swal from 'sweetalert2';
import { AuthInfo } from '../../../Provider/AuthProvider';
// import useAuthHeaders from "../../../Hooks/useAuthHeaders"

const GeneralUser = () => {
    const { user } = useContext(AuthInfo);
    const [pendingCompany, setPendingCompany] = useState(null);


    // fetch company data 
    const { data: companies = [], isLoading } = useQuery({
        queryKey: ['companies'],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_SERVER_URL}/companies`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("access-token")}`
                }
            });
            return data;
        }
    });



    const handleJoin = async (company) => {
        Swal.fire({
            title: `Are you sure you want to join ${company.companyName}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#433D8B",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const useremail = user.email;
                try {
                    setPendingCompany(company._id);
                    await axios.put(`${import.meta.env.VITE_SERVER_URL}/users/${useremail}`, {
                        companyName: company.companyName,
                        righter: 'pending'
                    });
                    Swal.fire({
                        title: "Request Sent successfully",
                        text: "Wait For Approval",
                        icon: "success"
                    });
                } catch (error) {
                    setPendingCompany(null);
                    Swal.fire({
                        title: "Error",
                        text: "Failed to send request. Try again.",
                        icon: "error"
                    });
                }
            }
        });
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div>
            <h2 className="text-3xl md:text-4xl md:pt-10 text-center font-bold text-EEPrimary mb-4">
                Collaborate With Your <br /> Company
            </h2>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="table md:text-xl">
                    {/* head */}
                    <thead className='text-xl'>
                        <tr>
                            <th>#</th>
                            <th>Company Name</th>
                            <th>Support Email</th>
                            <th>Join Here</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companies.map((company, idx) => (
                            <tr key={company._id}>
                                <th>{idx + 1}</th>
                                <td><span className='text-gray-800 bg-blue-200 p-2 rounded-xl'>{company.companyName}</span></td>
                                <td><span className='text-gray-800 bg-green-200 p-2 rounded-xl'>{company.email}</span></td>
                                <th>
                                    <button
                                        onClick={() => handleJoin(company)}
                                        disabled={pendingCompany === company._id}
                                        className={`btn ${pendingCompany === company._id ? 'bg-gray-500 cursor-not-allowed' : 'hover:bg-[#433D8B] bg-[#2E236C] p-2 md:p-3  md:px-4 text-green-100'
                                            } text-white`}
                                    >
                                        {pendingCompany === company._id ? 'Pending' : 'Join Now'}
                                    </button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GeneralUser;
