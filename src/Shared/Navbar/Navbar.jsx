import React, { useContext, useEffect, useState } from 'react';
import { RiBarChart2Fill } from 'react-icons/ri';
import { Link, NavLink } from 'react-router-dom';
import { AuthInfo } from '../../Provider/Authprovider';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import logo from '../../assets/LogoExpense.png'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';

const Navbar = () => {
    const { user, loader } = useContext(AuthInfo)
    const [userData, setUserData] = useState(null);  // State to store user or company data
    // const { theUser, setTheUser } = useState()

    // console.log("the user is", user, "and loading status", loader);

    // const theUser = setTheUser(user)
    const { data: singleUser = [], isLoading } = useQuery({
        queryKey: ['user', user?.email],
        enabled: !loader && !!user?.email,
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/${user?.email}`);
            return data; // Return the entire data object containing both righter and role
        }
    });

    const righter = singleUser.righter || '';
    const role = singleUser.role || '';
    console.log(role, righter)

    useEffect(() => {
        if (user?.email) {
            // Make the API call to check the email in companies and users collections
            axios.get(`${import.meta.env.VITE_SERVER_URL}/find-by-email?email=${user.email}`)
                .then(response => {
                    // console.log("API response: ", response.data);
                    setUserData(response.data);  // Set the returned data (either user or company)
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "Failed to load data",
                        showConfirmButton: false,
                        timer: 5000
                    });
                });
        }
    }, [user?.email]);








    const link = <>
        <div className="flex text-[#2E236C] font-extrabold lg:gap-6 gap-1 flex-col  lg:flex-row" id="NavItem">
            <li ><NavLink to="/">Home</NavLink></li>
            <li ><NavLink to="/aboutUs">About Us</NavLink></li>
            <li ><NavLink to="/contactUs">Contact Us</NavLink></li>
        </div>
    </>

    if (loader) {
        return <LoadingSpinner></LoadingSpinner>
    }
    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }



    return (



        <div className='shadow-lg  md:h-24'>
            <div className="navbar  bg-base-100 pt-4 container mx-auto font-poppins">
                <div className="navbar-start flex items-center">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>

                        {/* menu for small device */}
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {link}
                        </ul>
                    </div>
                    {/* <Link className="md:text-4xl lg:text-5xl text-2xl font-extrabold flex items-center gap-2 text-[#6A9C89]"><RiBarChart2Fill className='text-3xl md:text-5xl lg:text-6xl text-[#16423C]' /> ExpenseEdge</Link> */}
                    <img className='h-[60px] w-auto ml-4' src={logo} alt="Logo" /> 
                </div>

                <div className="navbar-end space-x-14">

                    {/* menu for large device */}
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal text-base px-1 gap-6">
                            {link}
                        </ul>
                    </div>


                    {/*  */}

                    {
                        user ? (
                            role === 'admin' ? (
                                <Link
                                    to="/dashboard/ManageUsers"
                                    className="rounded-lg md:p-3 p-2 text-[12px] md:text-[16px] hover:cursor-pointer hover:bg-[#433D8B] bg-[#2E236C] text-white font-bold"
                                >
                                    Dashboard
                                </Link>
                            ) : userData && userData === 'company' ? (
                                <Link
                                    to="/dashboard/CompanyDashboard"
                                    className="rounded-lg md:p-3 p-2 text-[12px] md:text-[16px] hover:cursor-pointer hover:bg-[#433D8B] bg-[#2E236C] text-white font-bold"
                                >
                                    Dashboard
                                </Link>
                            ) : role !== 'admin' && righter === 'approved' ? (
                                <Link
                                    to="/dashboard/CompanyOverview"
                                    className="rounded-lg md:p-3 p-2 text-[12px] md:text-[16px] hover:cursor-pointer hover:bg-[#433D8B] bg-[#2E236C] text-white font-bold"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <Link
                                    to="/dashboard/GeneralUser"
                                    className="rounded-lg md:p-3 p-2 text-[12px] md:text-[16px] hover:cursor-pointer hover:bg-[#433D8B] bg-[#2E236C] text-white font-bold"
                                >
                                    Dashboard
                                </Link>
                            )
                        ) : (
                            <Link
                                to="/Login"
                                className="rounded-lg md:p-3 p-2 text-[12px] md:text-[16px] hover:cursor-pointer hover:bg-[#433D8B] bg-[#2E236C] text-[#dadada] font-bold"
                            >
                                Login
                            </Link>
                        )
                    }




                </div>
            </div>
        </div>
    );
};

export default Navbar;