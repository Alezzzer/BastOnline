import { createContext, useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode"; // ispravno bez { } — jer nije export default

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // 🔐 Login
  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);

    localStorage.setItem("token", jwtToken);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // 🚪 Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("token");
    console.log("🔍 TOKEN from URL:", tokenFromUrl);
  
    if (tokenFromUrl) {
      localStorage.setItem("token", tokenFromUrl);
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  
    // ⬇️ OVO JE NOVO: fallback na "admin-token"
    const savedToken = localStorage.getItem("token") || localStorage.getItem("admin-token");
    const savedUser = localStorage.getItem("user");
    console.log("📦 LocalStorage token:", savedToken);
  
    if (savedToken) {
      try {
        const decoded = jwtDecode(savedToken);
        const now = Date.now() / 1000;
  
        if (decoded.exp > now) {
          setToken(savedToken);
          setUser(savedUser ? JSON.parse(savedUser) : decoded);
        } else {
          logout();
        }
      } catch (err) {
        console.error("Invalid token:", err);
        logout();
      }
    }
  }, []);

  // 🛒 Products
  useEffect(() => {
    axios.get("http://localhost:8080/api/admin/getProducts")
      .then((res) => {
        const productsWithImages = res.data.map(product => ({
          ...product,
          image: product.imagePath || '/default-image.jpg'
        }));
        setProducts(productsWithImages);
        initializeCart(productsWithImages);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  const initializeCart = (productList) => {
    const cart = {};
    productList.forEach(p => {
      cart[p.id] = 0;
    });
    setCartItems(cart);
  };

  const addToCart = (itemId) => {
    setCartItems(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0)
    }));
  };

  const clearCart = () => {
    const cleared = {};
    Object.keys(cartItems).forEach(key => {
      cleared[key] = 0;
    });
    setCartItems(cleared);
  };

  const getTotalCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const quantity = cartItems[itemId];
      if (quantity > 0) {
        const product = products.find(p => p.id === parseInt(itemId));
        if (product) {
          total += product.price * quantity;
        }
      }
    }
    return total;
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalCartAmount,
    products,
    user,
    token,
    login,
    logout,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
import { useContext } from "react";


export const useStore = () => useContext(StoreContext);