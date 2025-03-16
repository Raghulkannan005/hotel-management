import Booking from '../models/Booking.js';
import Room from '../models/Room.js';

export const bookRoom = async (user, bookingData) => {
    // Check if room exists
    const room = await Room.findById(bookingData.room);
    if (!room) throw new Error('Room not found');
    
    // Check if room is available
    if (!room.availability) throw new Error('Room is not available for booking');
    
    // Check for date conflicts
    const conflictingBooking = await Booking.findOne({
        room: bookingData.room,
        status: 'booked',
        $or: [
            { startDate: { $lte: bookingData.endDate }, endDate: { $gte: bookingData.startDate } }
        ]
    });
    
    if (conflictingBooking) throw new Error('Room is already booked for these dates');
    
    // Create booking
    const booking = new Booking({ ...bookingData, user: user._id });
    await booking.save();
    return booking;
};

export const getBookingHistory = async (user) => {
    return await Booking.find({ user: user._id }).populate('room');
};

export const cancelBooking = async (bookingId) => {
    const booking = await Booking.findById(bookingId);
    if (!booking) throw new Error('Booking not found');
    booking.status = 'cancelled';
    await booking.save();
    return booking;
};