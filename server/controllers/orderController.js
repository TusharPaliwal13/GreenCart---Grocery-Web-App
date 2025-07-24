import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Stripe from "stripe";
import User from "../models/User.js";

// Initialize Stripe once (best practice)
const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

// Place order with Stripe : /api/order/stripe
export const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    const origin = req.headers.origin || "http://localhost:5173";

    if (!address || items.length === 0) {
      return res.json({
        success: false,
        message: "Please provide address and items to place order",
      });
    }

    let productData = [];
    let subtotal = 0;

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.json({
          success: false,
          message: `Product not found with id ${item.product}`,
        });
      }

      productData.push({
        name: product.name,
        price: product.offerPrice,
        quantity: item.quantity,
      });

      subtotal += Number(product.offerPrice) * Number(item.quantity);
    }

    // Calculate tax 2%
    const tax = Math.floor(subtotal * 0.02);
    const amount = subtotal + tax;

    console.log("Stripe Order - Subtotal:", subtotal, "Tax:", tax, "Total:", amount);

    const order = await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "Online",
    });

    // Prepare Stripe line items
    const lineItems = productData.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.floor(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    // Create Stripe checkout session
    const session = await stripeInstance.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${origin}/loader?next=my-orders`,
      cancel_url: `${origin}/cart`,
      metadata: {
        orderId: order._id.toString(),
        userId,
      },
    });

    console.log("Stripe session created. Redirect URL:", session.url);

    return res.json({
      success: true,
      url: session.url,
    });

  } catch (error) {
    console.error("Stripe order error:", error.message);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// Place order COD : /api/order/cod
export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;

    if (!address || items.length === 0) {
      return res.json({
        success: false,
        message: "Please provide address and items to place order",
      });
    }

    let subtotal = 0;

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.json({
          success: false,
          message: `Product not found with id ${item.product}`,
        });
      }

      subtotal += Number(product.offerPrice) * Number(item.quantity);
    }

    // Calculate tax 2%
    const tax = Math.floor(subtotal * 0.02);
    const amount = subtotal + tax;

    console.log("COD Order - Subtotal:", subtotal, "Tax:", tax, "Total:", amount);

    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
    });

    return res.json({
      success: true,
      message: "Order placed successfully",
    });

  } catch (error) {
    console.error("COD order error:", error.message);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// stripe webhooks to verify payement action : /stripe
export const stripeWebhook = async (request, response) => {
  //stripe gateway initialization
  const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

  const sig = request.headers["stripe-signature"];
  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(
      request.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    response.status(400).send(`Webhook Error: ${error.message}`);
  }

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":{
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;

      // getting session metadata
      const session = await stripeInstance.checkout.sessions.list({
       payment_intent: paymentIntentId
      });

      const { orderId , userId } = session.data[0].metadata;

      // mark order as paid
      await Order.findByIdAndUpdate(orderId, {
        isPaid: true,
        
      });

      //clear user cart
      await User.findByIdAndUpdate(userId, {
        cartItems: {}
      });
      break;
    }
      
      case "payment_intent.payement_failed":{
        const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;

      // getting session metadata
      const session = await stripeInstance.checkout.sessions.list({
       payment_intent: paymentIntentId
      });

      const { orderId } = session.data[0].metadata;
      await Order.findByIdAndDelete(orderId);
      break;
      }
  
    default:
      console.error(`Unhandled event type ${event.type}`);
      break;
  }

  response.json({ received: true });

}

// Get orders by userId : /api/order/user
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });

  } catch (error) {
    console.error("Get user orders error:", error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Get all orders (for seller/admin) : /api/order/seller
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });

  } catch (error) {
    console.error("Get all orders error:", error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
