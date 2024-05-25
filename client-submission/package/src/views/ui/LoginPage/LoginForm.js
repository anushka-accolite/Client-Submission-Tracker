// import React, { useState } from 'react';
// import '../../css/loginform.css'; // Import your CSS file
// import logo from '../../../assets/images/logos/logo.png';
// import OneLogin from '../../../assets/images/logos/onelogin.png'
// import axios from 'axios';
// import { useNavigate } from "react-router-dom"

// const LoginForm = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post('http://localhost:8092/auth/login', { username, password });
//       const token = data.jwtToken; // Assuming your backend returns a token upon successful login
//       localStorage.setItem('token', token); // Store the token in localStorage
//       console.log(data);
//       if (data === "Credentials Invalid !!") {
//         console.log("Login Failed");
//       } else {
//         console.log("Login Successful");
//       }

//       const headers = {
//         'Authorization': `Bearer ${token}`
//       };
//       const datadb = await axios.get('http://localhost:8092/api/user/users', { headers });
//       const user = datadb.data.find(user => user.userName === username);

//       if (user) {
//         const userRole = user.userRole;
//         console.log('User Role:', userRole);
//         localStorage.setItem('userRole', userRole); // Store the user role in localStorage
//       }
//       console.log(datadb);
//       navigate('/');
//       window.location.reload();
     
  
     

//     } catch (error) {
//       console.error('Login failed:', error);
//       // setError('Login failed. Please check your credentials.');
//     }
//   };

//   return (
//     <div className="modal-content animate">
//       <div className="container">
//         <div className="logo">
//           <img
//             alt="Accolite"
//             loading="lazy"
//             width="165"
//             height="60"
//             decoding="async"
//             src={logo}
//           />
//         </div>
//         <div className="text-center">Log in to continue</div>
//         <button className="btn mb-3 mt-2" id="onelogin-signin">
//           <img
//             loading="lazy"
//             width="15"
//             height="15"
//             decoding="async"
//             src={OneLogin}
//           />
//           Login with Onelogin
//         </button>
//         <div className="center-text">
//           <span>Or continue with</span>
//         </div>
//         <p></p>
//         <form onSubmit={handleSubmit}>
//           <label htmlFor="username">
//             <b>Username</b>
//           </label>
//           <input
//             type="text"
//             placeholder="Enter username"
//             name="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//           <label htmlFor="password">
//             <b>Password</b>
//           </label>
//           <input
//             type="password"
//             placeholder="Enter Password"
//             name="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit">Login</button>
//         </form>
//         {/* {error && <div className="error">{error}</div>} */}
//         <div className='v0'>v0.6.1</div>
//         <div className="center-text">
//           <a
//             href="https://www.accolite.com/privacy-policy"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="auth-footer-text-link"
//             style={{ textDecoration: "none", color: "black" }}
//           >
//             Privacy Policy
//           </a>{' '}
//           |{' '}
//           <a
//             href="https://www.accolite.com/terms-of-use"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="auth-footer-text-link"
//             style={{ textDecoration: "none", color: "black" }}
//           >
//             Term of use
//           </a>
//           <hr />
//           <span className="auth-footer-text-link">
//             © Accolite Digital Private Limited
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;

// // LoginForm.js

// // import React, { useState } from 'react';
// // import logo from '../../../assets/images/logos/logo.png';
// // import OneLogin from '../../../assets/images/logos/onelogin.png';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';
// // import './loginform.css'; // Import your external CSS file

// // const LoginForm = () => {
// //   const [username, setUsername] = useState('');
// //   const [password, setPassword] = useState('');
// //   const navigate = useNavigate();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const { data } = await axios.post('http://localhost:8092/auth/login', { username, password });
// //       const token = data.jwtToken;
// //       localStorage.setItem('token', token);
// //       console.log(data);
// //       if (data === "Credentials Invalid !!") {
// //         console.log("Login Failed");
// //       } else {
// //         console.log("Login Successful");
// //         const headers = {
// //           'Authorization': `Bearer ${token}`
// //         };
// //         const datadb = await axios.get('http://localhost:8092/api/user/users', { headers });
// //         const user = datadb.data.find(user => user.userName === username);

// //         if (user) {
// //           const userRole = user.userRole;
// //           console.log('User Role:', userRole);
// //           localStorage.setItem('userRole', userRole);
// //         }
// //         console.log(datadb);
// //         navigate('/');
// //       }
// //     } catch (error) {
// //       console.error('Login failed:', error);
// //     }
// //   };

