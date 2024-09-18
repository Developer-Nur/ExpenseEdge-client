import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../Shared/Header/NavBar';
// import Navbar from '../Components/Header/Navbar';

const Root = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;