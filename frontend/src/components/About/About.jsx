import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./About.scss";
import axios from "../../lib/axios";
import { toast } from "react-hot-toast";
import { useUserStore } from "../../stores/useUserStore";

const About = () => {
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [amount, setAmount] = useState("");
  const { user } = useUserStore();
  const [donorDetails, setDonorDetails] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
  });

  const predefinedAmounts = [100, 500, 1000, 5000];
  const quote =
    "Small acts of kindness, when multiplied by millions of people, can transform the world.";

  const handleDonate = async () => {
    try {
      const { data } = await axios.post("/payment/donation-checkout", {
        amount: Number(amount),
        donorDetails,
      });

      if (data.success) {
        const options = {
          key: await loadRazorpayKey(),
          amount: data.order.amount,
          currency: "INR",
          name: "Avefiles Foundation",
          description: "Donation Payment",
          order_id: data.order.id,
          handler: async function (response) {
            try {
              const verificationResponse = await axios.post(
                "/payment/donation-verification",
                {
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                  amount: Number(amount),
                  donorDetails,
                }
              );

              if (verificationResponse.data.success) {
                toast.success("Thank you for your donation!");
                setShowDonateModal(false);
                setAmount("");
              }
            } catch (error) {
              toast.error("Payment verification failed");
            }
          },
          prefill: {
            name: donorDetails.name,
            email: donorDetails.email,
            contact: donorDetails.phone,
          },
          theme: {
            color: "#2c3e50",
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Payment Error:", error);
    }
  };

  const loadRazorpayKey = async () => {
    try {
      const { data } = await axios.get("/payment/getkey");
      return data.key;
    } catch (error) {
      toast.error("Unable to load payment gateway");
      throw error;
    }
  };

  return (
    <section className="about-comp">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="about-content"
      >
        <h2>Avefiles Foundation</h2>
        <p>
          We are dedicated to creating lasting change in communities worldwide.
          Through our programs and initiatives, we empower individuals, support
          education, and provide essential resources to those in need.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="donate-button"
          onClick={() => setShowDonateModal(true)}
        >
          Donate Now
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {showDonateModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDonateModal(false)}
          >
            <motion.div
              className="donate-modal"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content">
                <h3>Make a Difference Today</h3>
                <p className="quote">"{quote}"</p>

                <div className="amount-buttons">
                  {predefinedAmounts.map((amt) => (
                    <button
                      key={amt}
                      className={amount === amt.toString() ? "active" : ""}
                      onClick={() => setAmount(amt.toString())}
                    >
                      ₹{amt}
                    </button>
                  ))}
                </div>

                <div className="custom-amount">
                  <label>Or enter custom amount</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    min="1"
                  />
                </div>

                <div className="donor-form">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={donorDetails.name}
                    onChange={(e) =>
                      setDonorDetails((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={donorDetails.email}
                    onChange={(e) =>
                      setDonorDetails((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={donorDetails.phone}
                    onChange={(e) =>
                      setDonorDetails((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    required
                  />
                </div>

                <div className="modal-buttons">
                  <button
                    className="donate-submit"
                    onClick={handleDonate}
                    disabled={
                      !amount ||
                      Number(amount) <= 0 ||
                      !donorDetails.name ||
                      !donorDetails.email ||
                      !donorDetails.phone
                    }
                  >
                    Donate ₹{amount || "0"}
                  </button>
                  <button
                    className="close-modal"
                    onClick={() => setShowDonateModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default About;
