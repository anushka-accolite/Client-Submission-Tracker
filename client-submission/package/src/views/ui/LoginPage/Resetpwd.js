import React, { useState } from 'react';
import '../../css/form.css'; // Update the path to your CSS file
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Resetpwd = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const validateSignupForm = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords does not match, Please enter correct password');
    } else {
      // Proceed with form submission
      alert('Password changed successfully');
      let pwdDetails = {
        password: password,
        repeatPassword: confirmPassword,
      };
      let response = await axios.post(
        `http://localhost:8092/forgot-password/changePassword/${localStorage.getItem('email')}`,
        pwdDetails
      );
      console.log(response.data);
      navigate('/loginform');
    }
  };
  return (
    <div className="mainDiv">
      <div className="cardStyle">
        <form onSubmit={validateSignupForm} id="signupForm">
          <div className="inputDiv">
            <label className="inputLabel" htmlFor="password">New Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder='Enter New Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="inputDiv">
            <label className="inputLabel" htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder='Re-Enter the New Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <div className="buttonWrapper">
            <button
              type="submit"
              id="submitButton"
              className="submitButton pure-button pure-button-primary"
            >
              <span>Change Password</span>
              <span id="loader"></span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Resetpwd;