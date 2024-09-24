import React from 'react';
import { FaAlignJustify, FaHome } from 'react-icons/fa';
import { Link, Outlet } from 'react-router-dom';
const DashboardLayout = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">

                <label htmlFor="my-drawer-2" className="m-10 mt-6 mb-8 drawer-button lg:hidden"><FaAlignJustify className=" bg-gray-50 text-5xl p-3 ml-3" /></label>

                <Outlet></Outlet>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="space-y-3 lg:space-y-5 text-xl font-semibold p-9 md:w-80 min-h-full bg-[#16423C] text-white">
                    {/* all route add hare */}
                    
                    <li><Link className='hover:bg-[#6A9C89] flex gap-2 items-center p-2'  to='/'><FaHome /> Home</Link> </li>
                   
                    
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;