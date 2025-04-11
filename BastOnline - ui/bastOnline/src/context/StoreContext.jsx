import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);

  // Fetch products from backend
  useEffect(() => {
    axios.get("http://localhost:8080/api/admin/getProducts")
      .then((response) => {
        const productsWithImages = response.data.map(product => ({
          ...product,
          image: product.imagePath || '/default-image.jpg'
        }));
        setProducts(productsWithImages);
        initializeCart(productsWithImages);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  // Initialize cart items with all product ids set to 0
  const initializeCart = (productList) => {
    const cart = {};
    productList.forEach(product => {
      cart[product.id] = 0;
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
    products
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