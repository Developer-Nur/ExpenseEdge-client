import React, { useContext } from 'react';
import { FaAlignJustify, FaHome } from 'react-icons/fa';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { AuthInfo } from '../Provider/Authprovider';



const DashboardLayout = () => {

    const { user, loader } = useContext(AuthInfo)


    if(loader){
        return <p>Loading....</p>
    }

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
                    {/* added all route  hare */}

                    <li><Link className='hover:bg-[#6A9C89] flex gap-2 items-center p-2' to='/'><FaHome /> Home</Link> </li>

                    {

                        user ?
                            <>{/* dashboard menu for admin */}
                                <nav className="mt-4 space-y-2">
                                    <NavLink onClick={() => setNavMenu(false)} className="uppercase text-white hover:text-[#16423C] flex items-center gap-2 py-2 px-4 hover:bg-white rounded-md" to='/dashboard/GeneralUser'>Add to a company</NavLink>
                                </nav>
                            </>
                            :
                            <>
                                {/* dashboard menu for regular user */}
                                <nav className="mt-4 space-y-2">

                                    <NavLink onClick={() => setNavMenu(false)} className="uppercase text-white hover:text-[#16423C] flex items-center gap-2 py-2 px-4 hover:bg-white rounded-md" to='/dashboard/CompanyDashboard'>  Company Dashboard</NavLink>


                                </nav>
                            </>
                    }



                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;