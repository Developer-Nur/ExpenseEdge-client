import React, { useContext, useEffect, useState } from 'react';
import { FaAlignJustify, FaHome } from 'react-icons/fa';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { AuthInfo } from '../Provider/Authprovider';
import { FiLogOut } from 'react-icons/fi';
import Swal from 'sweetalert2';
import axios from 'axios';  // Import axios

const DashboardLayout = () => {
    const { user, logOut } = useContext(AuthInfo);  // Get user from Auth context
    const [userData, setUserData] = useState(null);  // State to store user or company data
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.email) {
            // Make the API call to check the email in companies and users collections
            axios.get(`http://localhost:5000/find-by-email?email=${user.email}`)
                .then(response => {
                    console.log("API response: ", response.data);
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
    }, [user?.email]);  // Run this effect when the user email changes

    // HANDLE LOGOUT
    const userLogout = () => {
        logOut()
            .then(() => {
                navigate('/');
            })
            .catch(error => {
                console.log("Logout error: ", error.message);
                Swal.fire({
                    position: "top-end",
                    icon: "warning",
                    title: "Can't logout at this moment",
                    showConfirmButton: false,
                    timer: 5000
                });
            });
    };

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">

                <label htmlFor="my-drawer-2" className="m-10 mt-6 mb-8 drawer-button lg:hidden">
                    <FaAlignJustify className=" bg-gray-50 text-5xl p-3 ml-3" />
                </label>

                <Outlet></Outlet>

                
            </div>

            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="space-y-3 lg:space-y-5 text-xl font-semibold p-9 md:w-80 min-h-full bg-[#16423C] text-white">
                    <li><Link className='hover:bg-[#6A9C89] flex gap-2 items-center p-2' to='/'><FaHome /> Home</Link></li>


                    {/* conditional rendering */}

                    {userData && userData === 'user' ? (  // Check if the userData type is "user"
                        <nav className="mt-4 space-y-2">
                            <NavLink className="uppercase text-white hover:text-[#16423C] flex items-center gap-2 py-2 px-4 hover:bg-white rounded-md" to='/dashboard/GeneralUser'>Add to a company</NavLink>
                        </nav>
                    ) : userData && userData === 'company' ? (  // Check if the userData type is "company"
                        <nav className="mt-4 space-y-2">
                            <NavLink className="uppercase text-white hover:text-[#16423C] flex items-center gap-2 py-2 px-4 hover:bg-white rounded-md" to='/dashboard/CompanyDashboard'>Company Dashboard</NavLink>
                        </nav>
                    ) : null}

                    <button onClick={userLogout} className='flex items-center justify-start gap-3 button mt-20 theme-color px-2 py-2 rounded-lg'>
                        Logout
                        <FiLogOut />
                    </button>
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;


