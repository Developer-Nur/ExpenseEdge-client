import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthInfo } from '../Provider/AuthProvider';
import LoadingSpinner from '../Shared/LoadingSpinner/LoadingSpinner';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {

    const { user, loader } = useContext(AuthInfo)


    const { data: singleUser = {}, isLoading } = useQuery({
        queryKey: ['user', user?.email],
        enabled: !loader && !!user?.email,
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/${user?.email}`);
            return data;
        }
    });
    const role = singleUser.role || '';

    if (isLoading) return <LoadingSpinner></LoadingSpinner>

    if (role === 'admin') return children
    return <Navigate to='/'></Navigate>

};

export default AdminRoute;