import React, { useState, useEffect } from "react";
import "./CartTry.scss";
import axios from "../../lib/axios.js";
import { useProductStore } from "../../stores/useProductStore.js";
import { useCartStore } from "../../stores/useCartStore.js";
import MetaData from "../../components/MetaData.jsx";

function App() {
  const { cart, removeFromCart, updateQuantity, total, subtotal, coupon } =
    useCartStore();

  const { products, getRecomemdedProducts } = useProductStore();
  const { addToCart } = useCartStore();


  
  useEffect(() => {
    getRecomemdedProducts();
  }, [getRecomemdedProducts]);

  const handleRazorpayPayment = async () => {
    try {
      const {
        data: { key },
      } = await axios.get("/payment/getkey");

      const {
        data: { order },
      } = await axios.post("/payment/checkout", {
        amount: total,
      });
      console.log(order);

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "New One",
        description: "Test Transaction",
        image:
          "https://res.cloudinary.com/dfntxbbxh/image/upload/v1732510773/products/bys84mh75xibrxctbmdg.jpg",
        order_id: order.id,
        callback_url: "http://localhost:5000/api/payment/paymentverification",
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#121212",
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.log(error);
    }
  };

  const savings = subtotal - total;

  return (
    <div className="app">
      <MetaData title={"Avefiles | Cart"} />

      <div className="container">
        <div className="cart-section">
          <h1>Shopping Cart</h1>
          <div className="cart-container">
            {cart.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                onIncrement={updateQuantity(item._id, item.quantity + 1)}
                onDecrement={updateQuantity(item._id, item.quantity - 1)}
              />
            ))}
          </div>
          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>GST (18%):</span>
              {/* <span>₹{gst.toFixed(2)}</span> */}
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="shipping-section">
          <ShippingForm />
        </div>
      </div>

      <FeaturedProducts products={products} />
    </div>
  );
}

const CartItem = ({ item, onIncrement, onDecrement }) => {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item__image" />
      <div className="cart-item__details">
        <h3 className="cart-item__name">{item.name}</h3>
        <p className="cart-item__price">${item.price}</p>
      </div>
      <div className="cart-item__quantity">
        <button onClick={() => onDecrement(item.id)} className="quantity-btn">
          -
        </button>
        <span>{item.quantity}</span>
        <button onClick={() => onIncrement(item.id)} className="quantity-btn">
          +
        </button>
      </div>
      <div className="cart-item__total">
        ₹{(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
};

const FeaturedProducts = ({ products }) => {
  return (
    <div className="featured-products-cart">
      <h2>Featured Products</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="price">₹{product.price}</p>
            <button className="add-to-cart">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const ShippingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
  });

  const [focused, setFocused] = useState({
    name: false,
    email: false,
    address: false,
    city: false,
    zipCode: false,
    country: false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFocus = (field) => {
    setFocused((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const handleBlur = (field) => {
    setFocused((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  return (
    <div className="shipping-form">
      <h2>Shipping Details</h2>
      <form>
        <div
          className={`form-group ${
            focused.name || formData.name ? "focused" : ""
          }`}
        >
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onFocus={() => handleFocus("name")}
            onBlur={() => handleBlur("name")}
          />
        </div>

        <div
          className={`form-group ${
            focused.email || formData.email ? "focused" : ""
          }`}
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={() => handleFocus("email")}
            onBlur={() => handleBlur("email")}
          />
        </div>

        <div
          className={`form-group ${
            focused.address || formData.address ? "focused" : ""
          }`}
        >
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            onFocus={() => handleFocus("address")}
            onBlur={() => handleBlur("address")}
          />
        </div>

        <div className="form-row">
          <div
            className={`form-group ${
              focused.city || formData.city ? "focused" : ""
            }`}
          >
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              onFocus={() => handleFocus("city")}
              onBlur={() => handleBlur("city")}
            />
          </div>

          <div
            className={`form-group ${
              focused.zipCode || formData.zipCode ? "focused" : ""
            }`}
          >
            <label htmlFor="zipCode">ZIP Code</label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              onFocus={() => handleFocus("zipCode")}
              onBlur={() => handleBlur("zipCode")}
            />
          </div>
        </div>

        <div
          className={`form-group ${
            focused.country || formData.country ? "focused" : ""
          }`}
        >
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            onFocus={() => handleFocus("country")}
            onBlur={() => handleBlur("country")}
          />
        </div>

        <button type="submit" className="submit-button">
          Continue to Payment
        </button>
      </form>
    </div>
  );
};
export default App;
