import React, { useState, useEffect, useContext } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FaExclamationTriangle, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { AuthInfo } from '../../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../../Shared/LoadingSpinner/LoadingSpinner';

const BudgetManagement = () => {
    const { user } = useContext(AuthInfo);
    const [budgets, setBudgets] = useState([]);
    const [newBudget, setNewBudget] = useState({
        department: '',
        projectName: '',
        budgetAmount: '',
        currentExpenditure: ''
    });
    const [editingBudgetId, setEditingBudgetId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user?.email) {
            fetchBudgets();
        }
    }, [user?.email]);

    const fetchBudgets = async () => {
        try {
            const token = localStorage.getItem('access-token');
            const response = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/budgets/${user.email}`,
                { headers: { authorization: `Bearer ${token}` } }
            );

            const updatedBudgets = response.data.map(budget => ({
                ...budget,
                isOverspent: budget.currentExpenditure > budget.budgetAmount,
            }));
            setBudgets(updatedBudgets);
        } catch (error) {
            console.error('Error fetching budgets:', error);
            setError('Failed to fetch budgets. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setNewBudget({
            ...newBudget,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        if (
            newBudget.department &&
            newBudget.projectName &&
            newBudget.budgetAmount > 0 &&
            newBudget.currentExpenditure >= 0
        ) {
            const token = localStorage.getItem('access-token');
            const budgetData = { ...newBudget };

            try {
                if (editingBudgetId) {
                    await axios.put(
                        `${import.meta.env.VITE_SERVER_URL}/budgets/${user.email}/${editingBudgetId}`,
                        budgetData,
                        { headers: { authorization: `Bearer ${token}` } }
                    );

                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Budget updated successfully!',
                        showConfirmButton: false,
                        timer: 1500,
                    });

                    setBudgets((prevBudgets) =>
                        prevBudgets.map((b) =>
                            b._id === editingBudgetId
                                ? { ...budgetData, _id: b._id, isOverspent: budgetData.currentExpenditure > budgetData.budgetAmount }
                                : b
                        )
                    );
                    setEditingBudgetId(null);
                } else {
                    const response = await axios.post(
                        `${import.meta.env.VITE_SERVER_URL}/budgets/${user.email}`,
                        budgetData,
                        { headers: { authorization: `Bearer ${token}` } }
                    );

                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Budget added successfully!',
                        showConfirmButton: false,
                        timer: 1500,
                    });

                    setBudgets((prevBudgets) => [
                        ...prevBudgets,
                        { ...response.data.budget, isOverspent: response.data.budget.currentExpenditure > response.data.budget.budgetAmount }
                    ]);
                }

                setNewBudget({
                    department: '',
                    projectName: '',
                    budgetAmount: '',
                    currentExpenditure: '',
                });
            } catch (error) {
                console.error('Error saving budget:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong! Please try again.',
                });
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Invalid input',
                text: 'Please fill in all fields correctly.',
            });
        }
    };

    const handleEdit = (budget) => {
        setNewBudget(budget);
        setEditingBudgetId(budget._id);
    };

    const handleDelete = async (budgetId) => {
        const token = localStorage.getItem('access-token');
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(
                        `${import.meta.env.VITE_SERVER_URL}/budgets/${user.email}/${budgetId}`,
                        { headers: { authorization: `Bearer ${token}` } }
                    );

                    setBudgets((prevBudgets) =>
                        prevBudgets.filter((b) => b._id !== budgetId)
                    );

                    Swal.fire('Deleted!', 'Budget has been deleted.', 'success');
                } catch (error) {
                    console.error('Error deleting budget:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong! Please try again.',
                    });
                }
            }
        });
    };

    if (loading) return <LoadingSpinner />;


    return (
        <div className="p-8 bg-gradient-to-b from-blue-50 to-gray-100 min-h-screen flex flex-col items-center">
            <div className="bg-white shadow-2xl rounded-xl p-8 mb-12 max-w-lg w-full transition-transform transform hover:scale-105 duration-300 ease-in-out">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center tracking-tight">
                    {editingBudgetId ? 'Edit Budget' : 'Create New Budget'}
                </h2>

                <p className="text-gray-500 text-lg mb-4 text-center">
                    {editingBudgetId
                        ? 'Modify the budget details below.'
                        : 'Fill in the fields to create a new budget for your project.'}
                </p>
                <div className="space-y-6">
                    <input
                        type="text"
                        placeholder="Department Name"
                        name="department"
                        value={newBudget.department}
                        onChange={handleInputChange}
                        className="w-full p-4 border rounded-lg shadow-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300"
                    />
                    <input
                        type="text"
                        placeholder="Project Name"
                        name="projectName"
                        value={newBudget.projectName}
                        onChange={handleInputChange}
                        className="w-full p-4 border rounded-lg shadow-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300"
                    />
                    <input
                        type="number"
                        placeholder="Total Budget"
                        name="budgetAmount"
                        value={newBudget.budgetAmount}
                        onChange={handleInputChange}
                        className="w-full p-4 border rounded-lg shadow-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition duration-300"
                    />
                    <input
                        type="number"
                        placeholder="Current Expenditure"
                        name="currentExpenditure"
                        value={newBudget.currentExpenditure}
                        onChange={handleInputChange}
                        className="w-full p-4 border rounded-lg shadow-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition duration-300"
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    className="mt-6 w-full py-3 px-4 text-white font-semibold rounded-lg shadow-lg 
               bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500
               transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                    <AiOutlinePlusCircle className="mr-2 text-2xl" />
                    {editingBudgetId ? 'Update Budget' : 'Add Budget'}
                </button>

            </div>

            <div className="space-y-6 max-w-lg w-full">
                {budgets.length > 0 ? (
                    budgets.map((budget) => {
                        const progress = (budget.currentExpenditure / budget.budgetAmount) * 100;
                        const overspent = budget.currentExpenditure > budget.budgetAmount;

                        return (
                            <div
                                key={budget._id}
                                className="p-6 bg-white rounded-lg shadow-md border hover:shadow-lg transition-all duration-300"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        {budget.projectName}
                                    </h3>
                                    {overspent && (
                                        <span className="text-red-500 text-sm font-semibold">
                                            <FaExclamationTriangle className="inline-block mr-1" />
                                            Overspent!
                                        </span>
                                    )}
                                </div>

                                <p className="text-gray-600 mb-1">
                                    <span className="font-medium">Department:</span> {budget.department}
                                </p>
                                <p className="text-gray-600 mb-1">
                                    <span className="font-medium">Total Budget:</span> ${budget.budgetAmount}
                                </p>
                                <p className="text-gray-600 mb-4">
                                    <span className="font-medium">Expenditure:</span> ${budget.currentExpenditure}
                                </p>

                                {/* Progress Bar */}
                                <div className="w-full bg-gray-200 rounded-full h-5 relative overflow-hidden">
                                    <div
                                        className={`h-5 rounded-full transition-all duration-500 ${overspent ? 'bg-red-500' : 'bg-green-500'}`}
                                        style={{ width: `${Math.min(progress, 100)}%` }}
                                    ></div>
                                    <span className="absolute inset-0 flex justify-center items-center text-xs font-medium text-gray-800">
                                        {Math.min(progress, 100).toFixed(1)}%
                                    </span>
                                </div>

                                {/* Actions */}
                                <div className="flex justify-between items-center mt-4">
                                    <button
                                        onClick={() => handleEdit(budget)}
                                        className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 transition"
                                    >
                                        <FaEdit /> <span>Edit</span>
                                    </button>

                                    <button
                                        onClick={() => handleDelete(budget._id)}
                                        className="flex items-center space-x-1 text-red-600 hover:text-red-700 transition"
                                    >
                                        <FaTrash /> <span>Delete</span>
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-gray-500 text-center">No budgets found.</p>
                )}
            </div>

        </div>
    );
};

export default BudgetManagement;
