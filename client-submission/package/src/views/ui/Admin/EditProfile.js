import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import '../../css/editprofile.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EditProfile({ history }) {
 const navigate = useNavigate();
  // const history = useHistory(); // Access the history object using useHistory hook
  // State variables to store form data
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  // Event handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    // Log form data to the console
    console.log({
      userId: userId,
      username: username,
      email: email,
      role: role,
      selectedFile: selectedFile
    });
    // You can add further logic here, such as sending the data to an API
    // Redirect to MyAccount page after applying changes
    navigate('/myaccount');
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleReset = () => {
    setUserId('');
    setUsername('');
    setEmail('');
    setRole('');
    setSelectedFile(null);
  };

  return (
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
        <div className="form-group">
          <label id='label' htmlFor="profile-picture">Profile Picture :</label>
          <div className="relative">
            <div className="input-group">
              <label id='label' className="input-group-btn">
                <span className="btn btn-default">
                  Browse&hellip; <input type="file" style={{display: 'none'}} onChange={handleFileChange} />
                </span>
              </label>
              <input  type="text" id='lastip'  placeholder="Attachment..." value={selectedFile ? selectedFile.name : ''} readOnly />
              <i className="fa fa-link"></i>
            </div>
          </div>
        </div>
        <div className="tright">
          <button className="movebtn movebtnre" type="reset"><i id='fa1' className="fa fa-fw fa-refresh"></i> Reset </button>
          <button className="movebtn movebtnsu" type="submit" id='fa2'>Apply <i id='fa2'  className="fa fa-fw fa-paper-plane"></i></button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
