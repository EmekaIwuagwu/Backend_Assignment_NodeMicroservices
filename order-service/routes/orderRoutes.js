// order-service/routes/orderRoutes.js
const orderController = require('../controllers/orderController');

async function orderRoutes(fastify, options) {
  fastify.post('/order', async (request, reply) => {
    try {
      const orderData = request.body;
      const savedOrder = await orderController.saveOrderToDB(orderData);
      // Emitting data through Websockets
      fastify.io.emit('newOrder', savedOrder);
      reply.send(savedOrder);
    } catch (error) {
      console.error(error); // Log the error details
      reply.code(500).send({ message: 'Internal Server Error', error: error.message });
    }
  });
}

module.exports = orderRoutes;
