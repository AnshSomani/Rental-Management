const mongoose = require('mongoose');

const notificationSettingSchema = new mongoose.Schema({
  role: { type: String, enum: ['customer', 'end_user'], required: true },
  leadDays: { type: Number, default: 2 },
  channels: [{ type: String, enum: ['email', 'portal'] }],
}, { timestamps: true });

module.exports = mongoose.model('NotificationSetting', notificationSettingSchema);