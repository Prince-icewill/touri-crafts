import { useState, useEffect } from "react";
import { REVIEWS } from "../data/products";
import "./ReviewsSlider.css";

export default function ReviewsSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % REVIEWS.length), 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="reviews-section">
      <div className="container">
        <span className="section-label">What Customers Say</span>
        <h2 className="section-title">Reviews</h2>

        <div className="reviews-track">
          {REVIEWS.map((r, i) => (
            <div key={i} className={`review-card ${i === index ? "review-active" : ""}`}>
              <div className="review-stars">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
              <p className="review-text">"{r.text}"</p>
              <p className="review-name">— {r.name}</p>
            </div>
          ))}
        </div>

        <div className="reviews-dots">
          {REVIEWS.map((_, i) => (
            <button key={i} className={`reviews-dot ${i === index ? "reviews-dot-active" : ""}`} onClick={() => setIndex(i)} aria-label={`Show review ${i + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