// //   return (
// //     <div className="modal-content animate">
// //       <div className="container">
// //         <div className="logo">
// //           <img
// //             alt="Accolite"
// //             loading="lazy"
// //             width="165"
// //             height="60"
// //             decoding="async"
// //             src={logo}
// //           />
// //         </div>
// //         <div className="text-center">Log in to continue</div>
// //         <button className="btn mb-3 mt-2" id="onelogin-signin">
// //           <img
// //             loading="lazy"
// //             width="15"
// //             height="15"
// //             decoding="async"
// //             src={OneLogin}
// //           />
// //           Login with Onelogin
// //         </button>
// //         <div className="center-text">
// //           <span>Or continue with</span>
// //         </div>
// //         <p></p>
// //         <form onSubmit={handleSubmit}>
// //           <label htmlFor="username">
// //             <b>Username</b>
// //           </label>
// //           <input
// //             type="text"
// //             placeholder="Enter username"
// //             name="username"
// //             value={username}
// //             onChange={(e) => setUsername(e.target.value)}
// //             required
// //           />
// //           <label htmlFor="password">
// //             <b>Password</b>
// //           </label>
// //           <input
// //             type="password"
// //             placeholder="Enter Password"
// //             name="password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             required
// //           />
// //           <button type="submit" className="btn">Login</button>
// //         </form>
// //         <div className='v0'>v0.6.1</div>
// //         <div className="center-text">
// //           <a
// //             href="https://www.accolite.com/privacy-policy"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //             className="auth-footer-text-link"
// //             style={{ textDecoration: "none", color: "black" }}
// //           >
// //             Privacy Policy
// //           </a>{' '}
// //           |{' '}
// //           <a
// //             href="https://www.accolite.com/terms-of-use"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //             className="auth-footer-text-link"
// //             style={{ textDecoration: "none", color: "black" }}
// //           >
// //             Term of use
// //           </a>
// //           <hr />
// //           <span className="auth-footer-text-link">
// //             © Accolite Digital Private Limited
// //           </span>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default LoginForm;

// import React, { useState, useEffect } from 'react';
// import '../../css/loginform.css'; // Import your CSS file
// import logo from '../../../assets/images/logos/logo.png';
// import OneLogin from '../../../assets/images/logos/onelogin.png';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const LoginForm = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [token, setToken] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post('http://localhost:8092/auth/login', { username, password });
//       setUsername(data.userName);
//       const token = data.jwtToken; 
//       setToken(token); 
//       localStorage.setItem('token', token); 
//       localStorage.setItem('username',username);
//       if (data === "Credentials Invalid !!") {
//         console.log("Login Failed");
//         setError('Login failed. Please check your credentials.');
//       } else {
//         console.log("Login Successful");
//         setError('');
//       }
//     } catch (error) {
//       console.error('Login failed:', error);
//       setError('Login failed. Please check your credentials.');
//     }
//   };

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const headers = {
//           'Authorization': `Bearer ${token}`
//         };
//         const datadb = await axios.get('http://localhost:8092/api/user/users', { headers });
//         const user = datadb.data.find(user => user.userName === username);

//         if (user) {
//           const userRole = user.userRole;
//           console.log('User Role:', userRole);
//           localStorage.setItem('userRole', userRole); // Store the user role in localStorage
//           if(userRole==='admin'){
//             navigate('/');
//           }
//           else{
//             navigate('/listofcandidates');
//           }
//         }
       
//          window.location.reload();
//       } catch (error) {
//         console.error('Failed to fetch user data:', error);
//       }
//     };

//     if (token) {
//       fetchUserData();
//     }
//   }, [token, username, navigate]);

//   return (
//     <div className="modal-content animate">
//       <div className="container">
//         <div className="logo">
//           <img
//             alt="Accolite"
//             loading="lazy"
//             width="165"
//             height="60"
//             decoding="async"
//             src={logo}
//           />
//         </div>
//         <div className="text-center">Log in to continue</div>
//         <button className="btn mb-3 mt-2" id="onelogin-signin">
//           <img
//             loading="lazy"
//             width="15"
//             height="15"
//             decoding="async"
//             src={OneLogin}
//           />
//           Login with Onelogin
//         </button>
//         <div className="center-text">
//           <span>Or continue with</span>
//         </div>
//         <p></p>
//         <form onSubmit={handleSubmit}>
//           <label htmlFor="username">
//             <b>Username</b>
//           </label>
//           <input className='ip'
//             type="text"
//             placeholder="Enter username"
//             name="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//           <label htmlFor="password">
//             <b>Password</b>
//           </label>
//           <input className='ip'
//             type="password"
//             placeholder="Enter Password"
//             name="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button className='btn' type="submit">Login</button>
//         </form>
//         {error && <div className="error">{error}</div>}
//         <div className='v0'>v0.6.1</div>
//         <div className="center-text">
//           <a
//             href="https://www.accolite.com/privacy-policy"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="auth-footer-text-link"
//             style={{ textDecoration: "none", color: "black" }}
//           >
//             Privacy Policy
//           </a>{' '}
//           |{' '}
//           <a
//             href="https://www.accolite.com/terms-of-use"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="auth-footer-text-link"
//             style={{ textDecoration: "none", color: "black" }}
//           >
//             Term of use
//           </a>
//           <hr />
//           <span className="auth-footer-text-link">
//             © Accolite Digital Private Limited
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;

import React, { useState, useEffect } from 'react';
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
        fetchUserData(token);
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please check your credentials.');
    }
  };

  const fetchUserData = async (token) => {
    try {
      const headers = {
        'Authorization': `Bearer ${token}`
      };
      const datadb = await axios.get('http://localhost:8092/api/user/users', { headers });
      const user = datadb.data.find(user => user.userName === username);

      if (user) {
        const userRole = user.userRole;
        console.log('User Role:', userRole);
        localStorage.setItem('userRole', userRole); // Store the user role in localStorage
        if(userRole==='admin'){
          navigate('/');
        } else {
          navigate('/listofcandidates');
        }
      }
      window.location.reload();
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
            width="165"
            height="60"
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
