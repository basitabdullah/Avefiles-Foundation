import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../../lib/axios';
import './OrderDetails.scss';
import { toast } from 'react-hot-toast';
import Loader from '../../../components/Loaders/maxLoader/Loader';
import { FaBox, FaUser, FaTruck, FaMoneyBill } from 'react-icons/fa';

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { orderId } = useParams();

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const { data } = await axios.get(`/orders/admin/${orderId}`);
      setOrder(data.order);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error fetching order details');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      await axios.put(`/orders/admin/${orderId}`, { status: newStatus });
      toast.success('Order status updated successfully');
      fetchOrderDetails();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating order status');
    }
  };

  if (loading) return <Loader />;
  if (!order) return <div className="error-message">Order not found</div>;

  return (
    <div className="order-details-page">
      <div className="order-header">
        <h1>Order Details</h1>
        <div className="order-id">Order #{order._id}</div>
      </div>

      <div className="details-grid">
        <div className="card customer-info">
          <div className="card-header">
            <FaUser className="icon" />
            <h2>Customer Information</h2>
          </div>
          <div className="card-content">
            <p><strong>Name:</strong> {order.user.name}</p>
            <p><strong>Email:</strong> {order.user.email}</p>
            <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          </div>
        </div>

        <div className="card shipping-info">
          <div className="card-header">
            <FaTruck className="icon" />
            <h2>Shipping Details</h2>
          </div>
          <div className="card-content">
            <p>{order.shippingDetails.fullName}</p>
            <p>{order.shippingDetails.address}</p>
            <p>{order.shippingDetails.city}, {order.shippingDetails.state}</p>
            <p>PIN: {order.shippingDetails.pinCode}</p>
            <p>Phone: {order.shippingDetails.phone}</p>
          </div>
        </div>

        <div className="card payment-info">
          <div className="card-header">
            <FaMoneyBill className="icon" />
            <h2>Payment Information</h2>
          </div>
          <div className="card-content">
            <p><strong>Payment ID:</strong> {order.paymentInfo.paymentId}</p>
            <p><strong>Method:</strong> {order.paymentInfo.paymentMethod}</p>
            <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
          </div>
        </div>

        <div className="card order-status">
          <div className="card-header">
            <FaBox className="icon" />
            <h2>Order Status</h2>
          </div>
          <div className="card-content">
            <select
              value={order.orderStatus}
              onChange={(e) => handleStatusUpdate(e.target.value)}
              className={`status-select ${order.orderStatus.toLowerCase()}`}
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
        </div>
      </div>

      <div className="order-items">
        <h2>Order Items</h2>
        <div className="items-grid">
          {order.products.map((item) => (
            <div key={item._id} className="item-card">
              <img src={item.product.image} alt={item.product.name} />
              <div className="item-details">
                <h3>{item.product.name}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ₹{item.price}</p>
                <p>Total: ₹{item.price * item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails; 