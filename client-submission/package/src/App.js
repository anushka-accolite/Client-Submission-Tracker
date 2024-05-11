import { useRoutes } from "react-router-dom";
import Themeroutes from "./routes/Router";
import { useEffect } from "react";

const App = () => {
  const routing = useRoutes(Themeroutes);
  useEffect(()=>{
    localStorage.setItem("role","admin");
  },[])

  return <div className="dark">{routing}</div>;
  
};

export default App;
