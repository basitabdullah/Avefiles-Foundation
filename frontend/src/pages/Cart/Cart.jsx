import { useEffect, useState } from "react";
import "./Cart.scss";
import { IoCloseSharp } from "react-icons/io5";
import { BiSolidError } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import MetaData from "../../components/MetaData.jsx";
import { motion } from "framer-motion";
import { MdAttachMoney } from "react-icons/md";
import { useCartStore } from "../../stores/useCartStore.js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../../lib/axios.js";
import { useProductStore } from "../../stores/useProductStore.js";

const stripePromise = loadStripe(
  "pk_test_51Q1WxcGOd09WDjBnE2HoXFh6QFlCciriJzX0GNGowTeX21TBg5eD0m8jCzwdGhVIZpR1GqXv7BqcnPaZt2ziWTol00sM23RRBO"
);

const Cart = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    total,
    subtotal,
    coupon,
    isCouponApplied,
    getMyCoupon,
    validateCoupon,
    removeCoupon,
    getCartItems,
    clearCart,
  } = useCartStore();
  const { products, getRecomemdedProducts } = useProductStore();
  const { addToCart } = useCartStore();
  const [couponCode, setCouponCode] = useState("");
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [shippingDetails, setShippingDetails] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    phone: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    getRecomemdedProducts();
  }, [getRecomemdedProducts]);

  useEffect(() => {
    getMyCoupon();
  }, [getMyCoupon]);

  useEffect(() => {
    if (coupon) setCouponCode(coupon.code);
  }, [coupon]);

  useEffect(() => {
    getCartItems();
  }, [getCartItems]);

  const handleStripePayment = async () => {
    try {
      const stripe = await stripePromise;
      const res = await axios.post("/payment/create/checkout/session", {
        products: cart,
        couponCode: coupon ? coupon.code : null,
      });
      const session = res.data;
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        console.log(result.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    handleRazorpayPayment();
  };

  const handleRazorpayPayment = async () => {
    try {
      const { data: { key } } = await axios.get("/payment/getkey");
      
      console.log("Shipping details:", shippingDetails);
      
      const { data } = await axios.post("/payment/checkout", {
        amount: total,
        shippingDetails
      });

      console.log("Order created:", data);

      const options = {
        key,
        amount: data.order.amount,
        currency: "INR",
        name: "Avefiles Foundation",
        description: "Payment for your order",
        image: "/avefiles.png",
        order_id: data.order.id,
        notes: {
          shipping_details: JSON.stringify(shippingDetails),
          user_id: localStorage.getItem('userId')
        },
        handler: async function (response) {
          try {
            const verificationData = {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              shippingDetails,
              amount: total
            };
            
            console.log("Sending verification data:", verificationData);
            
            const { data } = await axios.post("/payment/paymentverification", verificationData);
            
            if (data.success) {
              await clearCart();
              toast.success("Payment successful!");
              navigate('/purchase-success');
            }
          } catch (error) {
            console.error("Payment verification failed:", error);
            toast.error(error.response?.data?.message || "Payment verification failed");
            navigate('/purchase-failed');
          }
        },
        prefill: {
          name: shippingDetails.fullName,
          contact: shippingDetails.phone,
        },
        theme: {
          color: "#121212"
        }
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Payment initialization failed:", error);
      toast.error("Payment initialization failed");
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    validateCoupon(couponCode);
  };

  const handleRemoveCoupon = async () => {
    await removeCoupon();
    setCouponCode("");
  };

  const savings = subtotal - total;
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="cart"
    >
      <MetaData title={"Avefiles | Cart"} />
      {cart.length === 0 ? (
        <div className="empty-cart-container">
          <div className="empty-cart">
            <BiSolidError />
            <h3>Your cart is empty</h3>
            <Link to="/">Continue shopping</Link>
          </div>
        </div>
      ) : (
        <>
          <div className="left">
            {cart.map((item) => (
              <div className="item" key={item._id}>
                <img src={item.image} alt="err" />
                <div className="details">
                  <h4>{item.name}</h4>
                  <div className="counter">
                    <span
                      onClick={() => {
                        updateQuantity(item._id, item.quantity - 1);
                      }}
                    >
                      -
                    </span>
                    <p className="count">{item.quantity}</p>
                    <span
                      onClick={() => {
                        updateQuantity(item._id, item.quantity + 1);
                      }}
                    >
                      +
                    </span>
                  </div>
                </div>
                <div className="price-sec">
                  <div
                    className="delete"
                    onClick={() => removeFromCart(item._id)}
                  >
                    <IoCloseSharp />
                  </div>
                  <div className="price">₹{item.price}</div>
                </div>
              </div>
            ))}
            <div className="recommended-products">
              <h2>Recommended-Products</h2>
              <div className="products">
                {products.map((product) => (
                  <div
                    className="product-recommended-wrapper"
                    key={product._id}
                  >
                    <img src={product.image} alt="err" />
                    <div className="details">
                      <h2>{product.name}</h2>
                      <p>${product.price}</p>
                      <button onClick={() => addToCart(product)}>
                        Add to cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="right">
            <p className="subtotal">Subtotal : ${subtotal}</p>
            {savings > 0 && (
              <p className="saving">Saving : ${savings.toFixed(2)}</p>
            )}
            {coupon && (
              <p className="discount">
                Discount : <span>-{coupon.discountPercentage}%</span>
              </p>
            )}
            <b className="total">
              Total : <span>${total}</span>
            </b>

            <input
              type="text"
              placeholder="Coupon Code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />

            <div className="coupon-buttons">
              <button onClick={handleApplyCoupon}>Apply Coupon</button>
              <button onClick={handleRemoveCoupon}>Remove Coupon</button>
            </div>
            {couponCode &&
              (isCouponApplied ? (
                <span className="green">
                  {" "}
                  ${savings} off using the <code>{coupon.code}</code>
                </span>
              ) : (
                <span className="red err">
                  <BiSolidError />
                  No Coupon Applied
                </span>
              ))}
            {!showShippingForm ? (
              <button 
                className="checkout-btn" 
                onClick={() => setShowShippingForm(true)}
              >
                <MdAttachMoney />
                Proceed to Checkout
              </button>
            ) : (
              <form onSubmit={handleShippingSubmit} className="shipping-form">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={shippingDetails.fullName}
                  onChange={(e) => setShippingDetails(prev => ({
                    ...prev,
                    fullName: e.target.value
                  }))}
                />
                <input
                  type="text"
                  placeholder="Address"
                  required
                  value={shippingDetails.address}
                  onChange={(e) => setShippingDetails(prev => ({
                    ...prev,
                    address: e.target.value
                  }))}
                />
                <input
                  type="text"
                  placeholder="City"
                  required
                  value={shippingDetails.city}
                  onChange={(e) => setShippingDetails(prev => ({
                    ...prev,
                    city: e.target.value
                  }))}
                />
                <input
                  type="text"
                  placeholder="State"
                  required
                  value={shippingDetails.state}
                  onChange={(e) => setShippingDetails(prev => ({
                    ...prev,
                    state: e.target.value
                  }))}
                />
                <input
                  type="text"
                  placeholder="PIN Code"
                  required
                  value={shippingDetails.pinCode}
                  onChange={(e) => setShippingDetails(prev => ({
                    ...prev,
                    pinCode: e.target.value
                  }))}
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  value={shippingDetails.phone}
                  onChange={(e) => setShippingDetails(prev => ({
                    ...prev,
                    phone: e.target.value
                  }))}
                />
                <button type="submit" className="checkout-btn">
                  <MdAttachMoney />
                  Pay Now
                </button>
              </form>
            )}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Cart;