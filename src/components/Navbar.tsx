import Logo from "./Logo";
import NewGameButton from "../buttons/NewGameButton";
import ReplaysButton from "../buttons/ReplaysButton";
import { Link } from "react-router-dom";
import "../css/Navbar.css";

export const Navbar = () => {
  return (
    <nav className="navbar-container">
      <div className="logo-container">
        <Link className="nav-link" to="/">
          <Logo />
        </Link>
      </div>
      <div className="buttons-container">
        <ul>
          <li>
            <Link className="nav-link" to="/new_game">
              <NewGameButton />
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/replay">
              <ReplaysButton />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
