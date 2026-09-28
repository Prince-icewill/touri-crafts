import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { SOCIALS } from "../data/products";
import { useCart } from "../context/CartContext";
import { useAdmin } from "../context/AdminContext";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const { products } = useAdmin();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [customFile, setCustomFile] = useState(null);

  if (!product) {
    return (
      <div className="container product-not-found">
        <p>This piece could not be found.</p>
        <Link to="/shop">Back to shop</Link>
      </div>
    );
  }

  function handleAddToCart() {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function handleCustomFile(e) {
    const file = e.target.files?.[0];
    if (file) setCustomFile(file);
  }

  function sendCustomRequest() {
    const msg = encodeURIComponent(
      `Hi Touri Crafts, I'd like to customize the "${product.name}". I have a reference image I'd like to share.`
    );
    window.open(`${SOCIALS.whatsapp}?text=${msg}`, "_blank");
  }

  return (
    <div className="product-detail">
      <div className="container">
        <div className="product-detail-grid">
          <div className="product-detail-gallery">
            <img src={product.images[0]} alt={product.name} />
            <div className="product-thumb-row">
              {(product.images.length > 1 ? product.images : [product.images[0], product.images[0], product.images[0]]).map((img, i) => (
                <img key={i} src={img} alt={`${product.name} view ${i + 1}`} className="product-thumb" />
              ))}
            </div>
          </div>

          <div className="product-detail-info">
            <h1>{product.name}</h1>
            <p className="product-detail-price">
              ₦{product.price.toLocaleString()}
              {product.priceMax && ` – ₦${product.priceMax.toLocaleString()}`}
            </p>
            <p className="product-detail-desc">{product.description}</p>

            {product.soldOut ? (
              <p className="sold-out-label">This piece is currently sold out</p>
            ) : (
              <button className="btn" onClick={handleAddToCart}>{added ? "Added ✓" : "Add to Cart"}</button>
            )}

            <div className="customize-block">
              <h4>Want it customized?</h4>
              <p>Upload a reference image of what you'd like changed or added, and we'll reach out to discuss it with you directly.</p>
              <label className="custom-upload-label">
                {customFile ? customFile.name : "Choose reference image"}
                <input type="file" accept="image/*" onChange={handleCustomFile} hidden />
              </label>
              <button className="btn-outline btn" onClick={sendCustomRequest} disabled={!customFile}>Send Customization Request</button>
              <p className="customize-note">We'll open WhatsApp for you — please attach the image there to complete your request.</p>
            </div>
          </div>
        </div>

        <div className="product-extended">
          <div className="product-extended-block">
            <h3>The Story Behind This Piece</h3>
            <p>
              Every {product.name} begins as a single, raw piece of solid
              wood. Nothing about it is mass-produced — the grain pattern
              you see is completely unique to this exact piece, shaped by
              hand in the Touri Crafts workshop.
            </p>
          </div>

          <div className="product-extended-block">
            <h3>Materials &amp; Care</h3>
            <ul className="product-care-list">
              <li>Solid, hand-finished hardwood — no veneers or laminates</li>
              <li>Wipe clean with a soft, dry cloth after use</li>
              <li>Avoid prolonged direct sunlight or soaking in water</li>
              <li>Recondition every few months with food-safe oil or furniture wax</li>
            </ul>
          </div>

          <div className="product-extended-gallery">
            <h3>More From the Workshop</h3>
            <div className="product-extended-images">
              <img src="/images/inspiration/root-table-1.jpeg" alt="Workshop detail" />
              <img src="/images/inspiration/oars-detail-1.jpeg" alt="Workshop detail" />
              <img src="/images/inspiration/root-table-detail.jpeg" alt="Workshop detail" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
