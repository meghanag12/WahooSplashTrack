import { Link } from "react-router-dom";
import registerIcon from "../register_icon.png";
import swimIcon from "../swim_icon.png";
import progressIcon from "../progress_icon.PNG";
import "./navbar.css";

export function Navbar() {
  return (
    <ul className="nav nav-pills nav-fill navbar-custom">
      <li className="nav-item">
        <Link className="nav-link nav-hover" to="/reg">
          <img src={registerIcon} alt="Register" className="nav-icon img-fluid" />
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link nav-hover" to="/magnituderecorder">
          <img src={swimIcon} alt="Swim" className="nav-icon img-fluid" />
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link nav-hover" to="/progresstracker">
          <img src={progressIcon} alt="Progress" className="nav-icon img-fluid" />
        </Link>
      </li>
    </ul>
  );
}
