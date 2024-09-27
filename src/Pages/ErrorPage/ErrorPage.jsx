import React from 'react';
import { Link } from 'react-router-dom';
import { RiErrorWarningLine } from 'react-icons/ri';

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[var(--section-bg)] text-center p-5">
            <RiErrorWarningLine className="text-[var(--primary-color)] text-7xl mb-5" />
            <h1 className="text-4xl lg:text-6xl font-bold text-[var(--primary-color)] mb-3">
                404
            </h1>
            <h2 className="text-2xl lg:text-3xl font-semibold text-[var(--secondary-color)] mb-5">
                Oops! Page Not Found
            </h2>
            <p className="text-[var(--text-color)] text-lg lg:text-xl mb-8">
                The page you’re looking for doesn’t exist or has been moved.
            </p>
            <Link
                to="/"
                className="px-6 py-3 rounded-lg bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)] transition duration-300"
            >
                Go Back Home
            </Link>
        </div>
    );
};

export default ErrorPage;
