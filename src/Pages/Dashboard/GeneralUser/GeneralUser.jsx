import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import LoadingSpinner from '../../../Shared/LoadingSpinner/LoadingSpinner';
import Swal from 'sweetalert2';
import { AuthInfo } from '../../../Provider/Authprovider';

const GeneralUser = () => {
    const { user } = useContext(AuthInfo);
    const [pendingCompany, setPendingCompany] = useState(null); 

    // fetch company data 
    const { data: companies = [], isLoading } = useQuery({
        queryKey: ['companies'],
        queryFn: async () => {
            const { data } = await axios.get('https://expense-edge.vercel.app/companies');
            return data;
        }
    });



    const handleJoin = async (company) => {
        Swal.fire({
            title: `Are you sure you want to join ${company.name}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#16423C",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const useremail = user.email;
                try {
                    setPendingCompany(company._id); 
                    await axios.put(`https://expense-edge.vercel.app/users/${useremail}`, {
                        companyName: company.name,
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
        <div
            style={{
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.953), #ffffffda), url(../public/favicon.png)`,
                backgroundPosition: '65%',
                backgroundAttachment: 'fixed',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
            }}
            className="h-[100vh] w-full"
        >
            <h2 className="text-3xl md:text-4xl md:pt-10 text-center font-bold text-EEPrimary mb-4">
                Collaborate With Your <br /> Company
            </h2>
            
            {/* Table */}
            <div className="overflow-x-auto">
                <table className="table text-xl">
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
                                <td>{company.name}</td>
                                <td>{company.email}</td>
                                <th>
                                    <button
                                        onClick={() => handleJoin(company)}
                                        disabled={pendingCompany === company._id}
                                        className={`btn ${
                                            pendingCompany === company._id ? 'bg-gray-500 cursor-not-allowed' : 'hover:bg-[#246460] bg-[#1a4744]'
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
