import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ['booked', 'cancelled'], default: 'booked' }
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;