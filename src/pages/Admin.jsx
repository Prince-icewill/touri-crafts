import { useState } from "react";
import { useAdmin } from "../context/AdminContext";
import { CATEGORIES } from "../data/products";
import ImageUpload from "../components/ImageUpload";
import "./Admin.css";

export default function Admin() {
  const { isAuthed, authLoading, login, logout } = useAdmin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  if (authLoading) {
    return <div className="admin-login container"><p>Loading...</p></div>;
  }

  if (!isAuthed) {
    async function handleLogin() {
      setError("");
      setLoggingIn(true);
      const ok = await login(email, password);
      if (!ok) setError("Incorrect email or password");
      setLoggingIn(false);
    }

    return (
      <div className="admin-login container">
        <h2>Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />
        <button className="btn" onClick={handleLogin} disabled={loggingIn}>
          {loggingIn ? "Logging in..." : "Log In"}
        </button>
        {error && <p className="admin-error">{error}</p>}
        <p className="admin-login-note">
          This account is created in Firebase Console under Authentication &gt; Users — see FIRESTORE_RULES.txt and src/firebase/config.js for setup.
        </p>
      </div>
    );
  }

  return <AdminDashboard onLogout={logout} />;
}

function AdminDashboard({ onLogout }) {
  const { adminEmail } = useAdmin();
  const [tab, setTab] = useState("products");

  return (
    <div className="admin-dashboard container">
      <div className="admin-header">
        <div>
          <h1>Manage Touri Crafts</h1>
          {adminEmail && <p className="admin-signed-in-as">Signed in as {adminEmail}</p>}
        </div>
        <button className="btn-outline btn" onClick={onLogout}>Log Out</button>
      </div>

      <div className="admin-tabs">
        <button className={tab === "products" ? "active" : ""} onClick={() => setTab("products")}>Products</button>
        <button className={tab === "services" ? "active" : ""} onClick={() => setTab("services")}>Services</button>
        <button className={tab === "site" ? "active" : ""} onClick={() => setTab("site")}>Site Images</button>
      </div>

      {tab === "products" && <ProductsTab />}
      {tab === "services" && <ServicesTab />}
      {tab === "site" && <SiteImagesTab />}
    </div>
  );
}

function emptyForm() {
  return { id: null, name: "", category: CATEGORIES[1]?.id || "boards", price: "", description: "", images: [] };
}

