import { useAdmin } from "../context/AdminContext";
import "./Services.css";

export default function Services() {
  const { services } = useAdmin();

  return (
    <div className="services-page dark-section">
      <div className="container">
        <div className="services-header">
          <span className="section-label">What We Do</span>
          <h1 className="section-title">Our Services</h1>
          <p>
            Beyond the shop — custom wall installations, feature pieces, and
            builds shaped specifically for your space.
          </p>
        </div>

        <div className="services-grid">
          {services.map((s) => (
            <div key={s.id} className="service-card">
              <div className="service-card-image">
                <img src={s.image} alt={s.title} />
              </div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </div>
          ))}
        </div>

        <div className="services-cta">
          <p>Have a space in mind? Let's talk through what you need.</p>
          <a href="/customize" className="btn btn-light">Get in Touch</a>
        </div>
      </div>
    </div>
  );
}
