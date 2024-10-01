import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const CompanyTable = () => {
  const [users, setUsers] = useState([]);  // Store the list of users
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Handle errors

  // Fetch the list of users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/users`);
      setUsers(response.data);  // Assuming response.data contains the list of users
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to load users');
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to load users",
        showConfirmButton: false,
        timer: 5000
      });
    } finally {
      setLoading(false);  // Stop loading
    }
  };

  // Function to handle approval of users
  const handleApprove = async (userId) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/users/${userId}/approve`);
      if (response.status === 200) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User approved successfully!",
          showConfirmButton: false,
          timer: 3000
        });

        // Update local state to reflect approval
        setUsers(users.map(user => user._id === userId ? { ...user, approved: true } : user));
      }
    } catch (error) {
      console.error('Error approving user:', error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Approval failed",
        showConfirmButton: false,
        timer: 5000
      });
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">User Approval List</h2>

      {loading ? (
        <p className="text-center">Loading users...</p>  // Show loading message
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>  // Show error message
      ) : users.length === 0 ? (
        <p className="text-center">No users found.</p>  // Handle empty user list
      ) : (
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 border-b border-gray-300 text-left">Name</th>
              <th className="py-3 px-4 border-b border-gray-300 text-left">Status</th>
              <th className="py-3 px-4 border-b border-gray-300 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="hover:bg-gray-100 transition duration-150">
                <td className="py-2 px-4 border-b border-gray-300">{user.name}</td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {user.approved ? (
                    <span className="text-green-500 font-bold">Approved</span>
                  ) : (
                    <span className="text-yellow-600 font-bold">Pending</span>
                  )}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {!user.approved && (
                    <button
                      onClick={() => handleApprove(user._id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition duration-150"
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CompanyTable;
