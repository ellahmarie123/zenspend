import { Link } from "react-router-dom";
import "../../styles/Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1>Zenspend</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>{" "}
        </li>
        <li>
          <Link to="/maintenance">Maintenance</Link>{" "}
        </li>
        <li>
          <Link to="/account">Account</Link>{" "}
        </li>
        <li>
          <Link to="/login">Login</Link>{" "}
        </li>
      </ul>
    </nav>
  );
}
