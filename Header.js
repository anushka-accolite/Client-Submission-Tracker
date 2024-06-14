import React from "react";
import { Link, useNavigate } from "react-router-dom";
import '../views/css/header.css';
import {
  Navbar,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import user1 from "../assets/images/users/user4.png";
import logo from '../assets/images/Bounteous X Accolite_transparent.png'; 

const Header = ({ toggleSidebar, sidebarOpen }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => setIsOpen(!isOpen);

  let role = localStorage.getItem("userRole");
  role = role === 'admin' ? 'admin' : 'user';

  const path = localStorage.getItem('userRole') === 'admin' ? '/home' : '/listofclientuser';

  return (
    <Navbar className="navbar" dark expand="md">
      <Link to={path} className="navbar-brand">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </Link>
      <div className="navbar-content">
        <Button
          color="primary"
          onClick={toggleSidebar}
          className="toggle-sidebar-btn"
        >
          {sidebarOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-list"></i>
          )}
        </Button>
        
        <div className="navbar-title">
          {role === 'admin' ? "ADMIN'S DASHBOARD" : "USER'S DASHBOARD"}
        </div>
        <Dropdown isOpen={dropdownOpen} toggle={toggle} className="navbar-dropdown">
          <DropdownToggle className="icon">
            <img
              src={user1}
              alt="profile"
              className="rounded-circle"
              width="30"
            />
          </DropdownToggle>
          <DropdownMenu style={{ background: "white" }}>
            <DropdownItem>
              <div className="dropdown-welcome">Welcome, {localStorage.getItem("username")}</div>
            </DropdownItem>
            <DropdownItem><button id="dropdownbtn" onClick={() => navigate('/myaccount')}>My Account</button></DropdownItem>
            <DropdownItem><button id="dropdownbtn" onClick={() => navigate('/myprofile')}>Edit Profile</button></DropdownItem>
            <DropdownItem divider />
            <DropdownItem><button id="dropdownbtn" onClick={() => { localStorage.setItem("userRole", ""); navigate('/loginform') }}>Logout</button></DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </Navbar>
  );
};

export default Header;
