import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const CompanyTable = () => {
  const [users, setUsers] = useState([]);  // Store the list of users

  // Fetch the list of users on component mount
  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then(response => {
        setUsers(response.data);  // Assuming response.data contains the list of users
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Failed to load users",
          showConfirmButton: false,
          timer: 5000
        });
      });
  }, []);

  // Function to handle approval of users
  const handleApprove = (userId) => {
    axios.post(`http://localhost:5000/users/approve/${userId}`)
      .then(response => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User approved successfully!",
          showConfirmButton: false,
          timer: 3000
        });

        // Optionally refresh the user list after approval
        setUsers(users.map(user => user._id === userId ? { ...user, approved: true } : user));
      })
      .catch(error => {
        console.error('Error approving user:', error);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Approval failed",
          showConfirmButton: false,
          timer: 5000
        });
      });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">User List</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td className="py-2 px-4 border">{user.name}</td>
              <td className="py-2 px-4 border">{user.email}</td>
              <td className="py-2 px-4 border">
                {user.approved ? 'Approved' : 'Pending'}
              </td>
              <td className="py-2 px-4 border">
                {!user.approved && (
                  <button
                    onClick={() => handleApprove(user._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyTable;
