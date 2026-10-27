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
  const [customDescription, setCustomDescription] = useState("");
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const hasSizes = Array.isArray(product?.sizes) && product.sizes.length > 0;
  const hasColors = Array.isArray(product?.colors) && product.colors.length > 0;
  const hasAddOns = Array.isArray(product?.addOns) && product.addOns.length > 0;

  const [selectedSize, setSelectedSize] = useState(hasSizes ? product.sizes[0] : null);
  const [selectedColor, setSelectedColor] = useState(hasColors ? product.colors[0] : null);
  // Add-ons are independent, multiple can be picked — stored as a set of labels
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  if (!product) {
    return (
      <div className="container product-not-found">
        <p>This piece could not be found.</p>
        <Link to="/shop">Back to shop</Link>
      </div>
    );
  }

  const basePrice = hasSizes ? selectedSize.price : product.price;
  const addOnsTotal = hasAddOns
    ? product.addOns
        .filter((a) => selectedAddOns.includes(a.label))
        .reduce((sum, a) => sum + a.price, 0)
    : 0;
  const displayPrice = basePrice + addOnsTotal;
  const images = product.images && product.images.length > 0 ? product.images : [];

  function toggleAddOn(label) {
    setSelectedAddOns((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  }

  function handleAddToCart() {
    const variantParts = [];
    if (hasSizes) variantParts.push(selectedSize.label);
    if (hasColors) variantParts.push(selectedColor);
    if (selectedAddOns.length > 0) variantParts.push(...selectedAddOns);
    const variantLabel = variantParts.length > 0 ? ` (${variantParts.join(", ")})` : "";

    addItem({
      id: product.id + (variantParts.length > 0 ? "-" + variantParts.join("-").toLowerCase().replace(/\s+/g, "") : ""),
      baseId: product.id,
      name: product.name + variantLabel,
      price: displayPrice,
      images: product.images,
      size: hasSizes ? selectedSize.label : null,
      color: hasColors ? selectedColor : null,
      addOns: selectedAddOns,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function handleCustomFile(e) {
    const file = e.target.files?.[0];
    if (file) setCustomFile(file);
  }

  function sendCustomRequest() {
    let text = `Hi Touri Crafts, I'd like to customize the "${product.name}".`;
    if (customDescription.trim()) {
      text += ` ${customDescription.trim()}`;
    }
    if (customFile) {
      text += " I have a reference image I'd like to share.";
    }
    window.open(`${SOCIALS.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
  }

  return (
    <div className="product-detail">
      <div className="container">
        <div className="product-detail-grid">
          <div className="product-detail-gallery">
            <img src={images[activeImageIndex]} alt={product.name} className="product-main-image" />

            {images.length > 1 && (
              <div className="product-thumb-row">
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${product.name} view ${i + 1}`}
                    className={`product-thumb ${i === activeImageIndex ? "product-thumb-active" : ""}`}
                    onClick={() => setActiveImageIndex(i)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="product-detail-info">
            <h1>{product.name}</h1>
            <p className="product-detail-price">
              ₦{displayPrice.toLocaleString()}
              {addOnsTotal > 0 && (
                <span className="product-price-breakdown"> (incl. +₦{addOnsTotal.toLocaleString()} add-ons)</span>
              )}
            </p>
            <p className="product-detail-desc">{product.description}</p>

            {hasSizes && (
              <div className="product-option-group">
                <span className="product-option-label">Size</span>
                <div className="product-option-buttons">
                  {product.sizes.map((s) => (
                    <button
                      key={s.label}
                      className={`product-option-btn ${selectedSize.label === s.label ? "product-option-active" : ""}`}
                      onClick={() => setSelectedSize(s)}
                    >
                      {s.label} — ₦{s.price.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {hasColors && (
              <div className="product-option-group">
                <span className="product-option-label">Style</span>
                <div className="product-option-buttons">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      className={`product-option-btn ${selectedColor === c ? "product-option-active" : ""}`}
                      onClick={() => setSelectedColor(c)}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {hasAddOns && (
              <div className="product-option-group">
                <span className="product-option-label">Add-ons</span>
                <div className="product-option-buttons">
                  {product.addOns.map((a) => (
                    <button
                      key={a.label}
                      className={`product-option-btn ${selectedAddOns.includes(a.label) ? "product-option-active" : ""}`}
                      onClick={() => toggleAddOn(a.label)}
                    >
                      {selectedAddOns.includes(a.label) ? "✓ " : "+ "}{a.label} (+₦{a.price.toLocaleString()})
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.soldOut ? (
              <p className="sold-out-label">This piece is currently sold out</p>
            ) : (
              <button className="btn" onClick={handleAddToCart}>{added ? "Added ✓" : "Add to Cart"}</button>
            )}

            <div className="customize-block">
              <h4>Want it customized?</h4>
              <p>Tell us what you'd like changed or added, and/or upload a reference image — we'll reach out to discuss it with you directly.</p>
              <textarea
                className="custom-description-input"
                placeholder="Describe what you'd like, e.g. a specific size, engraving, or finish..."
                value={customDescription}
                onChange={(e) => setCustomDescription(e.target.value)}
                rows={3}
              />
              <label className="custom-upload-label">
                {customFile ? customFile.name : "Choose reference image (optional)"}
                <input type="file" accept="image/*" onChange={handleCustomFile} hidden />
              </label>
              <button
                className="btn-outline btn"
                onClick={sendCustomRequest}
                disabled={!customFile && !customDescription.trim()}
              >
                Send Customization Request
              </button>
              <p className="customize-note">We'll open WhatsApp for you — if you added a reference image, please attach it there to complete your request.</p>
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