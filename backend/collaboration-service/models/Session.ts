import mongoose, { Types } from "mongoose";

const sessionSchema = new mongoose.Schema({
    roomId: { type: Types.ObjectId, required: true },
    yDocId: { type: String, required: true },
});

const Session = mongoose.model('session', sessionSchema);

export default Session;
