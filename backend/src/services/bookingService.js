import Booking from '../models/Booking.js';

export const bookRoom = async (user, bookingData) => {
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