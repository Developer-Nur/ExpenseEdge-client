import React, { useContext } from 'react';
import { AuthInfo } from '../Provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../Shared/LoadingSpinner/LoadingSpinner';

const PrivateRoute = ({ children }) => {
    const { user, loader } = useContext(AuthInfo)

    const location = useLocation()

    if (loader) return <LoadingSpinner />
    if (user) return children
    return <Navigate to='/login' state={location.pathname} replace='true' />
};

export default PrivateRoute;