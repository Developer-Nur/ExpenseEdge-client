import React from 'react';
import { RiBarChart2Fill } from 'react-icons/ri';
import { Link, NavLink } from 'react-router-dom';
const Navbar = () => {
    const user = false
    const link = <>
        <div className="flex lg:gap-10 gap-1 flex-col text-xl text-[15px] lg:flex-row" id="NavItem">
            <li><NavLink>Home</NavLink></li>
            <li><NavLink>Income</NavLink></li>
            <li><NavLink>Expenses</NavLink></li>
            <li><NavLink>Reports</NavLink></li>
        </div>
    </>
    return (
        <div className='shadow-lg h-24'>
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
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {link}
                        </ul>
                    </div>
                    <Link className="md:text-4xl lg:text-5xl text-xl font-extrabold flex items-center gap-2 text-[#6A9C89]"><RiBarChart2Fill className='text-3xl md:text-5xl lg:text-6xl text-[#16423C]' /> ExpenseEdge</Link>

                </div>

                <div className="navbar-end space-x-14">

                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1 text-xl gap-16">
                            {link}
                        </ul>
                    </div>

                    <a className="md:p-3 p-2 text-[12px] md:text-[16px] hover:cursor-pointer hover:bg-[#246460] bg-[#1a4744] text-[#dadada] font-bold">Sign Up Now</a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;