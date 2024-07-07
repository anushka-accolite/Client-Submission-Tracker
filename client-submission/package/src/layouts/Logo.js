import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logos/logo.png'; 

const Logo = () => {
  const path = localStorage.getItem('userRole') === 'admin' ? '/home' : '/listofcandidates';

  return (
    <Link to={path} style={{ display: 'flex', alignItems: 'center' }}>
      <img src={logo} alt="Logo" height="50px" width="200px" style={{ backgroundColor:"white",marginLeft:"10px", padding:"10px 10px 10px 10px" }} />
    </Link>
  );
};

export default Logo;