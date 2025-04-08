import React, { useEffect, useState } from 'react';
import './Users.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';

const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/admin/getUsers');
      setUsers(response.data);
    } catch (error) {
      console.error('No users available', error);
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/admin/deleteUser/${userId}`);
      toast.success('User deleted successfully!');
      fetchAllUsers();
    } catch (error) {
      toast.error('Error deleting user');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div >
      
      <div className="users-list">
      <h3 className='h3'>User Management</h3>
        {users.map((user, index) => (
          <div key={index} className="user">
            <img className="user-img" src={assets.user_icon} alt="User" />

            <div className="users-columns">
              <div className="user-col">
                <h4>User Info</h4>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Address:</strong> {user.address}</p>
                
              </div>

              <div className="user-col">
                <h4 className='act'>Actions</h4>
                <button onClick={() => deleteUser(user.id)} className="delete-btn">Delete User</button>
                <a href={`mailto:${user.email}`} className="email-btn">Send Email</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
