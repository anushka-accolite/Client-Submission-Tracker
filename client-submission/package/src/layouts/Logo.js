import { ReactComponent as LogoDark } from "../assets/images/logos/ba.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/home">
      <img src="client-submission\package\src\assets\images\logos\ba.png"></img>
    </Link>
  );
};

export default Logo;
