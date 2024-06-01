const {Kafka} = require('kafkajs');

const kafka = new Kafka({
  clientId: 'test-producer',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();

(async () => {
  await producer.connect();
  console.log('producer connected');

  await producer.send({
    topic: 'test-topic',
    messages: [{
      value: 'test-value',
    }]
  })

  await producer.disconnect();
  console.log('producer disconnected');
})();