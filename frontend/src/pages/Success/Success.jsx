import "./Success.scss";
import { FaRegCheckCircle } from "react-icons/fa";
import React from "react";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";

const Success = () => {
  return (
    <div className="success-page">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        gravity={0.1}
        style={{ zIndex: 99 }}
        numberOfPieces={700}
        recycle={false}
        colors={['#28a745', '#ffc107', '#17a2b8', '#dc3545', '#007bff']} // Festive colors
      />
      <div className="success">
        <FaRegCheckCircle className="check-icon" />
        <h2>Payment Successful!</h2>
        <p className="success-message">
          Thank you for your purchase! Your order has been confirmed.
        </p>
        <div className="actions">
          <Link to="/myorders" className="view-orders-btn">
            View Your Orders
          </Link>
          <Link to="/shop" className="shop-again-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
