import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		products: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
					required: true,
				},
				quantity: {
					type: Number,
					required: true,
					min: 1,
				},
				price: {
					type: Number,
					required: true,
					min: 0,
				},
			},
		],
		shippingDetails: {
			fullName: {
				type: String,
				required: true,
			},
			address: {
				type: String,
				required: true,
			},
			city: {
				type: String,
				required: true,
			},
			state: {
				type: String,
				required: true,
			},
			pinCode: {
				type: String,
				required: true,
			},
			phone: {
				type: String,
				required: true,
			},
		},
		totalAmount: {
			type: Number,
			required: true,
			min: 0,
		},
		paymentInfo: {
			paymentId: String,     // For Razorpay payment_id
			orderId: String,       // For Razorpay order_id
			stripeSessionId: String, // For Stripe session_id
			paymentMethod: {
				type: String,
				enum: ['stripe', 'razorpay'],
				required: true
			},
		},
		orderStatus: {
			type: String,
			enum: ['pending', 'processing', 'shipped', 'delivered'],
			default: 'pending'
		}
	},
	{ timestamps: true }
);

// Remove any existing indexes
orderSchema.index({ 'paymentInfo.stripeSessionId': 1 }, { unique: true, sparse: true });
orderSchema.index({ 'paymentInfo.orderId': 1 }, { unique: true, sparse: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;