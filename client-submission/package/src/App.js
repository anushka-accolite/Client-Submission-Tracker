import React, { useEffect } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import Themeroutes from "./routes/Router";
import Loader from "./layouts/loader/Loader"; // Assuming you have a Loader component for lazy loading
import { Suspense } from "react";
// import LoginForm from "./components/LoginForm"; // Assuming you have a LoginForm component

const App = () => {
  const routing = useRoutes(Themeroutes);
  const navigate = useNavigate();

  useEffect(() => {
    let role = localStorage.getItem("userRole");

    if (role) {
      role = role.toLowerCase().replace(/\s+/g, ' ').trim();
      if (["accountmanager", "talentacquistion", "projectmanager"].includes(role)) {
        role = "user";
      } else if (role === "admin") {
        role = "admin";
      }
      localStorage.setItem("role", role);
    } 
    else {
      navigate("/loginform");
    }
  }, [navigate]);

  return (
    <Suspense fallback={<Loader />}>
      <div className="dark">
        {routing}
      </div>
    </Suspense>
  );
};

export default App;
