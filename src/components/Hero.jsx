import { Link } from "react-router-dom";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-pattern" />
      <div className="hero-overlay" />
      <div className="container hero-inner">
        <span className="section-label hero-label">Handmade &middot; Functional &middot; Craftsmanship</span>
        <h1 className="hero-title">
          Where Nigerian Tradition
          <br />
          Meets Modern Craft
        </h1>
        <p className="hero-sub">
          Every piece we carve tells a story — of culture, of origin, of
          hands that shaped it before it ever reached yours. This is Touri
          Crafts.
        </p>
        <div className="hero-actions">
          <Link to="/shop" className="btn btn-light">Explore the Collection</Link>
          <Link to="/about" className="hero-link">Our Story →</Link>
        </div>
      </div>
    </section>
  );
}
