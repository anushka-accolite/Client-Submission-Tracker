import { Link } from "react-router-dom";

const Logo = () => {

  let path=localStorage.getItem("userRole")==='admin'?'/home':'/listofcandidates';
  return (
    <Link to={path}>
      <img src="ba2.png" height="200px" width="250px" style={{marginTop:"-70px",marginLeft:"5px"}}/>
    </Link>
  );
};

export default Logo;
