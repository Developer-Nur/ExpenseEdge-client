import React from 'react';
import LoadingSpinner from '../../../Shared/LoadingSpinner/LoadingSpinner';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const ManageUsers = () => {

    // jwt token
    const token = localStorage.getItem("access-token")
    // console.log("tghe token", token);

    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_SERVER_URL}/users`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            return data;
        }
    });

    const handleMakeAdmin = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Make Admin!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.patch(`${import.meta.env.VITE_SERVER_URL}/users/admin/${user._id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `${user.email} is an Admin Now!`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    });
            }
        });
    };


    const handleDelete = (user) => {
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
                axios.delete(`${import.meta.env.VITE_SERVER_URL}/users/admin/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "user has been deleted",
                                icon: "success"
                            });
                        }
                    })

            }
        });

    }



    if (isLoading) return <LoadingSpinner />;

    // Sort users by role, placing admins at the top
    const sortedUsers = users.sort((a, b) => (a.role === 'admin' ? -1 : 1));

    return (
        <div>
            <table className="table">
                {/* head */}
                <thead>
                    <tr className='text-xl'>
                        <th>#</th>
                        <th>User Email</th>
                        <th>User Role</th>
                        <th>Make Admin</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        sortedUsers.map((user, idx) => (
                            <tr key={user._id}>
                                <th>{idx + 1}</th>
                                <th>{user?.email}</th>
                                <th className={user?.role === 'admin' && 'font-extrabold text-green-500'}>
                                    {user?.role}
                                </th>
                                <th>
                                    <button
                                        onClick={() => handleMakeAdmin(user)}
                                        disabled={user?.role === 'admin'}
                                        className={`p-2 md:p-3 text-green-100 ${user?.role === 'admin' ? 'bg-[#2E236C] text-gray-400 cursor-not-allowed' : 'bg-[#2E236C] hover:bg-[#433D8B]'}`}
                                    >
                                        Make Admin
                                    </button>
                                </th>
                                <th><button onClick={() => handleDelete(user)} className="hover:bg-[#b32b2b] bg-[#8d2f2f] p-3 text-green-100">Delete</button></th>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;
