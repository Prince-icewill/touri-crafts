import { useEffect, useState } from "react";
import "./IntroAnimation.css";

export default function IntroAnimation({ onComplete }) {
  const [phase, setPhase] = useState("in");

  useEffect(() => {
    const holdTimer = setTimeout(() => setPhase("out"), 1700);
    const doneTimer = setTimeout(() => onComplete?.(), 2500);
    return () => {
      clearTimeout(holdTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div className={`intro-overlay intro-${phase}`}>
      <div className="intro-logo-wrap">
        <img src="/images/brand/logo.jpeg" alt="Touri Crafts" className="intro-logo-img" />
      </div>
      <div className="intro-line" />
    </div>
  );
}
