import { useState } from "react";
import { CATEGORIES } from "../data/products";
import { useAdmin } from "../context/AdminContext";
import ProductCard from "../components/ProductCard";
import "./Shop.css";

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("all");
  const { products } = useAdmin();

  const filtered = activeCategory === "all" ? products : products.filter((p) => p.category === activeCategory);

  return (
    <div className="shop-page">
      <div className="container">
        <div className="shop-header">
          <span className="section-label">The Collection</span>
          <h1 className="section-title">Shop All Pieces</h1>
        </div>

        <div className="shop-tabs">
          {CATEGORIES.map((cat) => (
            <button key={cat.id} className={`shop-tab ${activeCategory === cat.id ? "shop-tab-active" : ""}`} onClick={() => setActiveCategory(cat.id)}>
              {cat.label}
            </button>
          ))}
        </div>

        <div className="shop-grid">
          {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
          {filtered.length === 0 && <p className="shop-empty">No pieces in this category yet.</p>}
        </div>
      </div>
    </div>
  );
}
