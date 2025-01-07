import Cart from "../models/cartModel.js";
import { Product } from "../models/productModel.js";

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // Create new cart if it doesn't exist
      cart = await Cart.create({
        user: userId,
        items: [{ product: productId, quantity: 1 }]
      });
    } else {
      // Check if product exists in cart
      const existingItem = cart.items.find(
        item => item.product.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.items.push({ product: productId, quantity: 1 });
      }

      await cart.save();
    }

    // Populate product details
    await cart.populate('items.product');

    res.status(200).json(cart.items);
  } catch (error) {
    res.status(500).json({
      message: `Internal Server Error : ${error.message}`,
    });
  }
};

export const getCartProducts = async (req, res) => {
  try {
    const userId = req.user._id;
    
    let cart = await Cart.findOne({ user: userId }).populate('items.product');
    
    if (!cart) {
      cart = await Cart.create({ user: userId, items: [] });
    }

    // Transform the data to match the frontend expectations
    const cartItems = cart.items.map(item => ({
      _id: item.product._id,
      name: item.product.name,
      price: item.product.price,
      image: item.product.image,
      quantity: item.quantity,
      ...item.product.toObject()
    }));

    res.status(200).json(cartItems);

  } catch (error) {
    res.status(500).json({
      message: `Internal Server Error : ${error.message}`,
    });
  }
};

export const removeAllFromCart = async (req, res) => {
  try {
    const { id } = req.body;
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    if (!id) {
      // Remove all items
      cart.items = [];
    } else {
      // Remove specific item
      cart.items = cart.items.filter(item => item.product.toString() !== id);
    }

    await cart.save();
    await cart.populate('items.product');

    res.status(200).json(cart.items);
  } catch (error) {
    res.status(500).json({
      message: `Internal Server Error : ${error.message}`,
    });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cartItem = cart.items.find(item => item.product.toString() === id);

    if (!cartItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter(item => item.product.toString() !== id);
    } else {
      cartItem.quantity = quantity;
    }

    await cart.save();
    await cart.populate('items.product');

    res.status(200).json(cart.items);
  } catch (error) {
    res.status(500).json({
      message: `Internal Server Error : ${error.message}`,
    });
  }
};
