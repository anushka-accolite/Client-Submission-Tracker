import React, { useState } from 'react';
import '../../css/loginform.css'; // Import your CSS file
import logo from '../../../assets/images/logos/logo.png';
import OneLogin from '../../../assets/images/logos/onelogin.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:8092/auth/login', { username, password });
      if (data === "Credentials Invalid !!") {
        setError('Login failed. Please check your credentials.');
        console.log("Login Failed");
      } else {
        const token = data.jwtToken;
        setError('');
        console.log("Login Successful");
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        await fetchUserData(token, username);
        window.location.reload();
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please check your credentials.');
    }
  };

  const fetchUserData = async (token, username) => {
    try {
      const headers = {
        'Authorization': `Bearer ${token}`
      };
      const response = await axios.get('http://localhost:8092/api/user/users', { headers });
      console.log('Response data:', response.data); // Log the entire response to see its structure

      if (Array.isArray(response.data)) {
        const user = response.data.find(user => user.userName === username);
        
        if (user) {
          const userRole = user.userRole;
          console.log('User Role:', userRole);
          localStorage.setItem('userRole', userRole); // Store the user role in localStorage
          if (userRole === 'admin') {
            navigate('/home');
          } else {
            navigate('/listofcandidates');
          }
        } else {
          console.error('User not found in response data');
        }
      } else {
        console.error('Response data is not an array');
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  return (
    <div className="modal-content animate">
      <div className="container">
        <div className="logo">
          <img
            alt="Accolite"
            loading="lazy"
            decoding="async"
            src={logo}
          />
        </div>
        <div className="text-center">Log in to continue</div>
        <button className="btn mb-3 mt-2" id="onelogin-signin">
          <img
            loading="lazy"
            width="15"
            height="15"
            decoding="async"
            src={OneLogin}
          />
          Login with Onelogin
        </button>
        <div className="center-text">
          <span>Or continue with</span>
        </div>
        <p></p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">
            <b>Username</b>
          </label>
          <input className='ip'
            type="text"
            placeholder="Enter username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="password">
            <b>Password</b>
          </label>
          <input className='ip'
            type="password"
            placeholder="Enter Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className='btn' type="submit">Login</button>
        </form>
        {error && <div className="error">{error}</div>}
        <div className='v0'>v0.6.1</div>
        <div className="center-text">
          <a
            href="https://www.accolite.com/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="auth-footer-text-link"
            style={{ textDecoration: "none", color: "black" }}
          >
            Privacy Policy
          </a>{' '}
          |{' '}
          <a
            href="https://www.accolite.com/terms-of-use"
            target="_blank"
            rel="noopener noreferrer"
            className="auth-footer-text-link"
            style={{ textDecoration: "none", color: "black" }}
          >
            Term of use
          </a>
          <hr />
          <span className="auth-footer-text-link">
            © Accolite Digital Private Limited
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
