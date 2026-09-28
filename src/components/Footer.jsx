import { Link } from "react-router-dom";
import { SOCIALS, PICKUP_LOCATIONS } from "../data/products";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer dark-section">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src="/images/brand/logo.jpeg" alt="Touri Crafts" className="footer-logo-img" />
          <p>
            Handmade. Functional. Craftsmanship. Bringing Nigerian artistry
            and tradition into everyday living.
          </p>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <Link to="/shop">Shop</Link>
          <Link to="/services">Services</Link>
          <Link to="/about">About</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/customize">Customize</Link>
        </div>

        <div className="footer-col">
          <h4>Pickup Locations</h4>
          {PICKUP_LOCATIONS.map((p) => (
            <p key={p.id} className="footer-address">{p.label}</p>
          ))}
        </div>

        <div className="footer-col">
          <h4>Connect</h4>
          <a href={SOCIALS.instagram} target="_blank" rel="noreferrer">Instagram</a>
          <a href={SOCIALS.tiktok} target="_blank" rel="noreferrer">TikTok</a>
          <a href={SOCIALS.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
          <a href={SOCIALS.facebook} target="_blank" rel="noreferrer">Facebook</a>
          <a href={SOCIALS.youtube} target="_blank" rel="noreferrer">YouTube</a>
          <a href={SOCIALS.x} target="_blank" rel="noreferrer">X</a>
        </div>
      </div>

      <div className="footer-bottom container">
        <p>&copy; {new Date().getFullYear()} Touri Crafts. All rights reserved.</p>
        {/* Discreet admin access — no need to remember or type /admin */}
        <Link to="/admin" className="footer-admin-link">Admin</Link>
      </div>
    </footer>
  );
}
