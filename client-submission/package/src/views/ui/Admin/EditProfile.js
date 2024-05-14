import React, { useState } from 'react';
import '../../css/editprofile.css';

function EditProfile() {
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
  };

  // Event handler for file input change
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Event handler for resetting form fields
  const handleReset = () => {
    setUserId('');
    setUsername('');
    setEmail('');
    setRole('');
    setSelectedFile(null);
  };

  return (
    <div id="main-container">
      <form className="form" style={{marginTop:"-20px",width:"100%",height:"100%"}} onSubmit={handleSubmit} onReset={handleReset}>
        <h2>Edit Profile</h2>
        <div className="form-group">
          <label htmlFor="name">User Id :</label>
          <div className="relative">
            <input
              className="form-control"
              id="name"
              type="text"
              required=""
              autoFocus=""
              autoComplete=""
              placeholder="Type your User Id"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              pattern="[a-zA-Z0-9]+"
              title="User Id should only contain alphabets or digits or both"
            />
            <i className="fa fa-user"></i>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="username">Username :</label>
          <div className="relative">
            <input
              className="form-control"
              type="text"
              required=""
              placeholder="Type your Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <i className="fa fa-user"></i>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email :</label>
          <div className="relative">
            <input
              className="form-control"
              type="email"
              required=""
              placeholder="New email address"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <i className="fa fa-envelope"></i>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="role">Role :</label>
          <div className="relative">
            <input
              className="form-control"
              type="text"
              placeholder="New Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
            <i className="fa fa-building"></i>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="profile-picture">Profile Picture :</label>
          <div className="relative">
            <div className="input-group">
              <label className="input-group-btn">
                <span className="btn btn-default">
                  Browse&hellip; <input type="file" style={{display: 'none'}} onChange={handleFileChange} />
                </span>
              </label>
              <input style={{marginTop:"10px"}} type="text" className="form-control" required="" placeholder="Attachment..." value={selectedFile ? selectedFile.name : ''} readOnly />
              <i style={{marginTop:"10px"}} className="fa fa-link"></i>
            </div>
          </div>
        </div>
        <div className="tright">
          <button className="movebtn movebtnre" type="reset"><i className="fa fa-fw fa-refresh"></i> Reset </button>
          <button className="movebtn movebtnsu" type="submit">Apply <i className="fa fa-fw fa-paper-plane"></i></button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
