import { ReactComponent as LogoDark } from "../assets/images/logos/ba.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/home">
      <img src="ba2.png" height="167px" width="170px" style={{marginTop:"-60px",marginLeft:"18px"}}/>
    </Link>
  );
};

export default Logo;
