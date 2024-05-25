import { Link } from "react-router-dom";

const Logo = () => {

  let path=localStorage.getItem("userRole")==='admin'?'/home':'/listofcandidates';
  return (
    <Link to={path}>
      <img src="ba2.png" height="167px" width="170px" style={{marginTop:"-60px",marginLeft:"35px"}}/>
    </Link>
  );
};

export default Logo;
