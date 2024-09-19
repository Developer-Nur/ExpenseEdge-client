import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from "../Shared/Header/NavBar"


const Root = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;