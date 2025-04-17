import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import LoginPopup from "../../components/LoginPopup/LoginPopup";
import "./Cart.css";

const Cart = () => {
  const {
    cartItems,
    products,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    user,
  } = useContext(StoreContext);

  const navigate = useNavigate();
  const totalAmount = getTotalCartAmount();

  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const handleProceedToCheckout = () => {
   
    if (user === undefined) {
      console.log("⏳ Waiting for user status...");
      return;
    }
  
    if (!user) {
      setShowLoginPopup(true);
      return;
    }
  
    if (totalAmount > 0) {
      navigate("/checkout");
    } else {
      alert("Your cart is empty!");
    }
  };

  const handleLoginSuccess = () => {
    setShowLoginPopup(false);
    setTimeout(() => {
      navigate("/checkout");
    }, 300);
  };

  return (
    <div className="cart">
      <div className="cart-items-title">
        <p>Image</p>
        <p>Product</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Subtotal</p>
        <p>Update</p>
      </div>

      {products.map((product) => {
        const quantity = cartItems[product.id];
        if (!quantity) return null;

        return (
          <div key={product.id} className="cart-items-row">
            <div className="cart-col image-col">
              <img src={product.image || "/default-image.jpg"} alt={product.name} />
            </div>
            <div className="cart-col name-col">{product.name}</div>
            <div className="cart-col price-col">${product.price}</div>
            <div className="cart-col quantity-col">
              {quantity} {product.category === "Eggs" ? "pcs" : "kg"}
            </div>
            <div className="cart-col subtotal-col">
              ${(product.price * quantity).toFixed(2)}
            </div>
            <div className="cart-col update-col">
              <div className="cart-item-counter">
                <img
                  src={assets.removeiconred}
                  alt="Remove"
                  onClick={() => removeFromCart(product.id)}
                />
                <p>{quantity}</p>
                <img
                  src={assets.addiconwhite}
                  alt="Add"
                  onClick={() => addToCart(product.id)}
                />
              </div>
            </div>
          </div>
        );
      })}

      {totalAmount > 0 ? (
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div className="cart-total-details">
              <p>Delivery</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${totalAmount.toFixed(2)}</b>
            </div>
            <button onClick={handleProceedToCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="empty-cart-message">
          <h3>Your cart is empty!</h3>
        </div>
      )}

      {showLoginPopup && (
        <LoginPopup
          setShowLogin={setShowLoginPopup}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
};

export default Cart;
