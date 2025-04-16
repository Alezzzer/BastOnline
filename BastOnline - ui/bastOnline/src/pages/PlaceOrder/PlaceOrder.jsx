import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PlaceOrder = () => {
  const {
    getTotalCartAmount,
    cartItems,
    products,
    clearCart,
    user,
  } = useContext(StoreContext);

  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({});
  const [isEdited, setIsEdited] = useState(false);
  const navigate = useNavigate();

  const userId = user?.id;

  useEffect(() => {
    if (!userId) 
      
      return;
    

    axios.get(`http://localhost:8080/api/farm/myprofile/${userId}`)
      .then(res => {
        setUserData(res.data);
        setFormData(res.data);
      })
      .catch(err => console.error("Error while fetching data:", err));
  }, [userId, navigate]);

  const handleChange = (e) => {
    setIsEdited(true);
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSaveChanges = async () => {
    try {
      const res = await axios.put(`http://localhost:8080/api/farm/myprofile/update/${userId}`, formData);
      setUserData(res.data);
      toast.success("Profile updated!");
      setIsEdited(false);
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Failed to update profile.");
    }
  };

  if (!userData) return <p>Loading...</p>;

  const orderedProducts = products.filter(p => cartItems[p.id] > 0);

  const handleOrder = async (e) => {
    e.preventDefault();

    try {
      const itemsToAdd = Object.entries(cartItems).filter(([id, qty]) => qty > 0);

      if (itemsToAdd.length === 0) {
        toast.warn("Your cart is empty!");
        return;
      }

      for (const [productId, quantity] of itemsToAdd) {
        await axios.post(`http://localhost:8080/api/farm/${userId}/add/${productId}`, null, {
          params: { quantity }
        });
      }

      await axios.post(`http://localhost:8080/api/farm/cart/order/${userId}`);

      toast.success("Order placed successfully!");
      clearCart();

      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (err) {
      console.error("Error while creating order", err);
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <>
      <form className='place-order' onSubmit={handleOrder}>
        <div className="place-order-left">
          <p className='title'>Delivery Information</p>

          <label>Full Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
          />

          <label>Street Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address || ''}
            onChange={handleChange}
          />

          <label>City:</label>
          <input
            type="text"
            name="city"
            value={formData.city || ''}
            onChange={handleChange}
          />

          <label>Phone Number:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone || ''}
            onChange={handleChange}
          />

          {isEdited && (
            <button
              type="button"
              className="save-changes-button"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
          )}
        </div>

        <div className="place-order-right">
          <div className="cart-total">
            <h2><strong>Order Summary</strong></h2>
            <hr />

            {orderedProducts.map((product, index) => (
              <div key={index} className="cart-product-row">
                <p>{product.name} x {cartItems[product.id]}</p>
                <p>${(product.price * cartItems[product.id]).toFixed(2)}</p>
              </div>
            ))}

            <hr />
            <div className="cart-total-details">
              <b>Total:</b>
              <b>${getTotalCartAmount().toFixed(2)}</b>
            </div>

            <button type="submit">ORDER</button>
          </div>
        </div>
      </form>

      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default PlaceOrder;
