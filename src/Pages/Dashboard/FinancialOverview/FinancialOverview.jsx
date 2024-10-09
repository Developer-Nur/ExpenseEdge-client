import React from 'react';

const FinancialOverview = () => {
    return (
        <div className='p-10'>
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

export default FinancialOverview;