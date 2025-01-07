import { Coupon } from "../models/couponModel.js";
import Order from "../models/orderModel.js";
import { stripe } from "../lib/stripe.js";
import { razorpayInstance } from "../server.js";
import Cart from "../models/cartModel.js";
import crypto from "crypto";

export const createCheckoutSession = async (req, res) => {
  try {
    const { products, couponCode } = req.body;

    //checking if products is an array
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Invalid or empty products array" });
    }

    let totalAmount = 0;

    //stripe wants you to send products as line Items
    const lineItems = products.map((product) => {
      const amount = Math.round(product.price * 100); // stripe wants u to send in the format of cents
      totalAmount += amount * product.quantity;

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: amount,
        },
        quantity: product.quantity || 1,
      };
    });

    let coupon = null;
    if (couponCode) {
      coupon = await Coupon.findOne({
        code: couponCode,
        userId: req.user._id,
        isActive: true,
      });
      if (coupon) {
        totalAmount -= Math.round(
          (totalAmount * coupon.discountPercentage) / 100
        );
      }
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
      discounts: coupon
        ? [
            {
              coupon: await createStripeCoupon(coupon.discountPercentage),
            },
          ]
        : [],
      metadata: {
        userId: req.user._id.toString(),
        couponCode: couponCode || "",
        products: JSON.stringify(
          products.map((p) => ({
            id: p._id,
            quantity: p.quantity,
            price: p.price,
          }))
        ),
      },
    });

    if (totalAmount >= 20000) {
      await createNewCoupon(req.user._id);
    }
    res.status(200).json({ id: session.id, totalAmount: totalAmount / 100 });
  } catch (error) {
    console.error("Error processing checkout:", error);
    res
      .status(500)
      .json({ message: "Error processing checkout", error: error.message });
  }
};

export const checkoutSuccess = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      if (session.metadata.couponCode) {
        await Coupon.findOneAndUpdate(
          {
            code: session.metadata.couponCode,
            userId: session.metadata.userId,
          },
          {
            isActive: false,
          }
        );
      }

      // create a new Order
      const products = JSON.parse(session.metadata.products);
      const newOrder = new Order({
        user: session.metadata.userId,
        products: products.map((product) => ({
          product: product.id,
          quantity: product.quantity,
          price: product.price,
        })),
        totalAmount: session.amount_total / 100, // convert from cents to dollars,
        stripeSessionId: sessionId,
      });

      await newOrder.save();

      res.status(200).json({
        success: true,
        message:
          "Payment successful, order created, and coupon deactivated if used.",
        orderId: newOrder._id,
      });
    }
  } catch (error) {
    console.error("Error processing successful checkout:", error);
    res.status(500).json({
      message: "Error processing successful checkout",
      error: error.message,
    });
  }
};

async function createStripeCoupon(discountPercentage) {
  const coupon = await stripe.coupons.create({
    percent_off: discountPercentage,
    duration: "once",
  });

  return coupon.id;
}

async function createNewCoupon(userId) {
  await Coupon.findOneAndDelete({ userId });

  const newCoupon = new Coupon({
    code: "DISCOUNT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
    discountPercentage: 10,
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    userId: userId,
  });

  await newCoupon.save();

  return newCoupon;
}

//RAZOR PAY ---------- INTEGRATION //

export const checkout = async (req, res) => {
  try {
    const { amount, shippingDetails } = req.body;
    console.log("Received checkout data:", { amount, shippingDetails });

    // First check if cart exists and has items
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    
    if (!cart || cart.items.length === 0) {
      console.log("Cart check failed:", { cart, userId: req.user._id });
      return res.status(400).json({
        success: false,
        message: "Cart is empty"
      });
    }

    // Create Razorpay order
    const options = {
      amount: Number(amount * 100),
      currency: "INR",
      receipt: `order_${Date.now()}`,
      notes: {
        shipping_details: JSON.stringify(shippingDetails),
        user_id: req.user._id,
        cart_id: cart._id // Add cart ID to notes for reference
      }
    };

    console.log("Creating Razorpay order with options:", options);

    const razorpayOrder = await razorpayInstance.orders.create(options);
    console.log("Razorpay order created:", razorpayOrder);

    // Create order in database BEFORE clearing cart
    const newOrder = await Order.create({
      user: req.user._id,
      products: cart.items.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price
      })),
      shippingDetails,
      totalAmount: amount,
      paymentInfo: {
        orderId: razorpayOrder.id,
        paymentMethod: 'razorpay'
      },
      orderStatus: 'pending'
    });

    // Only clear cart AFTER successful order creation
    if (newOrder) {
      await Cart.findOneAndDelete({ user: req.user._id });
      console.log("Cart cleared for user:", req.user._id);
    }

    res.status(200).json({
      success: true,
      order: razorpayOrder,
      orderId: newOrder._id
    });
  } catch (error) {
    console.log("Order creation error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating order",
      error: error.message
    });
  }
};

export const paymentVerification = async (req, res) => {
  try {
    const { 
      razorpay_payment_id, 
      razorpay_order_id, 
      razorpay_signature 
    } = req.body;

    console.log('Verification Data:', {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature
    });

    // Verify the payment signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZOR_PAY_SECRET)
      .update(body.toString())
      .digest("hex");

    console.log('Signature Comparison:', {
      expected: expectedSignature,
      received: razorpay_signature,
      secret: process.env.RAZOR_PAY_SECRET?.slice(0, 4) + '...' // Log first 4 chars of secret for verification
    });

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed"
      });
    }

    // Update the existing order instead of creating a new one
    const updatedOrder = await Order.findOneAndUpdate(
      { "paymentInfo.orderId": razorpay_order_id },
      {
        $set: {
          "paymentInfo.paymentId": razorpay_payment_id,
          orderStatus: "processing"
        }
      },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.redirect(`${process.env.CLIENT_URL}/purchase-success`);
  } catch (error) {
    console.error("Payment verification error:", error);
    res.redirect(`${process.env.CLIENT_URL}/purchase-failed?error=${encodeURIComponent(error.message)}`);
  }
};

export const getKey = async (req, res) => {
  try {
    res.status(200).json({
      key: process.env.RAZOR_PAY_KEY,
    });
  } catch (error) {
    console.log(error);
  }
};
