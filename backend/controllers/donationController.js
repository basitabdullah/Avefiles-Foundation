import { razorpayInstance } from "../server.js";
import Donation from "../models/donationModel.js";
import crypto from "crypto";

export const donationCheckout = async (req, res) => {
  try {
    const { amount, donorDetails } = req.body;
    
    // Validate required fields
    if (!donorDetails.name || !donorDetails.email || !donorDetails.phone) {
      return res.status(400).json({
        success: false,
        message: "Name, email and phone are required"
      });
    }

    // Create Razorpay order for donation
    const options = {
      amount: Number(amount * 100),
      currency: "INR",
      receipt: `donation_${Date.now()}`,
      notes: {
        donor_details: JSON.stringify(donorDetails),
        user_id: req.user._id,
        type: 'donation'
      }
    };

    const razorpayOrder = await razorpayInstance.orders.create(options);

    // Create donation in database
    const newDonation = await Donation.create({
      user: req.user._id,
      donorDetails,
      amount,
      paymentInfo: {
        orderId: razorpayOrder.id
      }
    });

    res.status(200).json({
      success: true,
      order: razorpayOrder,
      orderId: newDonation._id
    });
  } catch (error) {
    console.log("Donation creation error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating donation",
      error: error.message
    });
  }
};

export const donationVerification = async (req, res) => {
  try {
    const { 
      razorpay_payment_id, 
      razorpay_order_id, 
      razorpay_signature,
      amount,
      donorDetails 
    } = req.body;

    // Verify the payment signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZOR_PAY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed"
      });
    }

    // Update the existing donation
    const updatedDonation = await Donation.findOneAndUpdate(
      { "paymentInfo.orderId": razorpay_order_id },
      {
        $set: {
          "paymentInfo.paymentId": razorpay_payment_id,
          status: "completed",
          amount: amount,
          donorDetails: donorDetails
        }
      },
      { new: true }
    );

    if (!updatedDonation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Donation payment verified successfully",
      donation: updatedDonation
    });

  } catch (error) {
    console.error("Donation verification error:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 }); // Latest donations first

    res.status(200).json({
      success: true,
      donations
    });
  } catch (error) {
    console.error("Error fetching donations:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching donations",
      error: error.message
    });
  }
};

export const getDonationById = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id)
      .populate('user', 'name email');

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found"
      });
    }

    res.status(200).json({
      success: true,
      donation
    });
  } catch (error) {
    console.error("Error fetching donation:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching donation details",
      error: error.message
    });
  }
};

export const getDonationStats = async (req, res) => {
  try {
    const totalDonations = await Donation.countDocuments({ status: 'completed' });
    const totalAmount = await Donation.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const monthlyDonations = await Donation.aggregate([
      { $match: { status: 'completed' } },
      {
        $group: {
          _id: {
            month: { $month: '$createdAt' },
            year: { $year: '$createdAt' }
          },
          count: { $sum: 1 },
          total: { $sum: '$amount' }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } }
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalDonations,
        totalAmount: totalAmount[0]?.total || 0,
        monthlyDonations
      }
    });
  } catch (error) {
    console.error("Error fetching donation stats:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching donation statistics",
      error: error.message
    });
  }
}; 