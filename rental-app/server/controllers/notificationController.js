// server/controllers/notificationController.js
const RentalOrder = require('../models/RentalOrder');
const NotificationSetting = require('../models/NotificationSetting');

const getUpcomingReturns = async (req, res) => {
  try {
    const settings = await NotificationSetting.find({});
    const leadByRole = settings.reduce((acc, s) => { acc[s.role] = s.leadDays; return acc; }, { customer: 2, end_user: 2 });

    const now = new Date();
    const notifications = [];

    // Customer reminders
    const leadDaysCustomer = leadByRole.customer || 2;
    const startWindowCustomer = new Date(now.getTime() + (leadDaysCustomer - 1) * 24 * 60 * 60 * 1000);
    const endWindowCustomer = new Date(now.getTime() + (leadDaysCustomer + 1) * 24 * 60 * 60 * 1000);

    const customerOrders = await RentalOrder.find({
      orderStatus: { $in: ['reservation', 'pickup'] },
      endDate: { $gte: startWindowCustomer, $lte: endWindowCustomer },
    }).populate('user product');

    for (const order of customerOrders) {
      notifications.push({
        role: 'customer',
        userId: order.user._id,
        email: order.user.email,
        subject: 'Rental return reminder',
        message: `Your rental for ${order.product.name} is due on ${order.endDate.toDateString()}.`,
        orderId: order._id,
      });
    }

    // End user reminders
    const leadDaysEndUser = leadByRole.end_user || 2;
    const startWindowEndUser = new Date(now.getTime() + (leadDaysEndUser - 1) * 24 * 60 * 60 * 1000);
    const endWindowEndUser = new Date(now.getTime() + (leadDaysEndUser + 1) * 24 * 60 * 60 * 1000);

    const endUserOrders = await RentalOrder.find({
      orderStatus: { $in: ['reservation', 'pickup'] },
      endDate: { $gte: startWindowEndUser, $lte: endWindowEndUser },
    }).populate('product');

    for (const order of endUserOrders) {
      notifications.push({
        role: 'end_user',
        subject: 'Pickup preparation reminder',
        message: `Collect ${order.product.name} from customer on ${order.endDate.toDateString()}.`,
        orderId: order._id,
      });
    }

    res.json({ notifications });
  } catch (error) {
    console.error('Error generating notifications:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getUpcomingReturns };