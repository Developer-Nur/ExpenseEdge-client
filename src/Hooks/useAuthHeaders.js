import { useEffect, useState } from 'react';

const useAuthHeaders = () => {
    const [header, setHeader] = useState({});

    useEffect(() => {
        const token = localStorage.getItem("access-token");
        if (token) {
            setHeader({
                authorization: `Bearer ${token}`
            });
        }
    }, []);

    return header;
};

export default useAuthHeaders;
