import React from 'react';
import LoadingSpinner from '../../../Shared/LoadingSpinner/LoadingSpinner';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const ManageCompany = () => {

    // jwt token
    const token = localStorage.getItem("access-token")
    // console.log("the token", token);

    const { data: companies = [], refetch, isLoading } = useQuery({
        queryKey: ['companies'],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_SERVER_URL}/companies`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            return data
        }
    })
    console.log(companies);

    const handleDelete = (company) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${import.meta.env.VITE_SERVER_URL}/company/${company._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "company has been deleted",
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }

    if (isLoading) return <LoadingSpinner />

    return (
        <div>
            <table className="table">
                {/* head */}
                <thead>
                    <tr className='text-xl'>
                        <th>#</th>
                        <th>Company Name</th>
                        <th>Company Email</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        companies.map((company, idx) => <tr key={company._id}>
                            <th>{idx + 1}</th>
                            <th>{company?.companyName}</th>
                            <th><span className='text-gray-800 bg-blue-200 p-2 rounded-xl'>{company?.email}</span></th>
                            <th><button onClick={() => handleDelete(company)} className="hover:bg-[#a73d3d] bg-[#8d2f2f] p-3 text-green-100">Delete</button></th>

                        </tr>)
                    }



                </tbody>
            </table>
        </div>
    );
};

export default ManageCompany;