const Order = require('../model/Order');
const sendEmail = require('../utils/nodemailer');

const addOrderItems = async (req, res) => {
  try {
    const { items, totalAmount, address, paymentId, paymentMethod, paymentStatus } = req.body;
    if (items && items.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    } else {
      const order = new Order({
        userId: req.user._id,
        items,
        totalAmount,
        address,
        paymentId,
        paymentMethod: paymentMethod || 'Razorpay',
        paymentStatus: paymentStatus || 'Success'
      });
      const createdOrder = await order.save();

      // Send Order Confirmation Email
      const message = `
        Order Confirmation
        Hello ${req.user.name},
        Your order has been successfully placed! Order ID: ${createdOrder._id}
        Total Amount Paid: $${totalAmount.toFixed(2)}
        It will be shipped to: ${address.street}, ${address.city}
        Thank you for shopping with ShopNest!
      `;

      const emailSent = await sendEmail({
        email: req.user.email,
        subject: 'ShopNest - Order Confirmation',
        message
      });

      console.log('Order email sent:', emailSent);

      res.status(201).json(createdOrder);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('userId', 'id name');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.status = req.body.status || order.status;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addOrderItems, getMyOrders, getOrders, updateOrderStatus };