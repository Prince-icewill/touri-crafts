import { createContext, useContext, useState, useEffect } from "react";
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { db, auth } from "../firebase/config";
import { SEED_PRODUCTS, SEED_SERVICES } from "../data/products";

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [products, setProducts] = useState(SEED_PRODUCTS);
  const [services, setServices] = useState(SEED_SERVICES);
  const [siteImages, setSiteImages] = useState({});

  // ── Real Firebase Authentication ─────────────────────────
  // Replaces the old hardcoded password — now checks against
  // the actual admin account created in Firebase Console >
  // Authentication > Users. This is what lets the security
  // rules trust "this person is allowed to write."
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  async function login(email, password) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (err) {
      console.warn("Login failed:", err.code);
      return false;
    }
  }

  async function logout() {
    await signOut(auth);
  }

  // ── Live sync: products ──────────────────────────────────
  useEffect(() => {
    const productsRef = collection(db, "products");

    async function seedIfEmpty() {
      const snap = await getDocs(productsRef);
      if (snap.empty) {
        for (const p of SEED_PRODUCTS) {
          await setDoc(doc(db, "products", p.id), p);
        }
      }
    }
    seedIfEmpty().catch((e) =>
      console.warn("Firebase not configured yet — using local seed data.", e)
    );

    const unsub = onSnapshot(
      productsRef,
      (snap) => {
        if (!snap.empty) setProducts(snap.docs.map((d) => d.data()));
      },
      (err) => console.warn("Firebase not connected — using seed data.", err)
    );
    return () => unsub();
  }, []);

  // ── Live sync: services ──────────────────────────────────
  useEffect(() => {
    const servicesRef = collection(db, "services");

    async function seedIfEmpty() {
      const snap = await getDocs(servicesRef);
      if (snap.empty) {
        for (const s of SEED_SERVICES) {
          await setDoc(doc(db, "services", s.id), s);
        }
      }
    }
    seedIfEmpty().catch(() => {});

    const unsub = onSnapshot(servicesRef, (snap) => {
      if (!snap.empty) setServices(snap.docs.map((d) => d.data()));
    }, () => {});
    return () => unsub();
  }, []);

  // ── Live sync: site images ───────────────────────────────
  useEffect(() => {
    const ref = doc(db, "siteContent", "images");
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) setSiteImages(snap.data());
    }, () => {});
    return () => unsub();
  }, []);

  // ── Product actions ───────────────────────────────────────
  async function addProduct(product) {
    await setDoc(doc(db, "products", product.id), product);
  }

  async function updateProduct(id, updates) {
    const existing = products.find((p) => p.id === id);
    await setDoc(doc(db, "products", id), { ...existing, ...updates });
  }

  async function toggleSoldOut(id) {
    const existing = products.find((p) => p.id === id);
    if (!existing) return;
    await setDoc(doc(db, "products", id), { ...existing, soldOut: !existing.soldOut });
  }

  async function deleteProduct(id) {
    await deleteDoc(doc(db, "products", id));
  }

  // ── Service actions ───────────────────────────────────────
  async function updateService(id, updates) {
    const existing = services.find((s) => s.id === id);
    await setDoc(doc(db, "services", id), { ...existing, ...updates });
  }

  // ── Site image actions ────────────────────────────────────
  async function setSiteImage(key, base64) {
    const ref = doc(db, "siteContent", "images");
    await setDoc(ref, { ...siteImages, [key]: base64 }, { merge: true });
  }

  function getSiteImage(key, fallback) {
    return siteImages[key] || fallback;
  }

  return (
    <AdminContext.Provider
      value={{
        isAuthed: !!user,
        authLoading,
        adminEmail: user?.email || null,
        login,
        logout,
        products,
        addProduct,
        updateProduct,
        toggleSoldOut,
        deleteProduct,
        services,
        updateService,
        siteImages,
        setSiteImage,
        getSiteImage,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