function ProductsTab() {
  const { products, addProduct, updateProduct, toggleSoldOut, deleteProduct } = useAdmin();
  const [form, setForm] = useState(emptyForm());
  const [saving, setSaving] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function startEdit(product) {
    setForm({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description,
      images: product.images || [],
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setForm(emptyForm());
  }

  function updateImageAt(index, base64) {
    setForm((f) => {
      const images = [...f.images];
      images[index] = base64;
      return { ...f, images };
    });
  }

  function addImageSlot() {
    setForm((f) => ({ ...f, images: [...f.images, ""] }));
  }

  function removeImageSlot(index) {
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== index) }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.price) return;

    const cleanImages = form.images.filter(Boolean);
    if (cleanImages.length === 0) {
      alert("Please add at least one photo for this item.");
      return;
    }

    setSaving(true);
    try {
      if (form.id) {
        await updateProduct(form.id, {
          name: form.name,
          category: form.category,
          price: Number(form.price),
          description: form.description,
          images: cleanImages,
        });
      } else {
        const id = form.name.toLowerCase().trim().replace(/\s+/g, "-") + "-" + Date.now();
        await addProduct({
          id,
          name: form.name,
          category: form.category,
          price: Number(form.price),
          description: form.description || "Handcrafted with care.",
          images: cleanImages,
          soldOut: false,
        });
      }
      setForm(emptyForm());
    } catch (err) {
      alert("Couldn't save — check the Firebase setup note in src/firebase/config.js");
      console.error(err);
    }
    setSaving(false);
  }

  return (
    <>
      <form className="admin-form" onSubmit={handleSubmit}>
        <h3>{form.id ? "Edit Item" : "Add New Item"}</h3>
        <div className="admin-form-grid">
          <input name="name" placeholder="Item name" value={form.name} onChange={handleChange} required />
          <select name="category" value={form.category} onChange={handleChange}>
            {CATEGORIES.filter((c) => c.id !== "all").map((c) => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
          <input name="price" type="number" placeholder="Price (₦)" value={form.price} onChange={handleChange} required />
        </div>
        <textarea name="description" placeholder="Short description" value={form.description} onChange={handleChange} rows={2} />

        <div className="admin-images-label">Photos</div>
        <div className="admin-image-grid">
          {form.images.map((img, i) => (
            <div key={i} className="admin-image-slot">
              <ImageUpload value={img} onChange={(b64) => updateImageAt(i, b64)} label="Photo" />
              <button type="button" className="admin-remove-image" onClick={() => removeImageSlot(i)}>Remove</button>
            </div>
          ))}
          <button type="button" className="admin-add-image" onClick={addImageSlot}>+ Add Photo</button>
        </div>

        <div className="admin-form-actions">
          <button type="submit" className="btn" disabled={saving}>{saving ? "Saving..." : form.id ? "Save Changes" : "Add Item"}</button>
          {form.id && <button type="button" className="btn-outline btn" onClick={cancelEdit}>Cancel</button>}
        </div>
      </form>

      <div className="admin-list">
        <h3>All Items ({products.length})</h3>
        {products.map((p) => (
          <div key={p.id} className="admin-item">
            <img src={p.images[0]} alt={p.name} />
            <div className="admin-item-info">
              <p className="admin-item-name">{p.name}</p>
              <p className="admin-item-meta">{p.category} — ₦{p.price.toLocaleString()}</p>
            </div>
            <button className="admin-edit-btn" onClick={() => startEdit(p)}>Edit</button>
            <button className={`admin-soldout-btn ${p.soldOut ? "is-sold-out" : ""}`} onClick={() => toggleSoldOut(p.id)}>
              {p.soldOut ? "Mark In Stock" : "Mark Sold Out"}
            </button>
            <button className="admin-delete-btn" onClick={() => deleteProduct(p.id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}

function ServicesTab() {
  const { services, updateService } = useAdmin();
  const [editing, setEditing] = useState(null);
  const [draft, setDraft] = useState({ title: "", description: "", image: "" });
  const [saving, setSaving] = useState(false);

  function startEdit(service) {
    setEditing(service.id);
    setDraft({ title: service.title, description: service.description, image: service.image });
  }

  async function save() {
    setSaving(true);
    try {
      await updateService(editing, draft);
      setEditing(null);
    } catch (err) {
      alert("Couldn't save — check the Firebase setup note in src/firebase/config.js");
    }
    setSaving(false);
  }

  return (
    <div className="admin-services">
      <p className="admin-tab-note">These 4 service cards show on the homepage and Services page — the wall/installation work, separate from shop products.</p>
      {services.map((s) => (
        <div key={s.id} className="admin-service-row">
          {editing === s.id ? (
            <div className="admin-service-edit">
              <ImageUpload value={draft.image} onChange={(b64) => setDraft((d) => ({ ...d, image: b64 }))} label="Service photo" />
              <input value={draft.title} onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))} placeholder="Title" />
              <textarea value={draft.description} onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))} rows={2} placeholder="Description" />
              <div className="admin-form-actions">
                <button className="btn" onClick={save} disabled={saving}>{saving ? "Saving..." : "Save"}</button>
                <button className="btn-outline btn" onClick={() => setEditing(null)}>Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <img src={s.image} alt={s.title} />
              <div className="admin-item-info">
                <p className="admin-item-name">{s.title}</p>
                <p className="admin-item-meta">{s.description}</p>
              </div>
              <button className="admin-edit-btn" onClick={() => startEdit(s)}>Edit</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

const SITE_IMAGE_SPOTS = [
  { key: "aboutPhoto", label: "About Page — Cultural Photo (left side)" },
  { key: "heroBackgroundOverlayNote", label: "Hero pattern stays fixed — this slot is for a future hero photo if you add one" },
];

function SiteImagesTab() {
  const { getSiteImage, setSiteImage } = useAdmin();
  const [saving, setSaving] = useState(null);

  async function handleUpload(key, base64) {
    setSaving(key);
    try {
      await setSiteImage(key, base64);
    } catch (err) {
      alert("Couldn't save — check the Firebase setup note in src/firebase/config.js");
    }
    setSaving(null);
  }

  return (
    <div className="admin-site-images">
      <p className="admin-tab-note">
        Manage fixed images used around the site (not tied to a specific
        product) — like the About page photo. More spots can be added here
        as the site grows.
      </p>
      {SITE_IMAGE_SPOTS.map((spot) => (
        <div key={spot.key} className="admin-site-image-row">
          <p className="admin-site-image-label">{spot.label}</p>
          <div className="admin-site-image-uploader">
            <ImageUpload value={getSiteImage(spot.key, "")} onChange={(b64) => handleUpload(spot.key, b64)} label="Choose image" />
          </div>
          {saving === spot.key && <span className="admin-saving-tag">Saving...</span>}
        </div>
      ))}
    </div>
  );
}
