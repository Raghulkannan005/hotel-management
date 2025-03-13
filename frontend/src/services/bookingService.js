import api from './api';

export const createBooking = async (bookingData) => {
  try {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Booking failed' };
  }
};

export const getBookingHistory = async () => {
  try {
    const response = await api.get('/bookings/history');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch booking history' };
  }
};

export const cancelBooking = async (bookingId) => {
  try {
    const response = await api.delete(`/bookings/${bookingId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to cancel booking' };
  }
}; 