import Order from '../models/orderModel.js';

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('products.product')
      .sort({ createdAt: -1 }); // Most recent first

    res.status(200).json({
      success: true,
      orders
    });
  } catch (error) {
    console.log("Error fetching orders:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
      error: error.message
    });
  }
};