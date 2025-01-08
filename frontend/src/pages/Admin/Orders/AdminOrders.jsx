import { useEffect, useState } from 'react';
import axios from '../../../lib/axios';
import './AdminOrders.scss';
import { toast } from 'react-hot-toast';
import { FaEdit } from 'react-icons/fa';
import { useUserStore } from '../../../stores/useUserStore';
import Loader from '../../../components/Loaders/maxLoader/Loader';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const { user } = useUserStore();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/orders/admin/all');
      setOrders(data.orders);
      setTotalAmount(data.totalAmount);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error fetching orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await axios.put(`/orders/admin/${orderId}`, { status: newStatus });
      toast.success('Order status updated successfully');
      fetchOrders(); // Refresh orders
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating order status');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="admin-orders">
      <div className="orders-header">
        <h1>Orders Management</h1>
        <div className="orders-summary">
          <div className="summary-card">
            <h3>Total Orders</h3>
            <p>{orders.length}</p>
          </div>
          <div className="summary-card">
            <h3>Total Amount</h3>
            <p>₹{totalAmount.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="orders-table">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>
                  <div className="customer-info">
                    <p>{order.user.name}</p>
                    <small>{order.user.email}</small>
                  </div>
                </td>
                <td>₹{order.totalAmount}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  <select
                    value={order.orderStatus}
                    onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                    className={`status-select ${order.orderStatus.toLowerCase()}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>
                <td>
                  <button 
                    className="view-details-btn"
                    onClick={() => window.location.href = `/admin/orders/${order._id}`}
                  >
                    <FaEdit /> Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders; 