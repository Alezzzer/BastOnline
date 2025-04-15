import React, { useEffect, useState } from 'react';
import './Order.css';
import { toast } from 'react-toastify';

import { assets } from '../../assets/assets';
import axiosInstance from '../../axiosInstance';

const Order = () => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axiosInstance.get('/api/manager/getOrders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error while fetching orders:', error);
      toast.error('Failed to load orders');
    }
  };

  const approveOrder = async (orderId) => {
    try {
      await axiosInstance.put(`/api/manager/${orderId}/approve`);
      toast.success('Order approved!');
      fetchAllOrders();
    } catch (error) {
      toast.error('Error approving order');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="parcel icon" />
            <div className="order-columns">
              <div className="order-col">
                <h4>Products</h4>
                <p className='order-item-product'>
                  {order.items?.map((item, index) => (
                    <span key={index}>
                      {item.product?.name} x {item.quantity} {item.product?.category === 'Eggs' ? 'pcs' : 'kg'}
                      {index < order.items.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </p>
              </div>
              <div className="order-col">
                <h4>User Info</h4>
                <p><strong>Name:</strong> {order.userName}</p>
                <p><strong>Address:</strong> {order.userAddress}</p>
                <p><strong>City:</strong> {order.userCity}</p>
                <p><strong>Phone:</strong> {order.userPhone}</p>
              </div>
              <div className="order-col">
                <h4>Details</h4>
                <p><strong>Total:</strong> ${order.finalPrice}</p>
                <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
              </div>
              <div className="order-col">
                <h4>Status</h4>
                <p>
                  {order.approved
                    ? 'Package has been sent ✅'
                    : 'Package has not been sent yet ❌'}
                </p>
                {!order.approved && (
                  <button onClick={() => approveOrder(order.id)}>Approve</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
