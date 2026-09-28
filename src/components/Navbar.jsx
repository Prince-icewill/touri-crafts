import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

export default function Navbar() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/services", label: "Services" },
    { to: "/about", label: "About" },
    { to: "/blog", label: "Blog" },
    { to: "/customize", label: "Customize" },
  ];

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-logo" onClick={() => setOpen(false)}>
          <img src="/images/brand/logo.jpeg" alt="Touri Crafts" />
        </Link>

        <nav className={`navbar-links ${open ? "navbar-links-open" : ""}`}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar-actions">
          <Link to="/checkout" className="navbar-cart">
            Cart
            {count > 0 && <span className="navbar-cart-count">{count}</span>}
          </Link>
          <button className="navbar-burger" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
