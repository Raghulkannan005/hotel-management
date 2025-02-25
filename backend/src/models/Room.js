import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    type: { type: String, required: true },
    price: { type: Number, required: true },
    amenities: [String],
    description: String,
    photos: [String],
    availability: { type: Boolean, default: true }
});

const Room = mongoose.model('Room', roomSchema);

export default Room;