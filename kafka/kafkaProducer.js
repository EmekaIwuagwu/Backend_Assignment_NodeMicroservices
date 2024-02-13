// kafka/kafkaProducer.js
const kafka = require('kafka-node');

const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new kafka.Producer(client);

producer.on('ready', () => {
  console.log('Kafka Producer is ready');
});

producer.on('error', (err) => {
  console.error('Error occurred with Kafka Producer:', err);
});

function sendToKafka(topic, payload) {
  const payloads = [
    {
      topic: topic,
      messages: JSON.stringify(payload),
    },
  ];

  producer.send(payloads, (err, data) => {
    if (err) {
      console.error('Error sending message to Kafka:', err);
    } else {
      console.log('Message sent to Kafka:', data);
    }
  });
}

module.exports = {
  sendToKafka,
};
