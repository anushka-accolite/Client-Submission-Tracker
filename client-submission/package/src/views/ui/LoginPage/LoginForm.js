import React from 'react';
import '../../css/loginform.css'; // Import your CSS file
import logo from '../../../assets/images/logos/logo.png';
import OneLogin from '../../../assets/images/logos/onelogin.png'

const LoginForm = () => {
  const handleOutsideClick = (event) => {
    // Implement logic to close the modal if clicked outside
    // For simplicity, I'm not including the modal functionality in this example
  };

  return (
    <div className="modal-content animate" onClick={handleOutsideClick}>
      <div className="container">
        <div className="logo">
        <img
            alt="Accolite"
            loading="lazy"
            width="165"
            height="60"
            decoding="async"
            src={logo} // Use the imported image variable
          />
        </div>
        <div className="text-center">Log in to continue</div>
        <button className="btn mb-3 mt-2" id="onelogin-signin">
          <img
            // alt="onelogin"
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
        <label htmlFor="uname">
          <b>Email-id</b>
        </label>
        <input type="text" placeholder="Enter email" name="email" required />
        <label htmlFor="psw">
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="psw"
          required
        />
        <button type="submit">Login</button>
        <div className='v0'>v0.6.1</div>
        
        <div className="center-text">
        <a
          href="https://www.accolite.com/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
          className="auth-footer-text-link"
          style={{textDecoration:"none",color:"black"}}
        >
          Privacy Policy
        </a>{' '}
        |{' '}
        <a
          href="https://www.accolite.com/terms-of-use"
          target="_blank"
          rel="noopener noreferrer"
          className="auth-footer-text-link"
          style={{textDecoration:"none",color:"black"}}
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

