import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../../css/editprofile.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditProfile() {
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { "Authorization": `Bearer ${token}` };
        const { data } = await axios.get('http://localhost:8092/api/user/users', { headers });

        const userData = data.filter(item => item.userName === localStorage.getItem("username"))[0];
        setUserId(userData.userId || '');
        setUsername(userData.userName || ''); 
        setEmail(userData.email || '');
        setRole(userData.userRole || '');
        console.log(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);
const navigate=useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const headers = { "Authorization": `Bearer ${token}` };
      const { data } = await axios.get('http://localhost:8092/api/user/users', { headers }); //getting all user details

      const userData = data.filter(item => item.userName === localStorage.getItem("username"))[0];
        userData.userName= username;
        userData.email=email;
      localStorage.setItem("username",username);
       await axios.put(`http://localhost:8092/api/user/${userId}`, userData, { headers });
      alert('Profile updated successfully!');
      navigate('/profile');   // if profile is updated successfully then it will ridirect to myaccount page
      
    } catch (error) {
      console.error('Error updating user data:', error);
      alert('Failed to update profile.');
    }
  };

  const handleReset = () => {
    setUserId('');
    setUsername('');
    setEmail('');
    setRole('');
  };

  return (
    <>
    <ToastContainer/>
    <div id="main-container">
      <form className="form" onSubmit={handleSubmit} onReset={handleReset}>
        <h2>Edit Profile</h2>
        <div className="form-group">
          <label id='label' htmlFor="name">User Id :</label>
          <div className="relative">
            <input
              className="form-control"
              id="name"
              type="text"
              required
              autoFocus
              autoComplete="off"
              placeholder={userId}
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              pattern="[a-zA-Z0-9]+"
              title="User Id should only contain alphabets or digits or both"
              disabled
            />
            <i className="fa fa-user"></i>
          </div>
        </div>
        <div className="form-group">
          <label id='label' htmlFor="username">Username :</label>
          <div className="relative">
            <input
              className="form-control"
              type="text"
              required
              placeholder={username}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <i className="fa fa-user"></i>
          </div>
        </div>
        <div className="form-group">
          <label id='label' htmlFor="email">Email :</label>
          <div className="relative">
            <input
              className="form-control"
              type="email"
              required
              placeholder={email}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <i className="fa fa-envelope"></i>
          </div>
        </div>
        <div className="form-group">
          <label id='label' htmlFor="role">Role :</label>
          <div className="relative">
            <input 
              className="form-control"
              type="text"
              required
              placeholder={role}
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled
            />
            <i className="fa fa-building"></i>
          </div>
        </div>
        <div className="tright">
          <button className="movebtn movebtnre" type="reset"><i id='fa1' className="fa fa-fw fa-refresh"></i> Reset </button>
          <button className="movebtn movebtnsu" type="submit" id='fa2'>Apply <i id='fa2'  className="fa fa-fw fa-paper-plane"></i></button>
        </div>
      </form>
    </div>
    </>
  );
}

export default EditProfile;
