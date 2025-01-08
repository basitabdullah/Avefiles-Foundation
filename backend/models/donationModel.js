import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  donorDetails: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    }
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentInfo: {
    orderId: String,
    paymentId: String,
    paymentMethod: {
      type: String,
      default: 'razorpay'
    }
  },
  status: {
    type: String,
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model("Donation", donationSchema); 