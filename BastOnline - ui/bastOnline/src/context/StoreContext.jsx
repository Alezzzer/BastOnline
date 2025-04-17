import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : {};
  });

  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  
  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);

    localStorage.setItem("token", jwtToken);
    localStorage.setItem("user", JSON.stringify(userData));
  };

 
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

    const savedToken = localStorage.getItem("token") || localStorage.getItem("admin-token");
    const savedUser = localStorage.getItem("user");

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

 
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const initializeCart = (productList) => {
    const initial = {};
    productList.forEach(p => {
      initial[p.id] = cartItems[p.id] || 0;
    });
    setCartItems(initial);
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
export const useStore = () => useContext(StoreContext);
