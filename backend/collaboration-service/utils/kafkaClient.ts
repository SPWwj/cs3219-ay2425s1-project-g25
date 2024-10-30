import { createSession } from "controllers/collaborationController";
import { Kafka } from "kafkajs";

const HOST = process.env.KAFKA_HOST || "localhost";
const PORT = process.env.KAFKA_PORT || "9092";

const kafka = new Kafka({
    clientId: "collaboration-service",
    brokers: [`${HOST}:${PORT}`],
});

export const MATCH_TOPIC = "match_topic";
export const COLLAB_TOPIC = "collaboration_topic";

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: "collab-service-group" });

async function initKafka() {
    await producer.connect();
    await consumer.connect();
}

/**
 * Listens for messages from matching-service for successful matches.
 */
export async function setUpKafkaSubscribers() {
    await initKafka();

    await consumer.subscribe({ topic: MATCH_TOPIC, fromBeginning: true });
    await consumer.run({
        eachMessage: createSession,
    });
}
