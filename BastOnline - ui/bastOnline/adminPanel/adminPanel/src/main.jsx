
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import StoreContextProvider from '../../../src/context/StoreContext.jsx';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLoginPopup from './components/AdminLoginPopup/AdminLoginPopup.jsx';

const RootApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <StoreContextProvider>
      <BrowserRouter>
        <ToastContainer />
        {isAuthenticated ? <App /> : <AdminLoginPopup onSuccess={handleLoginSuccess} />}
      </BrowserRouter>
    </StoreContextProvider>
  );
};

createRoot(document.getElementById('root')).render(<RootApp />);
