import { useEffect, useState } from 'react';
import axios from '../../lib/axios';
import './MyOrders.scss';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import MetaData from '../../components/MetaData';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../stores/useUserStore';
import Loader from '../../components/Loaders/maxLoader/Loader';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useUserStore();

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        console.log('Fetching orders...');
        const { data } = await axios.get('/orders/my');
        console.log('Orders received:', data);
        setOrders(data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error(error.response?.data?.message || 'Error fetching orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  if (loading) {
    return <div className="loading"><Loader /></div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="my-orders"
    >
      <MetaData title="My Orders | Avefiles" />
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <div className="no-orders">
          <p>No orders found</p>
        </div>
      ) : (
        <div className="orders-container">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <h3>Order #{order._id}</h3>
                <span className={`status ${order.orderStatus.toLowerCase()}`}>
                  {order.orderStatus}
                </span>
              </div>

              <div className="order-details">
                <p>
                  <strong>Date:</strong>{' '}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <strong>Total Amount:</strong> ₹{order.totalAmount}
                </p>
                <p>
                  <strong>Payment Method:</strong>{' '}
                  {order.paymentInfo.paymentMethod}
                </p>
              </div>

              <div className="order-items">
                {order.products.map((item) => (
                  <div key={item._id} className="order-item">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      onError={(e) => {
                        e.target.src = '/placeholder.png'; // Add a placeholder image
                      }}
                    />
                    <div className="item-details">
                      <h4>{item.product.name}</h4>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="shipping-details">
                <h4>Shipping Details</h4>
                <p>{order.shippingDetails.fullName}</p>
                <p>{order.shippingDetails.address}</p>
                <p>
                  {order.shippingDetails.city}, {order.shippingDetails.state}
                </p>
                <p>PIN: {order.shippingDetails.pinCode}</p>
                <p>Phone: {order.shippingDetails.phone}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default MyOrders;
