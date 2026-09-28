import { useState } from "react";
import { SOCIALS } from "../data/products";
import "./Customize.css";

export default function Customize() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");

  function handleFile(e) {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  }

  function sendVia(channel) {
    const baseMsg = description
      ? `Hi Touri Crafts, I'd like a custom piece made: ${description}`
      : "Hi Touri Crafts, I'd like to talk about a custom piece.";
    const msg = encodeURIComponent(file ? `${baseMsg} (I have a reference image to share)` : baseMsg);

    if (channel === "whatsapp") {
      window.open(`${SOCIALS.whatsapp}?text=${msg}`, "_blank");
    } else {
      window.open(SOCIALS.instagram, "_blank");
    }
  }

  return (
    <div className="customize-page dark-section">
      <div className="container customize-inner">
        <div className="customize-intro">
          <span className="section-label">Made Just For You</span>
          <h1 className="section-title">Customize a Piece</h1>
          <p>Have something specific in mind? Tell us about it and share a reference image if you have one. We'll get back to you directly on WhatsApp or Instagram.</p>
        </div>

        <div className="customize-form">
          <label className="customize-field">
            <span>Describe what you'd like</span>
            <textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g. A round chopping board with my initials carved in..." />
          </label>

          <label className="customize-upload">
            {file ? file.name : "Upload a reference image (optional)"}
            <input type="file" accept="image/*" onChange={handleFile} hidden />
          </label>

          <div className="customize-channel-buttons">
            <button className="btn btn-light" onClick={() => sendVia("whatsapp")}>Continue on WhatsApp</button>
            <button className="btn-outline btn customize-ig-btn" onClick={() => sendVia("instagram")}>Continue on Instagram</button>
          </div>

          <p className="customize-note">We'll open the chat for you — please attach your reference image there.</p>
        </div>
      </div>
    </div>
  );
}
