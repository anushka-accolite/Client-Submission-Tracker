// // import React from "react";
// // import { Link, useNavigate} from "react-router-dom";
// // import '../views/css/header.css'
// // import {
// //   Navbar,
// //   Collapse,
// //   Nav,
// //   NavItem,
// //   NavbarBrand,
// //   DropdownToggle,
// //   DropdownMenu,
// //   DropdownItem,
// //   Dropdown,
// //   Button,
// // } from "reactstrap";
// // import { ReactComponent as LogoWhite } from "../assets/images/logos/xtremelogowhite.svg";
// // import user1 from "../assets/images/users/user4.png";

// // const Header = () => {
// //   const [isOpen, setIsOpen] = React.useState(false);
// //   const [dropdownOpen, setDropdownOpen] = React.useState(false);
// //   const navigate=useNavigate();
// //   const toggle = () => setDropdownOpen((prevState) => !prevState);
// //   const Handletoggle = () => {
// //     setIsOpen(!isOpen);
// //   };
// //   let role=localStorage.getItem("userRole");
// //   if(role!=='admin'){
// //     role="user";
// //   }
// //   else{
// //     role="admin";
// //   }
// //   const showMobilemenu = () => {
// //     document.getElementById("sidebarArea").classList.toggle("showSidebar");
// //   };
// //   return (
// //     <Navbar className="navbar" dark expand="md">
// //       <div className="d-flex align-items-center">
// //         <NavbarBrand href="/" className="d-lg-none">
// //           <LogoWhite />
// //         </NavbarBrand>
// //         <Button
// //           color="primary"
// //           className="d-lg-none"
// //           onClick={() => showMobilemenu()}
// //         >
// //           <i className="bi bi-list"></i>
// //         </Button>
// //       </div>
// //       <div className="hstack gap-2">
// //         <Button
// //           color="primary"
// //           size="sm"
// //           className="d-sm-block d-md-none"
// //           onClick={Handletoggle}
// //         >
// //           {isOpen ? (
// //             <i className="bi bi-x"></i>
// //           ) : (
// //             <i className="bi bi-three-dots-vertical"></i>
// //           )}
// //         </Button>
// //       </div>

// //       <Collapse navbar isOpen={isOpen}>
// //         <Nav className="me-auto" navbar>
// //           <NavItem>
// //             <Link to={role==='admin'?'/home':'/listofcandidates'} className="nav-link">
// //              {role==='admin'?"ADMIN'S DASHBOARD":"USER'S DASHBOARD"}
// //             </Link>
// //           </NavItem>
// //         </Nav>
// //         <Dropdown isOpen={dropdownOpen} toggle={toggle}>
// //           <DropdownToggle className="icon">
// //             <img 
// //               src={user1}
// //               alt="profile"
// //               className="rounded-circle"
// //               width="30"
// //             ></img>
// //           </DropdownToggle>
// //           <DropdownMenu style={{background:"white"}}>
// //           <DropdownItem>
// //               <div className="dropdown-welcome">Welcome, {localStorage.getItem("username")}</div>
// //             </DropdownItem>
// //             <DropdownItem><button id="dropdownbtn" onClick={()=>navigate('/myaccount')}>My Account</button></DropdownItem>
// //             <DropdownItem><button id="dropdownbtn"  onClick={()=>navigate('/myprofile')}>Edit Profile</button></DropdownItem>
// //             <DropdownItem divider />
// //             <DropdownItem><button id="dropdownbtn"  onClick={()=>{localStorage.setItem("userRole","");navigate('/loginform')}}>Logout</button></DropdownItem>
// //           </DropdownMenu>
// //         </Dropdown>
// //       </Collapse>
// //     </Navbar>
// //   );
// // };

// // export default Header;


// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import '../views/css/header.css';
// import {
//   Navbar,
//   Collapse,
//   Nav,
//   NavItem,
//   NavbarBrand,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
//   Dropdown,
//   Button,
// } from "reactstrap";
// import user1 from "../assets/images/users/user4.png";
// import Logo from "./Logo";

// const Header = ({ toggleSidebar, sidebarOpen }) => {
//   const [isOpen, setIsOpen] = React.useState(false);
//   const [dropdownOpen, setDropdownOpen] = React.useState(false);
//   const navigate = useNavigate();

//   const toggle = () => setDropdownOpen((prevState) => !prevState);
//   const Handletoggle = () => setIsOpen(!isOpen);

//   let role = localStorage.getItem("userRole");
//   role = role === 'admin' ? 'admin' : 'user';

