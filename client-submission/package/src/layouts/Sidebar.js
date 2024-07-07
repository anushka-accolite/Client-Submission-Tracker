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
  { title: "Bench Offer", href: "/benchoffer", icon: "bi bi-list" },
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