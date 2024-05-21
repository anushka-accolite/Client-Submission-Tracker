import { Button, Nav, NavItem } from "reactstrap";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const adminNavigation = [
  {
    title: "Home",
    href: "/home",
    icon: "bi bi-house",
  },
  {
    title: "Create Client",
    href: "/createclient",
    icon: "bi bi-plus",
  },
  {
    title: "List of Clients",
    href: "/listofclients",
    icon: "bi bi-list",
  },
  {
    title: "List of TA",
    href: "/listofta",
    icon: "bi bi-list",
  },
  {
    title: "List of PM",
    href: "/listofpm",
    icon: "bi bi-list",
  },
  {
    title: "List of AM",
    href: "/listofam",
    icon: "bi bi-list",
  },
];

const userNavigation = [
  {
    title: "List of Candidates",
    href: "/listofcandidates",
    icon: "bi bi-house",
  },
  {
    title: "Submitted Profiles",
    href: "/profile",
    icon: "bi bi-person",
  },
  // Add more user-specific navigation items here
  {

  }
];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();
  
  // const navigation = role === "admin" ? adminNavigation : userNavigation;
  const navigation = localStorage.getItem("role") === "admin" ? adminNavigation : userNavigation;

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <Logo/>
        <span className="ms-auto d-lg-none">
        <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={() => showMobilemenu()}
        ></Button>
        </span>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="" >
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "text-primary bg-white nav-link py-3"
                    : "nav-link text-white py-3"
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

