// server.js
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const fastify = require('fastify')({ logger: true });
const mongoose = require('mongoose');
const http = require('http');

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  fastify.register(require('@fastify/formbody'));

  // MongoDB Connection
  mongoose.connect('mongodb+srv://root1:22suarez@cluster0.xkrbxgt.mongodb.net/ecomm', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

  // Routes
  fastify.register(require('./order-service/routes/orderRoutes'));

  const server = http.createServer(fastify);
  
  // Socket.IO Setup
  const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    },
  });

  // Attaching io to fastify instance
  fastify.decorate('io', io);

  io.on('connection', (socket) => {
    console.log('Client connected');
  });

  fastify.listen(3000, (err, address) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    console.log(`Worker ${process.pid} started and listening on ${address}`);
  });
}
