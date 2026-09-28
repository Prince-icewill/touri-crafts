import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// ─────────────────────────────────────────────────────────────
// IMPORTANT — SETUP REQUIRED BEFORE THIS WORKS
// ─────────────────────────────────────────────────────────────
// This connects the site to a shared, live database (Firestore)
// AND real admin authentication (Firebase Auth) — so admin
// changes reflect to every visitor, and only the real admin can
// make changes.
//
// SETUP STEPS:
// 1. Go to https://console.firebase.google.com
// 2. Create a free project (takes ~2 minutes, no card required)
// 3. Build > Firestore Database > Create Database (any region
//    close to Nigeria, e.g. eur3 or a nearby one is fine)
// 4. Build > Authentication > Get Started > enable
//    "Email/Password" as a sign-in method
// 5. Still in Authentication > Users tab > Add User — create the
//    ONE login the admin (you or the client) will use, e.g.
//    admin@touricrafts.com + a strong password. This is the
//    only account that will be able to make changes.
// 6. Project Settings (gear icon) > General > scroll to
//    "Your apps" > click the Web icon (</>) to register a web
//    app > copy the firebaseConfig object it gives you and
//    paste the values below, replacing the placeholders
// 7. In Firestore > Rules tab, paste the rules from
//    FIRESTORE_RULES.txt in the project root, then Publish —
//    this locks writes to only the logged-in admin, while
//    still letting every visitor read the shop normally
// ─────────────────────────────────────────────────────────────

const firebaseConfig = {
  apiKey: "AIzaSyDu1kSac9x5BuEVy2TMccLYXFqyVkgqLLk",
  authDomain: "touricrafts.firebaseapp.com",
  projectId: "touricrafts",
  storageBucket: "touricrafts.firebasestorage.app",
  messagingSenderId: "135391280662",
  appId: "1:135391280662:web:ae06a552d9509c356c7f37",
  measurementId: "G-SB1CPZZJEW"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
