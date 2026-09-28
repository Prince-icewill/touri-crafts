import { Link } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import ProductCard from "./ProductCard";
import "./FeaturedProducts.css";

export default function FeaturedProducts() {
  const { products } = useAdmin();
  const featured = products.slice(0, 4);

  return (
    <section className="featured-section">
      <div className="container">
        <div className="featured-header">
          <div>
            <span className="section-label">Fresh From the Workshop</span>
            <h2 className="section-title">Featured Pieces</h2>
          </div>
          <Link to="/shop" className="featured-view-all">View All →</Link>
        </div>
        <div className="featured-grid">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
