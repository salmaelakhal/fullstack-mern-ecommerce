import React, { useState } from 'react'

function UserManagement() {


    const users = [
        {
            _id: 1309,
            name: "John Doe",
            email: "john@example.com",
            role: "admin",
        },
    ];

    const [formData, setFormData ]= useState({
        name: "",
        email: "",
        password: "",
        role: "customer", //Default role
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }



    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('User Registred', formData);
        setFormData({
            name: "",
            email: "",
            password: "",
            role: "customer", //Default role
        });
        
    }


    const handleRoleChange = (userId, newRole) => {
        console.log({id: userId, role: newRole});
    }

    const handleDeleteUser = (userId) => {
        if(window.confirm('Are you sure you want to delete this user?')) {
            console.log('User deleted with ID', userId);
        }
    }


  return (
    <div className="max-w-7xl mx-auto p-6">
          <h2 className="text-2xl font-bold mb-6">
            User Management
          </h2>
          {/* Add New User Form  */}
          <div className="p-6 rounded-lg mb-6">
              <h3 className="text-lg font-bold mb-4"> 
                Add New User
              </h3>
              <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                      <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                          placeholder="Enter name"
                          required
                        />
                  </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            placeholder="Enter email"
                            required
                      />
                  </div>
                  
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            placeholder="Enter password"
                            required
                      />
                  </div>
                  
                    <div className="mb-4">
                        <label className="block text-gray-700">Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                      </select>
                  </div>
                  
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Add User
                  </button>
              </form>
          </div>
          
          {/* User List Management  */}
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
              <table className="min-w-full text-left text-gray-500">
                  <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                      <tr>
                          <th className="py-3 px-4">Name</th>
                          <th className="py-3 px-4">Email</th>
                          <th className="py-3 px-4">Role</th>
                          <th className="py-3 px-4">Actions</th>
                      </tr>
                  </thead>
                  <tbody>
                      {users.map((user) => (
                          <tr key={user.email} className="border-b hover:bg-gray-50">
                              <td className="p-4 font-medium text-gray-900 whitespace-nowrap">{user.name}</td>
                              <td className="p-4">{user.email}</td>
                              <td className="p-4">
                                  <select
                                      value={user.role}
                                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                      className='py2 border rounded'
                                  >
                                      <option value="customer">Customer</option>
                                      <option value="admin">Admin</option>
                                  </select>
                              </td>
                              <td className="p-4">
                                  <button
                                      onClick={() => handleDeleteUser(user._id)}
                                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                                      Delete
                                  </button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>

    </div>
  )
}

export default UserManagement