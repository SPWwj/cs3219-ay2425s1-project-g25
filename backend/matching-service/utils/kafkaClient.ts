import { Kafka } from 'kafkajs';
import { handleCollabMessage, handleQuestionMessage } from '../workers/matchWorker';

const HOST = process.env.KAFKA_HOST || "localhost";
const PORT = process.env.KAFKA_PORT || "9092";

const kafka = new Kafka({
    clientId: "matching-service",
    brokers: [`${HOST}:${PORT}`],
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: 'matching-service-group' });

export const MATCH_TOPIC = "match_topic";
export const ROOM_TOPIC = "collab-room";
export const QUESTION_TOPIC = "question-ids";

export const initKafka = async () => {
  await producer.connect();
  await consumer.connect();
};

export async function setUpKafkaSubscribers() {
    await initKafka();

    await consumer.subscribe({ topic: ROOM_TOPIC, fromBeginning: true });
    await consumer.run({
        eachMessage: handleQuestionMessage,
    });

    // Subscribe to question ID responses from question-service
    await consumer.subscribe({ topic: QUESTION_TOPIC, fromBeginning: true });
    await consumer.run({
        eachMessage: handleCollabMessage,
    });
}
