import React, { useState, useEffect, useContext } from "react";
import FilterBar from "../../Components/FilterBar/FilterBar";
import ProfitLossChart from "../../Components/ProfitLossChart/ProfirLossChart";
import BalanceSheetChart from "../../Components/BalanceSheetChart/BalanceSheetChart";
import CashFlowChart from "../../Components/CashFlowChart/CashFlowChart";
import ExportButton from "../../Components/ExportButton/ExportButton";
import { AuthInfo } from '../../Provider/AuthProvider';
import axios from "axios";

// Mock data
const mockBalanceSheetData = [
    { id: 1, title: "Assets", amount: 100000 },
    { id: 2, title: "Liabilities", amount: 60000 },
    { id: 3, title: "Equity", amount: 40000 },
];

const mockCashFlowData = [
    { type: "Operating Activities", amount: 30000 },
    { type: "Investing Activities", amount: -10000 },
    { type: "Financing Activities", amount: 5000 },
];

const ReportPage = () => {
    const { user, loader } = useContext(AuthInfo);

    const [filters, setFilters] = useState({
        startDate: "",
        endDate: "",
        category: "",
    });
    const [profitLossData, setProfitLossData] = useState([]); // Placeholder for ProfitLoss data
    const [balanceSheetData, setBalanceSheetData] = useState(mockBalanceSheetData); // Using mock data
    const [cashFlowData, setCashFlowData] = useState(mockCashFlowData); // Using mock data

    useEffect(() => {
        if (!loader && user?.email) {
            axios.get(`${import.meta.env.VITE_SERVER_URL}/company-info/${user.email}`)
                .then(({ data }) => {
                    console.log(data);
                    setBalanceSheetData(data.data.balanceData)
                    setCashFlowData(data.data.balanceData)
                    setProfitLossData(data.data.incomeExpense)
                    console.log(data);
                })

            // Simulate data fetching here. Ensure it's an array
            if (!Array.isArray(balanceSheetData)) {
                setBalanceSheetData([]); // Handle invalid data
            }
        }
    }, [ filters, user]);

    if (loader) {
        return <p>Loading...</p>;
    }
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Advanced Financial Reports</h1>
            <FilterBar setFilters={setFilters} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white shadow-lg rounded-lg p-4 col-span-2">
                    <h2 className="text-xl font-semibold mb-4">Profit & Loss</h2>
                    <ProfitLossChart data={profitLossData} />
                </div>
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-4">Balance Sheet</h2>
                    <BalanceSheetChart data={balanceSheetData} />
                </div>
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-4">Cash Flow</h2>
                    <CashFlowChart data={cashFlowData} />
                </div>
            </div>
            <div className="mt-6 text-center">
                <ExportButton data={[profitLossData, balanceSheetData, cashFlowData]} />
            </div>
        </div>
    );
};

export default ReportPage;



