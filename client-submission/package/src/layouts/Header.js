import React from "react";
import { Link, useNavigate} from "react-router-dom";
import '../views/css/header.css'
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import { ReactComponent as LogoWhite } from "../assets/images/logos/xtremelogowhite.svg";
import user1 from "../assets/images/users/user4.png";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const navigate=useNavigate();
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  let role=localStorage.getItem("userRole");
  if(role!=='admin'){
    role="user";
  }
  else{
    role="admin";
  }
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  return (
    <Navbar className="navbar" dark expand="md">
      <div className="d-flex align-items-center">
        <NavbarBrand href="/" className="d-lg-none">
          <LogoWhite />
        </NavbarBrand>
        <Button
          color="primary"
          className="d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>
          <NavItem>
            <Link to={role==='admin'?'/home':'/listofcandidates'} className="nav-link">
             {role==='admin'?"ADMIN'S DASHBOARD":"USER'S DASHBOARD"}
            </Link>
          </NavItem>
        </Nav>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle className="icon">
            <img
              src={user1}
              alt="profile"
              className="rounded-circle"
              width="30"
            ></img>
          </DropdownToggle>
          <DropdownMenu style={{background:"white"}}>
            <DropdownItem><button className="dropdownbtn" onClick={()=>navigate('/myaccount')}>My Account</button></DropdownItem>
            <DropdownItem><button className="dropdownbtn" onClick={()=>navigate('/myprofile')}>Edit Profile</button></DropdownItem>
            <DropdownItem divider />
            <DropdownItem><button className="dropdownbtn" onClick={()=>{localStorage.setItem("userRole","");navigate('/loginform')}}>Logout</button></DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Collapse>
    </Navbar>
  );
};

export default Header;
