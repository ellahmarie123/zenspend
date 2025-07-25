import { Link } from "react-router-dom";
import "../../styles/Navbar.css";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <h1>Zenspend</h1>

      <button
        className="hamburger"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        {" "}
        ☰
      </button>

      <ul className={`nav-links ${menuOpen ? "show" : ""}`}>
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
