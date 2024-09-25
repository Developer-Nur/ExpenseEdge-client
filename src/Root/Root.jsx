import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';
import Navbar from '../Shared/Navbar/Navbar';


const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='max-w-7xl mx-auto w-full px-6 md:px-0 lg:px-0 md:w-11/12 lg:w-11/12'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Root;