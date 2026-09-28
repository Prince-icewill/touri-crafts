import { Link } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import "./ServicesPreview.css";

export default function ServicesPreview() {
  const { services } = useAdmin();

  return (
    <section className="services-preview dark-section">
      <div className="container">
        <div className="services-preview-header">
          <div>
            <span className="section-label">What We Do</span>
            <h2 className="section-title">Services</h2>
          </div>
          <Link to="/services" className="services-view-all">View All →</Link>
        </div>

        <div className="services-preview-grid">
          {services.slice(0, 4).map((s) => (
            <div key={s.id} className="service-div">
              <img src={s.image} alt={s.title} />
              <div className="service-div-overlay">
                <h3>{s.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
