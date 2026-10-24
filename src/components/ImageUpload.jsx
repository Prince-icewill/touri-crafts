import { useRef, useState } from "react";
import "./ImageUpload.css";

// Resizes and compresses the image in the browser before it's converted
// to base64 and saved — keeps product documents well under Firestore's
// 1MB-per-document limit even with several photos on one item.
function compressImage(file, maxWidth = 1000, quality = 0.75) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function ImageUpload({ value, onChange, label = "Upload image" }) {
  const inputRef = useRef(null);
  const [processing, setProcessing] = useState(false);

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setProcessing(true);
    try {
      const compressed = await compressImage(file);
      onChange(compressed);
    } catch (err) {
      alert("Couldn't process that image — please try a different photo.");
      console.error(err);
    }
    setProcessing(false);
  }

  return (
    <div className="image-upload">
      <div
        className="image-upload-preview"
        onClick={() => !processing && inputRef.current?.click()}
      >
        {value ? (
          <img src={value} alt="Preview" />
        ) : (
          <span className="image-upload-placeholder">
            {processing ? "Processing..." : label}
          </span>
        )}
        <div className="image-upload-overlay">
          {processing ? "Please wait..." : value ? "Change photo" : "Click to choose photo"}
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