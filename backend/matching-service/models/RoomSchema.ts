import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    participants: [{ userId: String }],
    category: { type: String, default: 'Any' },
    difficulty: { type: String, default: 'Any' },
    roomId: { type: String, required: true },
    questionId : { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Room = mongoose.model('Room', roomSchema);

export default Room;
