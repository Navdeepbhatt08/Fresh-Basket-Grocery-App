import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react"; 
import App from "./App";
import "./index.css";
import { AuthProvider } from "./state/auth";
import { CartProvider } from "./state/cart";
import "leaflet/dist/leaflet.css"

// 1. Ensure the key is loaded correctly
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  // If this hits, you'll see a big white error in the console.
  throw new Error("Missing Clerk Publishable Key. Please check your .env.local file.");
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found. Check your index.html.");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>

    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/login">
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
           
            <App />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);