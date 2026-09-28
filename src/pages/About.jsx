import { useAdmin } from "../context/AdminContext";
import "./About.css";

export default function About() {
  const { getSiteImage } = useAdmin();
  const aboutPhoto = getSiteImage("aboutPhoto", "/images/inspiration/root-table-detail.jpeg");

  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="about-hero-pattern" />
        <div className="container">
          <span className="section-label" style={{ color: "var(--color-brown-light)" }}>Our Story</span>
          <h1>About Touri Crafts</h1>
        </div>
      </div>

      <div className="container about-body">
        <div className="about-lead-row">
          <div className="about-lead-image">
            <img src={aboutPhoto} alt="Handcrafted wooden furniture detail" />
            
          </div>
          <p className="about-lead">
            Touri Crafts is a Nigerian brand bringing artistry, tradition, and
            craftsmanship to everyday living. We create functional art pieces —
            art you can use — that are built to last: chopping boards, side
            tables, lamps, and more. From your kitchen to your living room, we
            blend function with art and aesthetics.
          </p>
        </div>

        <div className="about-columns">
          <div>
            <h3>Where It Started</h3>
            <p>
              Every piece we make begins the same way — with a single, raw
              piece of wood, and an idea rooted in where we come from.
              That's the tradition Touri Crafts continues, just reimagined
              for how people live today.
            </p>
          </div>
          <div>
            <h3>What We Believe</h3>
            <p>
              We believe furniture shouldn't just fill a room — it should
              tell a story. Every carving, every grain pattern, every rough
              edge we leave untouched is intentional.
            </p>
          </div>
        </div>

        <div className="about-quote">
          <p>"Handmade. Functional. Craftsmanship."</p>
        </div>
      </div>
    </div>
  );
}
