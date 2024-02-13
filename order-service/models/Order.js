// order-service/models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  transactionNumber: String,
  trackingNumber: String,
  productOrdered: String,
  productDescription: String,
  qty: String,
  fullName: String,
  address: String,
  city: String,
  state: String,
  telephone: String
});

module.exports = mongoose.model('Order', orderSchema);
