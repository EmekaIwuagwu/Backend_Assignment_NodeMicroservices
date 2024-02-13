// order-service/controllers/orderController.js
const Order = require('../models/Order');
const kafkaProducer = require('../../kafka/kafkaProducer');

async function saveOrderToDB(orderData) {
  try {
    const order = new Order(orderData);
    const savedOrder = await order.save();
    
    // Publish to Kafka
    kafkaProducer.sendToKafka('order-topic', savedOrder.toJSON());

    return savedOrder;
  } catch (error) {
    console.error('Error saving order to database:', error); // Log the error
    throw error;
  }
}

module.exports = {
  saveOrderToDB,
};
