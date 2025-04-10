import { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import "./Cart.css";

const Cart = () => {
  const {
    cartItems,
    products,
    addToCart,
    removeFromCart,
    getTotalCartAmount
  } = useContext(StoreContext);

  const totalAmount = getTotalCartAmount();

  return (
    <div className="cart">
      <div className="cart-items-title">
        <p>Image</p>
        <p>Product</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>SubTotal</p>
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
              ${product.price * quantity}
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

      {totalAmount > 0 && (
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
            <Link to="/checkout">
              <button>Proceed to Checkout</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
