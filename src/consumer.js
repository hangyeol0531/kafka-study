const {Kafka} = require('kafkajs');

const kafka = new Kafka({
  clientId: 'test-producer',
  brokers: ['localhost:9092']
});

const consumer = kafka.consumer({
  groupId: 'test-group'
});

(async () => {
  await consumer.connect();
  console.log('consumer connected');

  await consumer.subscribe(({
    topic: 'test-topic',
    fromBeginning: true,
  }));

  await consumer.run({
    eachMessage: async ({topic, partition, message}) => {
      console.log({
        value: message.value.toString(),
      })
    },
  });
})();