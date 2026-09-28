import { Link } from "react-router-dom";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-card-image">
        <img src={product.images[0]} alt={product.name} />
        {product.soldOut && <span className="product-badge">Sold Out</span>}
      </div>
      <div className="product-card-info">
        <h3>{product.name}</h3>
        <p className="product-card-price">
          {product.oldPrice && <span className="old-price">₦{product.oldPrice.toLocaleString()}</span>}
          ₦{product.price.toLocaleString()}
          {product.priceMax && ` – ₦${product.priceMax.toLocaleString()}`}
        </p>
      </div>
    </Link>
  );
}