//   return (
//     <Navbar className="navbar" dark expand="md">
//       <div className="d-flex align-items-center">
//         <Button
//           color="primary"
//           onClick={toggleSidebar}
//           className="toggle-sidebar-btn"
//         >
//           {sidebarOpen ? (
//             <i className="bi bi-x"></i>
//           ) : (
//             <i className="bi bi-list"></i>
//           )}
//         </Button>
//       </div>
//       <Logo/>
//       <Collapse navbar isOpen={isOpen}>
//         <Nav className="me-auto" navbar>
//           <NavItem>
//             <Link to={role === 'admin' ? '/home' : '/listofcandidates'} className="nav-link">
//               {role === 'admin' ? "ADMIN'S DASHBOARD" : "USER'S DASHBOARD"}
//             </Link>
//           </NavItem>
//         </Nav>
//         <Dropdown isOpen={dropdownOpen} toggle={toggle}>
//           <DropdownToggle className="icon">
//             <img
//               src={user1}
//               alt="profile"
//               className="rounded-circle"
//               width="30"
//             ></img>
//           </DropdownToggle>
//           <DropdownMenu style={{ background: "white" }}>
//             <DropdownItem>
//               <div className="dropdown-welcome">Welcome, {localStorage.getItem("username")}</div>
//             </DropdownItem>
//             <DropdownItem><button id="dropdownbtn" onClick={() => navigate('/myaccount')}>My Account</button></DropdownItem>
//             <DropdownItem><button id="dropdownbtn" onClick={() => navigate('/myprofile')}>Edit Profile</button></DropdownItem>
//             <DropdownItem divider />
//             <DropdownItem><button id="dropdownbtn" onClick={() => { localStorage.setItem("userRole", ""); navigate('/loginform') }}>Logout</button></DropdownItem>
//           </DropdownMenu>
//         </Dropdown>
//       </Collapse>
//     </Navbar>
//   );
// };

// export default Header;


// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import '../views/css/header.css';
// import {
//   Navbar,
//   Collapse,
//   Nav,
//   NavItem,
//   NavbarBrand,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
//   Dropdown,
//   Button,
// } from "reactstrap";
// import user1 from "../assets/images/users/user4.png";
// import Logo from "./Logo";

// const Header = ({ toggleSidebar, sidebarOpen }) => {
//   const [isOpen, setIsOpen] = React.useState(false);
//   const [dropdownOpen, setDropdownOpen] = React.useState(false);
//   const navigate = useNavigate();

//   const toggle = () => setDropdownOpen((prevState) => !prevState);
//   const Handletoggle = () => setIsOpen(!isOpen);

//   let role = localStorage.getItem("userRole");
//   role = role === 'admin' ? 'admin' : 'user';

//   return (
//     <Navbar className="navbar" dark expand="md">
//       <div className="d-flex align-items-center">
//         <Button
//           color="primary"
//           onClick={toggleSidebar}
//           className="toggle-sidebar-btn"
//         >
//           {sidebarOpen ? (
//             <i className="bi bi-x"></i>
//           ) : (
//             <i className="bi bi-list"></i>
//           )}
//         </Button>
//       </div>
//       <Logo/>
//       <Collapse navbar isOpen={isOpen}>
//         <Nav className="me-auto" navbar>
//           <NavItem>
//             <Link to={role === 'admin' ? '/home' : '/listofcandidates'} className="nav-link">
//               {role === 'admin' ? "ADMIN'S DASHBOARD" : "USER'S DASHBOARD"}
//             </Link>
//           </NavItem>
//         </Nav>
//         <Dropdown isOpen={dropdownOpen} toggle={toggle}>
//           <DropdownToggle className="icon">
//             <img
//               src={user1}
//               alt="profile"
//               className="rounded-circle"
//               width="30"
//             ></img>
//           </DropdownToggle>
//           <DropdownMenu style={{ background: "white" }}>
//             <DropdownItem>
//               <div className="dropdown-welcome">Welcome, {localStorage.getItem("username")}</div>
//             </DropdownItem>
//             <DropdownItem><button id="dropdownbtn" onClick={() => navigate('/myaccount')}>My Account</button></DropdownItem>
//             <DropdownItem><button id="dropdownbtn" onClick={() => navigate('/myprofile')}>Edit Profile</button></DropdownItem>
//             <DropdownItem divider />
//             <DropdownItem><button id="dropdownbtn" onClick={() => { localStorage.setItem("userRole", ""); navigate('/loginform') }}>Logout</button></DropdownItem>
//           </DropdownMenu>
//         </Dropdown>
//       </Collapse>
//     </Navbar>
//   );
// };

// export default Header;



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

  const path = localStorage.getItem('userRole') === 'admin' ? '/home' : '/listofcandidates';

  return (
    <Navbar className="navbar" dark expand="md">
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
      <Link to={path} className="navbar-brand">
        <img src={logo} alt="Logo" height="50px" width="200px" style={{ backgroundColor: "white", marginLeft: "10px", padding: "10px" }} />
      </Link>
      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>
          <NavItem>
            <Link to={role === 'admin' ? '/home' : '/listofcandidates'} className="nav-link">
              {role === 'admin' ? "ADMIN'S DASHBOARD" : "USER'S DASHBOARD"}
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
      </Collapse>
    </Navbar>
  );
};

export default Header;