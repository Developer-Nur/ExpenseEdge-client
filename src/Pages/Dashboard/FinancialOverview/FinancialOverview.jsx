

// import React, { useContext, useEffect, useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import { Chart, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
// import "../../../index.css"
// import { AuthInfo } from '../../../Provider/Authprovider';
// import axios from 'axios';

// // Register necessary Chart.js components
// Chart.register(LineElement, CategoryScale, LinearScale, PointElement);

// const FinancialOverview = () => {
//     const { user } = useContext(AuthInfo);
//     const [companyData, setCompanyData] = useState({});
//     console.log("company info is", companyData);



//     useEffect(() => {
//         if (user?.email) {
//             axios.get(`${import.meta.env.VITE_SERVER_URL}/financial-info/${user.email}`)
//                 .then(res => {
//                     // console.log("company data found is", res.data);
//                     setCompanyData(res.data);
//                     setLoading(false);
//                 })
//                 .catch(error => {
//                     console.error("Error fetching company data:", error);
//                     setLoading(false);
//                 });
//         }
//     }, [user?.email]);


//     // Data for the chart
//     const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
//     const data = {
//         labels: labels,
//         datasets: [{
//             label: 'My First Dataset',
//             data: [65, 59, 80, 81, 56, 55, 40],
//             fill: false,
//             borderColor: 'rgb(75, 192, 192)',
//             tension: 0.1
//         }]
//     };

//     // Chart configuration
//     const options = {
//         responsive: true,
//         plugins: {
//             legend: {
//                 position: 'top',
//             },
//         },
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         }
//     };



//     return (
//         <div className='p-10'>
//             <h2 className='text-2xl font-semibold text-center mb-10'>Financial overview based on your companies annual goal</h2>

//             {/* live chart */}
//             {/* Line chart section */}
//             <div className="bg-gray-100 shadow-md rounded-lg p-4 mb-6">
//                 <h3 className="text-md font-semibold text-gray-700 mb-2">Overview Chart for - <span className='font-semibold text-blue-600'>{companyData?.companyName}</span> Company</h3>

//                 <Line data={data} options={options} />
//             </div>






//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="bg-white shadow-md rounded-lg p-4">
//                     <h3 className="text-md font-semibold text-gray-700 mb-2">Monthly Income Growth</h3>
//                     <p className="text-gray-600 text-sm">Growth rate: <span className="font-bold text-green-500">+15%</span></p>
//                 </div>
//                 <div className="bg-white shadow-md rounded-lg p-4">
//                     <h3 className="text-md font-semibold text-gray-700 mb-2">Monthly Expenses Growth</h3>
//                     <p className="text-gray-600 text-sm">Growth rate: <span className="font-bold text-red-500">+8%</span></p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default FinancialOverview;
// =========================================================
import React, { useContext, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import "../../../index.css"
import { AuthInfo } from '../../../Provider/Authprovider';
import axios from 'axios';

// Register necessary Chart.js components
Chart.register(LineElement, CategoryScale, LinearScale, PointElement);

const FinancialOverview = () => {
    const { user } = useContext(AuthInfo);
    const [companyData, setCompanyData] = useState({});
    const [financialData, setFinancialData] = useState({
        income: [],
        expense: [],
        netIncome: [],
        incomeGrowthRate: 0,
        expenseGrowthRate: 0
    });

    // Function to calculate financial growth
    const calculateFinancialData = (incomeExpense) => {
        const income = [];
        const expense = [];
        const netIncome = [];

        incomeExpense.forEach((entry) => {
            income.push(entry.income);
            expense.push(entry.expense);
            netIncome.push(entry.income - entry.expense); // Calculate net amount
        });

        // Calculate the average growth rate (month-to-month percentage change for income and expense)
        let incomeGrowthSum = 0;
        let expenseGrowthSum = 0;

        for (let i = 1; i < income.length; i++) {
            const incomeGrowth = ((income[i] - income[i - 1]) / income[i - 1]) * 100;
            const expenseGrowth = ((expense[i] - expense[i - 1]) / expense[i - 1]) * 100;

            incomeGrowthSum += incomeGrowth;
            expenseGrowthSum += expenseGrowth;
        }

        const averageIncomeGrowth = incomeGrowthSum / (income.length - 1);
        const averageExpenseGrowth = expenseGrowthSum / (expense.length - 1);

        setFinancialData({
            income,
            expense,
            netIncome,
            incomeGrowthRate: averageIncomeGrowth.toFixed(2), // Round to 2 decimal places
            expenseGrowthRate: averageExpenseGrowth.toFixed(2) // Round to 2 decimal places
        });
    };

    useEffect(() => {
        if (user?.email) {
            axios.get(`${import.meta.env.VITE_SERVER_URL}/financial-info/${user.email}`)
                .then(res => {
                    setCompanyData(res.data);
                    calculateFinancialData(res.data.data.incomeExpense); // Calculate financial data
                })
                .catch(error => {
                    console.error("Error fetching company data:", error);
                });
        }
    }, [user?.email]);

    // Labels for the chart (Months)
    const labels = companyData?.data?.incomeExpense?.map(entry => new Date(entry.date).toLocaleString('default', { month: 'long' }));

    // Data for the chart
    const data = {
        labels: labels || [],
        datasets: [
            {
                label: 'Net Income',
                data: financialData.netIncome,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            },
            {
                label: 'Income',
                data: financialData.income,
                fill: false,
                borderColor: 'rgb(54, 162, 235)',
                tension: 0.1
            },
            {
                label: 'Expense',
                data: financialData.expense,
                fill: false,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1
            }
        ]
    };

    // Chart configuration
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <div className='p-10'>
            <h2 className='text-2xl font-semibold text-center mb-10'>Financial overview based on your company's annual goal</h2>

            {/* Line chart section */}
            <div className="bg-gray-100 shadow-md rounded-lg p-4 mb-6">
                <h3 className="text-md font-semibold text-gray-700 mb-2">Overview Chart for - <span className='font-semibold text-blue-600'>{companyData?.companyName}</span> Company</h3>

                <Line data={data} options={options} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h3 className="text-md font-semibold text-gray-700 mb-2">Monthly Income Growth</h3>
                    <p className="text-gray-600 text-sm">
                        Growth rate: <span className={`font-bold ${financialData.incomeGrowthRate >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {financialData.incomeGrowthRate}%
                        </span>
                    </p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h3 className="text-md font-semibold text-gray-700 mb-2">Monthly Expenses Growth</h3>
                    <p className="text-gray-600 text-sm">
                        Growth rate: <span className={`font-bold ${financialData.expenseGrowthRate >= 0 ? 'text-red-500' : 'text-green-500'}`}>
                            {financialData.expenseGrowthRate}%
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FinancialOverview;

