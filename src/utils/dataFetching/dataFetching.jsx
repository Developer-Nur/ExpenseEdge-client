// utils/dataFetching/mockDataFetching.js

export const fetchProfitLossData = async (filters) => {
    // Simulated data for profit and loss
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { date: "2024-01-01", income: 5000, expense: 3000 },
          { date: "2024-02-01", income: 7000, expense: 2000 },
        ]);
      }, 1000);
    });
  };
  
  export const fetchBalanceSheetData = async (filters) => {
    // Simulated data for balance sheet
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          assets: 50000,
          liabilities: 20000,
          netWorth: 30000,
        });
      }, 1000);
    });
  };
  
  export const fetchCashFlowData = async (filters) => {
    // Simulated data for cash flow
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { date: "2024-01-01", cashInflow: 15000, cashOutflow: 8000 },
          { date: "2024-02-01", cashInflow: 12000, cashOutflow: 5000 },
        ]);
      }, 1000);
    });
  };
  
