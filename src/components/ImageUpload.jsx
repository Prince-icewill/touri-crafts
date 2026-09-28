import { useRef } from "react";
import "./ImageUpload.css";

// Converts a selected file into a base64 data URL so it can be saved
// directly into Firestore alongside the product/content data — no
// separate file server needed, no typing a path. The client just
// clicks, picks a photo from their phone/computer, and it's done.
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function ImageUpload({ value, onChange, label = "Upload image" }) {
  const inputRef = useRef(null);

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024 * 2) {
      alert("Please choose an image smaller than 2MB for best performance.");
      return;
    }

    const base64 = await fileToBase64(file);
    onChange(base64);
  }

  return (
    <div className="image-upload">
      <div
        className="image-upload-preview"
        onClick={() => inputRef.current?.click()}
      >
        {value ? (
          <img src={value} alt="Preview" />
        ) : (
          <span className="image-upload-placeholder">{label}</span>
        )}
        <div className="image-upload-overlay">
          {value ? "Change photo" : "Click to choose photo"}
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        hidden
      />
    </div>
  );
}
