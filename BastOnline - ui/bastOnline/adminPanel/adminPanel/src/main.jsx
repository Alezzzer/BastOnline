import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import StoreContextProvider from '../../../src/context/StoreContext.jsx';

// 🛠 Ručno dohvatamo token iz URL-a PRE StoreContext-a
const urlParams = new URLSearchParams(window.location.search);
const tokenFromUrl = urlParams.get("token");

if (tokenFromUrl) {
  console.log("🟢 Token iz URL-a:", tokenFromUrl);
  localStorage.setItem("token", tokenFromUrl);
  // Clean URL bez tokena
  const cleanUrl = window.location.origin + window.location.pathname;
  window.history.replaceState({}, document.title, cleanUrl);
} else {
  console.log("🔴 Nema tokena u URL-u!");
}

createRoot(document.getElementById('root')).render(
  <StoreContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreContextProvider>
);
