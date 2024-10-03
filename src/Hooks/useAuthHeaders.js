import { useEffect, useState } from 'react';

const useAuthHeaders = () => {
    const [headers, setHeaders] = useState({});

    useEffect(() => {
        const token = localStorage.getItem("access-token");
        if (token) {
            setHeaders({
                authorization: `Bearer ${token}`
            });
        }
    }, []);

    return headers;
};

export default useAuthHeaders;
