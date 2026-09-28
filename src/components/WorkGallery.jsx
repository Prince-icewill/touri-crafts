import { useState, useEffect } from "react";
import "./WorkGallery.css";

const GALLERY_IMAGES = [
  { src: "/images/products/placeholder-board.jpg", caption: "Hand-carved boards" },
  { src: "/images/products/placeholder-lamp.jpg", caption: "Sculptural lamps" },
  { src: "/images/products/placeholder-table.jpg", caption: "Live-edge tables" },
  { src: "/images/products/placeholder-bed.jpg", caption: "Media Console" },
  { src: "/images/products/placeholder-boardstand.jpg", caption: "Book stands" },
];

export default function WorkGallery() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive((a) => (a + 1) % GALLERY_IMAGES.length), 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="work-gallery dark-section">
      <div className="container">
        <span className="section-label">A Glimpse Into the Craft</span>
        <h2 className="section-title">Our Work, In Motion</h2>

        <div className="gallery-stage">
          {GALLERY_IMAGES.map((img, i) => (
            <figure key={i} className={`gallery-slide ${i === active ? "gallery-slide-active" : ""}`}>
              <img src={img.src} alt={img.caption} />
              <figcaption>{img.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
