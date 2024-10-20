import React from "react";
import { CSVLink } from "react-csv"; // Import CSVLink for exporting CSV

const ExportButton = ({ data }) => {
  // Prepare data for CSV export
  const csvData = data.reduce((acc, currData) => {
    if (Array.isArray(currData)) {
      return [...acc, ...currData];
    }
    return acc;
  }, []);

  const headers = Object.keys(csvData[0] || []).map((key) => ({
    label: key,
    key: key,
  }));

  return (
    <div className="mt-4">
      <CSVLink 
        data={csvData} 
        headers={headers}
        filename={"financial_report.csv"} // Set the filename for download
        className="bg-blue-600 text-white font-semibold rounded-md px-4 py-2 shadow-md hover:bg-blue-500 transition duration-200 inline-block"
        target="_blank"
      >
        <i className="fas fa-file-csv mr-2"></i> {/* Font Awesome CSV icon */}
        Export Data
      </CSVLink>
    </div>
  );
};

export default ExportButton;

