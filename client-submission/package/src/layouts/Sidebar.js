// import React from 'react';
// import { Button, Nav, NavItem } from 'reactstrap';
// import Logo from './Logo';
// import { Link, useLocation } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// const adminNavigation = [
//   {
//     title: "Home",
//     href: "/home",
//     icon: "bi bi-house",
//   },
//   {
//     title: "Create Client",
//     href: "/createclient",
//     icon: "bi bi-plus",
//   },
//   {
//     title: "List of Clients",
//     href: "/listofclients",
//     icon: "bi bi-list",
//   },
//   {
//     title: "List of TA",
//     href: "/listofta",
//     icon: "bi bi-list",
//   },
//   {
//     title: "List of PM",
//     href: "/listofpm",
//     icon: "bi bi-list",
//   },
//   {
//     title: "List of AM",
//     href: "/listofam",
//     icon: "bi bi-list",
//   },
// ];

// const userNavigation = [
//   {
//     title: "List of Clients",
//     href: "/listofclientuser",
//     icon: "bi bi-list",
//   },
//   {
//     title: "List of Candidates",
//     href: "/listofcandidates",
//     icon: "bi bi-list",
//   },
//   {
//     title: "Submitted Profiles",
//     href: "/profile",
//     icon: "bi bi-list",
//   },

//   {
//     title:"Audit Log",
//     href:"/audit",
//     icon:"bi bi-activity"
//   }
// ];

// const Sidebar = () => {
//   const showMobilemenu = () => {
//     document.getElementById('sidebarArea').classList.toggle('showSidebar');
//   };
//   let location = useLocation();

//   const navigation = localStorage.getItem("role") === "admin" ? adminNavigation : userNavigation;

//   return (
//     <div id="sidebarArea" className="sidebarArea">
//       <div className="d-flex align-items-center">
//         <Logo />
//         <span className="ms-auto d-lg-none">
//             <button
//               className="toggle-sidebar-btn"
//               onClick={() => showMobilemenu()}
//             >
//               &#9776; 
//             </button>
//           <button
//             className="btn-close"
//             onClick={() => showMobilemenu()}
//           >
//             &times; {/* Close icon */}
//           </button>
//         </span>
//       </div>
//       <div className="pt-4 mt-2">
//         <Nav vertical>
//           {navigation.map((navi, index) => (
//             <NavItem key={index}>
//               <Link
//                 to={navi.href}
//                 className={
//                   location.pathname === navi.href
//                     ? 'text-primary bg-light nav-link py-3'
//                     : 'nav-link text-light py-3'
//                 }
//               >
//                 <i className={navi.icon}></i>
//                 <span className="ms-3 d-inline-block">{navi.title}</span>
//               </Link>
//             </NavItem>
//           ))}
//         </Nav>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


import React from 'react';
import { Nav, NavItem } from 'reactstrap';
import { Link, useLocation } from 'react-router-dom';

const adminNavigation = [
  { title: "Home", href: "/home", icon: "bi bi-house" },
  { title: "Create Client", href: "/createclient", icon: "bi bi-plus" },
  { title: "List of Clients", href: "/listofclients", icon: "bi bi-list" },
  { title: "List of TA", href: "/listofta", icon: "bi bi-list" },
  { title: "List of PM", href: "/listofpm", icon: "bi bi-list" },
  { title: "List of AM", href: "/listofam", icon: "bi bi-list" },
];

const userNavigation = [
  {
    title: "List of Clients",
    href: "/listofclientuser",
    icon: "bi bi-list",
  },
  { title: "List of Candidates", href: "/listofcandidates", icon: "bi bi-list" },
  { title: "Submitted Profiles", href: "/profile", icon: "bi bi-list" },
  { title: "Audit Log", href: "/audit", icon: "bi bi-activity" },
];

const Sidebar = ({ sidebarOpen }) => {
  let location = useLocation();
  const navigation = localStorage.getItem("role") === "admin" ? adminNavigation : userNavigation;

  return (
    <div style={{ width: '250px', flexShrink: 0, display: sidebarOpen ? 'block' : 'none', backgroundColor: '#073763' }}>
      <div style={{ paddingTop: '56px' }}>
        <Nav vertical>
          {navigation.map((navi, index) => (
            <NavItem key={index}>
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? 'text-primary bg-white nav-link py-3'
                    : 'nav-link text-white py-3'
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;