import "./MyOrders.scss";
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useState } from "react";
const orders = [
  {
    id: 1,
    date: "2024-02-20",
    status: "Delivered",
    total: 299.98,
    items: [
      {
        id: 1,
        name: "Wireless Headphones",
        price: 99.99,
        quantity: 1,
        image: "https://picsum.photos/200/200?random=1",
      },
      {
        id: 2,
        name: "Smart Watch",
        price: 199.99,
        quantity: 1,
        image: "https://picsum.photos/200/200?random=2",
      },
    ],
    shippingAddress: {
      name: "John Doe",
      address: "123 Main St",
      city: "New York",
      zipCode: "10001",
      country: "USA",
    },
  },
  {
    id: 2,
    date: "2024-02-15",
    status: "In Transit",
    total: 79.99,
    items: [
      {
        id: 3,
        name: "Bluetooth Speaker",
        price: 79.99,
        quantity: 1,
        image: "https://picsum.photos/200/200?random=3",
      },
    ],
    shippingAddress: {
      name: "John Doe",
      address: "123 Main St",
      city: "New York",
      zipCode: "10001",
      country: "USA",
    },
  },
];

function MyOrders() {
  return (
    <div className="orders-page">
      <h1>My Orders</h1>
      <div className="orders-container">
        <div className="orders-main">
          <OrderList orders={orders} />
        </div>
        <div className="orders-sidebar">
          <OrderStats orders={orders} />
        </div>
      </div>
    </div>
  );
}


function OrderList({ orders }) {
    return (
      <div className="order-list">
        {orders.map(order => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
    );
  }
  function OrderItem({ order }) {
    const [isExpanded, setIsExpanded] = useState(false);
  
    return (
      <div className="order-item">
        <div className="order-header" onClick={() => setIsExpanded(!isExpanded)}>
          <div className="order-info">
            <span className="order-date">{new Date(order.date).toLocaleDateString()}</span>
            <span className={`order-status ${order.status.toLowerCase()}`}>
              {order.status}
            </span>
          </div>
          <div className="order-summary">
            <span className="order-total">${order.total.toFixed(2)}</span>
            {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
          </div>
        </div>
  
        {isExpanded && (
          <div className="order-details">
            <div className="order-items">
              {order.items.map(item => (
                <div key={item.id} className="order-product">
                  <img src={item.image} alt={item.name} />
                  <div className="product-info">
                    <h4>{item.name}</h4>
                    <p>Quantity: {item.quantity}</p>
                    <p>${item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="shipping-details">
              <h4>Shipping Address</h4>
              <p>{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.address}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.zipCode}</p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
  function OrderStats({ orders }) {
    const totalOrders = orders.length;
    const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
    const deliveredOrders = orders.filter(order => order.status === 'Delivered').length;
  
    return (
      <div className="order-stats">
        <h3>Order Statistics</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">Total Orders</span>
            <span className="stat-value">{totalOrders}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total Spent</span>
            <span className="stat-value">${totalSpent.toFixed(2)}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Delivered Orders</span>
            <span className="stat-value">{deliveredOrders}</span>
          </div>
        </div>
      </div>
    );
  }
export default MyOrders;
