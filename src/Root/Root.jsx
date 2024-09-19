import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../Shared/Header/NavBar';
// import Navbar from '../Components/Header/Navbar';

const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>         
        </div>
    );
};

export default Root;
