import { lazy } from "react";
import { Navigate } from "react-router-dom";
import CreateProject from "../views/ui/CreateProject.js";
import Clients from "../views/ui/Clients.js";
import Listofta from "../views/ui/Listofta.js";
import Listofpm from "../views/ui/Listofpm.js";
import Listofam from "../views/ui/Listofam.js";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Starter = lazy(() => import("../views/Home.js"));
const Alerts = lazy(() => import("../views/ui/CreateProject.js"));
const Badges = lazy(() => import("../views/ui/Clients.js"));
const Buttons = lazy(() => import("../views/ui/Listofta.js"));
const Cards = lazy(() => import("../views/ui/Listofpm.js"));
const Grid = lazy(() => import("../views/ui/Listofam.js"));



/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/home" /> },
      { path: "/home", exact: true, element: <Starter /> },
      { path: "/createproject", exact: true, element: <CreateProject/> },
      { path: "/listofclients", exact: true, element: < Clients/> },
      { path: "/listofta", exact: true, element: <Listofta /> },
      { path: "/listofpm", exact: true, element: <Listofpm /> },
      { path: "/listofam", exact: true, element: <Listofam /> },
      
      
    ],
  },
];

export default ThemeRoutes;
