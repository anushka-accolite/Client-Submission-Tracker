// import { lazy } from "react";
// import { Navigate } from "react-router-dom";
// // import CreateProject from "../views/ui/CreateClient.js";
// import Clients from "../views/ui/Admin/Clients.js";
// import Listofta from "../views/ui/Admin/Listofta.js";
// import Listofpm from "../views/ui/Admin/Listofpm.js";
// import Listofam from "../views/ui/Admin/Listofam.js";
// import CreateClient from "../views/ui/Admin/CreateClient.js";
// import AM from "../views/ui/User/AM.js";

// /****Layouts*****/
// const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

// /***** Pages ****/

// const Starter = lazy(() => import("../views/ui/Admin/Home.js"));
// const Alerts = lazy(() => import("../views/ui/Admin/CreateClient.js"));
// const Badges = lazy(() => import("../views/ui/Admin/Clients.js"));
// const Buttons = lazy(() => import("../views/ui/Admin/Listofta.js"));
// const Cards = lazy(() => import("../views/ui/Admin/Listofpm.js"));
// const Grid = lazy(() => import("../views/ui/Admin/Listofam.js"));
// const abc=lazy(() => import("../views/ui/User/AM.js"));


// /*****Routes******/

// const ThemeRoutes = [
//   {
//     path: "/",
//     element: <FullLayout />,
//     children: [
//       { path: "/", element: <Navigate to="/home" /> },
//       { path: "/home", exact: true, element: <Starter /> },
//       { path: "/createclient", exact: true, element: <CreateClient/> },
//       { path: "/listofclients", exact: true, element: < Clients/> },
//       { path: "/listofta", exact: true, element: <Listofta /> },
//       { path: "/listofpm", exact: true, element: <Listofpm /> },
//       { path: "/listofam", exact: true, element: <Listofam /> },
//       { path:  "/AM",exact:true,element:<AM/>}
      
//     ],
//   },
// ];

// export default ThemeRoutes;

import { element } from "prop-types";
import { lazy } from "react";
import { Navigate } from "react-router-dom";;
// Import components from the appropriate paths

// Import other components as needed
// Layout
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));
// Pages
const Starter = lazy(() => import("../views/ui/Admin/Home.js"));
const CreateClient = lazy(() => import("../views/ui/Admin/CreateClient.js"));
const Clients = lazy(() => import("../views/ui/Admin/Clients.js"));
const Listofta = lazy(() => import("../views/ui/Admin/Listofta.js"));
const Listofpm = lazy(() => import("../views/ui/Admin/Listofpm.js"));
const Listofam = lazy(() => import("../views/ui/Admin/Listofam.js"));
const AM=lazy(() => import("../views/ui/User/AM.js"));
const Listofcandidates=lazy(() => import("../views/ui/User/Listofcandidate.js"));
const SubmittedProfile=lazy(()=> import("../views/ui/User/SubmittedProfile.js"))
// Routes
const ThemeRoutes = [
  {
    path: "/",  
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/home" /> },
      { path: "/home", exact: true, element: <Starter /> },
      { path: "/createclient", exact: true, element: <CreateClient /> },
      { path: "/listofclients", exact: true, element: <Clients /> },
      { path: "/listofta", exact: true, element: <Listofta /> },
      { path: "/listofpm", exact: true, element: <Listofpm /> },
      { path: "/listofam", exact: true, element: <Listofam /> },
      { path: "/AM", exact: true, element: <AM/> },
      {path:"/listofcandidates",exact:true,element:<Listofcandidates/>},
      {path:"/profile",exact:true,element:<SubmittedProfile/>}
    ],
  },
];
export default ThemeRoutes;
