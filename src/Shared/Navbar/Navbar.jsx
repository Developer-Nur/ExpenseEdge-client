import React, { useContext, useState } from 'react';
import { RiBarChart2Fill } from 'react-icons/ri';
import { Link, NavLink } from 'react-router-dom';
import { AuthInfo } from '../../Provider/Authprovider';

const Navbar = () => {
    const { user, loader } = useContext(AuthInfo)
    // const { theUser, setTheUser } = useState()

    // console.log("the user is", user, "and loading status", loader);

    // const theUser = setTheUser(user)


    const link = <>
        <div className="flex text-[#16423C] font-extrabold lg:gap-6 gap-1 flex-col  lg:flex-row" id="NavItem">
            <li ><NavLink to="/">Home</NavLink></li>
            {/* <li ><NavLink to="/">Income</NavLink></li>
            <li ><NavLink to="/">Expenses</NavLink></li>
            <li ><NavLink to="/">Reports</NavLink></li> */}
            <li ><NavLink to="/aboutUs">About Us</NavLink></li>
        </div>
    </>

    if (loader) {
        return <p>Loading....</p>
    }



    return (



        <div className='shadow-lg  md:h-24'>
            <div className="navbar  bg-base-100 pt-4 container mx-auto font-poppins">
                <div className="navbar-start">
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
                    <Link className="md:text-4xl lg:text-5xl text-2xl font-extrabold flex items-center gap-2 text-[#6A9C89]"><RiBarChart2Fill className='text-3xl md:text-5xl lg:text-6xl text-[#16423C]' /> ExpenseEdge</Link>

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
                        user ?
                            <Link to="/dashboard" className="rounded-lg md:p-3 p-2 text-[12px] md:text-[16px] hover:cursor-pointer hover:bg-[#246460] bg-[#1a4744] text-[#dadada] font-bold"> Dashboard

                            </Link>

                            :
                            <Link to="/Login" className="rounded-lg md:p-3 p-2 text-[12px] md:text-[16px] hover:cursor-pointer hover:bg-[#246460] bg-[#1a4744] text-[#dadada] font-bold"> Login </Link>

                    }



                </div>
            </div>
        </div>
    );
};

export default Navbar;