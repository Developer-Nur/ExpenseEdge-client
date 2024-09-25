import React from "react";

const FilterBar = ({ setFilters }) => {
    const handleChange = (e) => {
        setFilters((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-6 flex flex-col md:flex-row justify-between">
            <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="mb-4 md:mb-0">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="startDate">Start Date</label>
                    <input
                        type="date"
                        name="startDate"
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500 p-2"
                    />
                </div>
                <div className="mb-4 md:mb-0">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="endDate">End Date</label>
                    <input
                        type="date"
                        name="endDate"
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500 p-2"
                    />
                </div>
                <div className="mb-4 md:mb-0">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="category">Category</label>
                    <select
                        name="category"
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500 p-2"
                    >
                        <option value="">Select Category</option>
                        <option value="Category 1">Category 1</option>
                        <option value="Category 2">Category 2</option>
                        <option value="Category 3">Category 3</option>
                        {/* Add more categories as needed */}
                    </select>
                </div>
            </div>
            <button className="mt-4 md:mt-0 bg-blue-600 text-white font-semibold rounded-md p-2 shadow-md hover:bg-blue-500 transition duration-200">
                Apply Filters
            </button>
        </div>
    );
};

export default FilterBar;

