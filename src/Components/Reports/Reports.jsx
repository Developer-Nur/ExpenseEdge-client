import React, { useState, useEffect } from "react";
import CountUp from 'react-countup';
import { FaBuilding, FaTrophy, FaChartLine } from 'react-icons/fa';
import 'tailwindcss/tailwind.css';

const Reports = () => {
  const [successCount, setSuccessCount] = useState(0);
  const [totalCompanies, setTotalCompanies] = useState(0);
  const [successfulCompanies, setSuccessfulCompanies] = useState(0);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setSuccessCount(350);  // Example for successful transactions
      setTotalCompanies(150);  // Example for total companies
      setSuccessfulCompanies(120);  // Example for companies that had success
      setDataFetched(true);
    }, 1500);
  }, []);

  return (
    <div className="p-10 pb-8 bg-gray-100">
      <h1 className="text-3xl font-semibold text-center mb-8 text-[#2E236C]">Expense Edge Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Total Companies */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <FaBuilding className="text-4xl text-blue-500 mx-auto mb-3" />
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Companies</h2>
          {dataFetched ? (
            <CountUp className="text-4xl font-bold text-blue-500" end={totalCompanies} duration={2} />
          ) : (
            <div className="animate-pulse text-4xl font-bold text-gray-300">Loading...</div>
          )}
          <p className="text-gray-500 mt-1 text-sm">Companies on the platform</p>
        </div>

        {/* Successful Companies */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <FaTrophy className="text-4xl text-green-500 mx-auto mb-3" />
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Successful Companies</h2>
          {dataFetched ? (
            <CountUp className="text-4xl font-bold text-green-500" end={successfulCompanies} duration={2} />
          ) : (
            <div className="animate-pulse text-4xl font-bold text-gray-300">Loading...</div>
          )}
          <p className="text-gray-500 mt-1 text-sm">Companies achieving success</p>
        </div>

        {/* Success Counter */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <FaChartLine className="text-4xl text-purple-500 mx-auto mb-3" />
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Success Counter</h2>
          {dataFetched ? (
            <CountUp className="text-4xl font-bold text-purple-500" end={successCount} duration={2} />
          ) : (
            <div className="animate-pulse text-4xl font-bold text-gray-300">Loading...</div>
          )}
          <p className="text-gray-500 mt-1 text-sm">Successful Transactions</p>
        </div>
      </div>
    </div>
  );
};

export default Reports;



