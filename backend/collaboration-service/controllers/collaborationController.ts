// controllers/collaborationController.js
import { EachMessagePayload } from 'kafkajs';
import { COLLAB_TOPIC, producer } from '../utils/kafkaClient';


// Placeholder function to create a session. Can change or rename as needed, just need to edit accordingly in createSession.
export const handleMatchNotification = async () => {
    // do whatever to create a session.
    // return the session ID or model.
};

/**
 * Process the message from the Kafka topic and create a new session.
 * Emits a Kafka message back to the matching service with the session ID.
 * @param message - Kafka message payload
 */
export async function createSession(message: EachMessagePayload) {
    /**
     * message contains all the info from the kafka message from matching-service. 
     * message looks like this:
     * {
     *  topic: 'match_topic',
     *  message: {
     *      key: matchId,
     *      value: {
     *         user1: { userId: user1.userId, socketId: user1.socketId },
                user2: { userId: user2.userId, socketId: user2.socketId },
                category: 'algo',
                difficulty: 'easy',
                matchId: 123 (mongoDB Id for match),
     *      }
     *  }
     * }
     */

    // Validation for message format. Can remove if not needed.
    const matchId = message.message.key?.toString();
    if (!matchId) {
        console.error("No match ID found in message.");
        return;
    }

    // TODO: Exact necessary fields from message and create session.
    // We want the ID from this session that was created, to return.
    const session = handleMatchNotification();

    // Send the session ID back to the matching service
    const messageBody = JSON.stringify({ session._id }); // modify the param to get the ID from whatver is returned.
    await producer.send({
        topic: COLLAB_TOPIC,
        messages: [
            {
                key: matchId,
                value: messageBody,
            },
        ],
    });

    console.log(`Sent Session ID ${session._id} to collab service.`); // modify
}
