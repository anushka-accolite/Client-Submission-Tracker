import { element } from "prop-types";
import { lazy } from "react";
import { Navigate } from "react-router-dom";
;
// Layout
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));
// Pages
const Starter = lazy(() => import("../views/ui/Admin/Home.js"));
const CreateClient = lazy(() => import("../views/ui/Admin/CreateClient.js"));
const Clients = lazy(() => import("../views/ui/Admin/Clients.js"));
const Listofta = lazy(() => import("../views/ui/Admin/Listofta.js"));
const Listofpm = lazy(() => import("../views/ui/Admin/Listofpm.js"));
const Listofam = lazy(() => import("../views/ui/Admin/Listofam.js"));
const Listofcandidates=lazy(() => import("../views/ui/User/Listofcandidate.js"));
const AuditLog=lazy(() => import("../views/ui/User/AuditLog.js"));
const SubmittedProfile=lazy(()=> import("../views/ui/User/SubmittedProfile.js"));
const EditProfile=lazy(()=> import("../views/ui/Admin/EditProfile.js"));
const LoginForm=lazy(()=> import("../views/ui/LoginPage/LoginForm.js"));
const MyAccount=lazy(()=> import("../views/ui/Admin/MyAccount.js"));
const ListofClients=lazy(()=>import("../views/ui/User/ListofClients.js"))
const BenchOffer=lazy(()=>import("../views/ui/User/BenchOffer.js"));

// Routes
const ThemeRoutes = [
  {
    path:"/loginform",
    element:<LoginForm/>
  },
  {
    path: "/",  
    element: <FullLayout showSidebarAndHeader={false} />,
    children: [
      { path: "/", element: <Navigate to="/loginform" /> },
      { path: "/loginform", exact: true, element: <LoginForm/> }
    ],
  },
  {
    path: "/",  
    element: <FullLayout showSidebarAndHeader={true} />,
    children: [
      { path: "/home", exact: true, element: <Starter /> },
      { path: "/createclient", exact: true, element: <CreateClient /> },
      { path: "/listofclients", exact: true, element: <Clients /> },
      { path: "/listofta", exact: true, element: <Listofta /> },
      { path: "/listofpm", exact: true, element: <Listofpm /> },
      { path: "/listofam", exact: true, element: <Listofam /> },
      { path: "/listofcandidates",exact:true,element:<Listofcandidates/>},
      { path: "/profile",exact:true,element:<SubmittedProfile/>},
      { path: "/myprofile",exact:true,element:<EditProfile/>},
      { path: "/audit",exact:true,element:<AuditLog/>},
      { path: "/listofclientuser",exact:true,element:<ListofClients/>},
      { path: "/myaccount",exact:true,element:<MyAccount/>},
      { path: "/benchoffer",exact:true,element:<BenchOffer/>}

      
    ],
  },
  
];
export default ThemeRoutes;



