import React, { useState, useEffect } from "react";
import CountUp from 'react-countup';
import 'tailwindcss/tailwind.css';

const Reports = () => {
  const [successCount, setSuccessCount] = useState(0);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {

    setTimeout(() => {
      setSuccessCount(350);
      setDataFetched(true);
    }, 1500);
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">Financial Overview</h1>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        

        <div className="bg-white shadow-md rounded-lg p-4 text-center">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Success Counter</h2>
          {dataFetched ? (
            <CountUp className="text-4xl font-bold text-green-500" end={successCount} duration={2} />
          ) : (
            <div className="animate-pulse text-4xl font-bold text-gray-300">Loading...</div>
          )}
          <p className="text-gray-500 mt-1 text-sm">Successful Transactions</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 text-center">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Income</h2>
          <p className="text-2xl font-bold text-blue-500">$10,200</p>
          <p className="text-gray-500 mt-1 text-sm">This month</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 text-center">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Expenses</h2>
          <p className="text-2xl font-bold text-red-500">$8,750</p>
          <p className="text-gray-500 mt-1 text-sm">This month</p>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h3 className="text-md font-semibold text-gray-700 mb-2">Income vs Expenses Progress</h3>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-gray-600 text-sm">Income</span>
            <span className="text-blue-500 text-sm">$10,200</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-gray-600 text-sm">Expenses</span>
            <span className="text-red-500 text-sm">$8,750</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '60%' }}></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-md font-semibold text-gray-700 mb-2">Monthly Income Growth</h3>
          <p className="text-gray-600 text-sm">Growth rate: <span className="font-bold text-green-500">+15%</span></p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-md font-semibold text-gray-700 mb-2">Monthly Expenses Growth</h3>
          <p className="text-gray-600 text-sm">Growth rate: <span className="font-bold text-red-500">+8%</span></p>
        </div>
      </div>
    </div>
  );
};

export default Reports;


