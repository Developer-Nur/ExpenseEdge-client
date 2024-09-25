import React, { useState, useEffect } from "react";
import FilterBar from "../../Components/FilterBar/FilterBar";
import ProfitLossChart from "../../Components/ProfitLossChart/ProfirLossChart";
import BalanceSheetChart from "../../Components/BalanceSheetChart/BalanceSheetChart";
import CashFlowChart from "../../Components/CashFlowChart/CashFlowChart";
import ExportButton from "../../Components/ExportButton/ExportButton";
import {
    fetchProfitLossData,
} from "../../utils/dataFetching/dataFetching";

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
    const [filters, setFilters] = useState({
        startDate: "",
        endDate: "",
        category: "",
    });
    const [profitLossData, setProfitLossData] = useState([]); // Placeholder for ProfitLoss data
    const [balanceSheetData, setBalanceSheetData] = useState(mockBalanceSheetData); // Using mock data
    const [cashFlowData, setCashFlowData] = useState(mockCashFlowData); // Using mock data

    useEffect(() => {
        fetchProfitLossData(filters).then((data) => setProfitLossData(data));
    }, [filters]);

    useEffect(() => {
        // Simulate data fetching here. Ensure it's an array
        if (!Array.isArray(balanceSheetData)) {
            setBalanceSheetData([]); // Handle invalid data
        }
    }, [balanceSheetData]);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Advanced Financial Reports</h1>
            <FilterBar setFilters={setFilters} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="bg-white shadow-lg rounded-lg p-4">
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



