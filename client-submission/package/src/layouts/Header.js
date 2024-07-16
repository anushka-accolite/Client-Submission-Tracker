
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import '../views/css/header.css';
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import user1 from "../assets/images/users/user4.png";
import logo from '../assets/images/logos/logo.png';
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
        <img src={logo} alt="Logo" height="40px" width= "200px" style={{background:"white ",marginRight:"10px"}} />
      </Link>
      <Button
        color="primary"
        onClick={toggleSidebar}
        className="toggle-sidebar-btn"
      >
        {sidebarOpen ? (
          <i className="bi bi-list"></i>
        ) : (
          <i className="bi bi-list"></i>
        )}
      </Button>
      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>
          <NavItem>
            <Link to={role === 'admin' ? '/home' : '/listofclientuser'} className="nav-link" style={{color:"Black"}}>
              {role === 'admin' ? "ADMIN'S DASHBOARD" : "USER'S DASHBOARD"}
            </Link>
          </NavItem>
        </Nav>
        <Nav className="ms-auto" navbar>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle className="icon" style={{border:"1px solid white"}}>
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
        </Nav>
      </Collapse>
    </Navbar>
  );
};
export default Header;