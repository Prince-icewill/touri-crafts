import { CATALOG_PDF_URL } from "../data/products";
import "./PortfolioCatalog.css";

export default function PortfolioCatalog() {
  return (
    <section className="catalog-section dark-section">
      <div className="container catalog-inner">
        <div className="catalog-text">
          <span className="section-label">Our Portfolio</span>
          <h2 className="section-title">The Full Touri Crafts Catalog</h2>
          <p>
            Every piece we've made, one collection — carved boards, sculpted
            lamps, live-edge tables and beds. Browse the catalog below, or
            download your own copy to keep.
          </p>
          <div className="catalog-actions">
            <a href={CATALOG_PDF_URL} target="_blank" rel="noopener noreferrer" className="btn btn-light">
              View Catalog
            </a>
            <a href={CATALOG_PDF_URL} download className="btn-download-link">Download PDF ↓</a>
          </div>
         
        </div>

        <div className="catalog-preview">
          <div className="catalog-preview-frame">
            <iframe src={CATALOG_PDF_URL} title="Touri Crafts Catalog Preview" className="catalog-iframe" />
            <div className="catalog-preview-fallback">
              <p>Catalog preview will appear here once the PDF is added.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
