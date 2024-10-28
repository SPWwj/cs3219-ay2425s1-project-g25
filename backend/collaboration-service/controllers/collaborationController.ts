// controllers/collaborationController.js
import Session from '../models/Session'; // Import the session model
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { getSocket } from '../utils/socket'; // Function to get socket.io instance

export const handleMatchNotification = async (req, res) => {
    const { user1, user2, roomId } = req.body;

    try {
        // Generate a unique Yjs document ID
        const yDocId = `yDoc_${Date.now()}`;

        // Create a new session in MongoDB
        const session = new Session({
            roomId,
            yDocId,
        });
        await session.save();

        // Notify users via sockets to join the room
        const io = getSocket(); // Get the socket.io instance
        const socket1 = io.sockets.sockets.get(user1.socketId);
        const socket2 = io.sockets.sockets.get(user2.socketId);

        if (socket1 && socket2) {
            socket1.join(roomId);
            socket2.join(roomId);

            socket1.emit(SOCKET_EVENTS.MATCH_FOUND, {
                message: `You have been matched with User ID: ${user2.userId}`,
                roomId,
                yDocId,
            });

            socket2.emit(SOCKET_EVENTS.MATCH_FOUND, {
                message: `You have been matched with User ID: ${user1.userId}`,
                roomId,
                yDocId,
            });

            console.log(`Match notification sent to users in Room ID: ${roomId}`);
        }

        res.status(200).json({ message: "Match notification processed successfully." });
    } catch (error) {
        console.error("Error processing match notification:", error);
        res.status(500).json({ message: "Failed to process match notification." });
    }
};
