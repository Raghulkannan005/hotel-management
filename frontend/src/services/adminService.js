import api from './api';

export const getAllBookings = async () => {
  try {
    const response = await api.get('/admin/bookings');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch bookings' };
  }
};

export const getAllUsers = async () => {
  try {
    const response = await api.get('/admin/users');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch users' };
  }
};

export const createRoom = async (roomData) => {
  try {
    const response = await api.post('/admin/rooms', roomData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create room' };
  }
};

export const updateRoom = async (roomId, roomData) => {
  try {
    const response = await api.put(`/admin/rooms/${roomId}`, roomData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update room' };
  }
};

export const deleteRoom = async (roomId) => {
  try {
    const response = await api.delete(`/admin/rooms/${roomId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete room' };
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await api.put(`/admin/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update user' };
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/admin/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete user' };
  }
};

export const updateBooking = async (bookingId, bookingData) => {
  try {
    const response = await api.put(`/admin/bookings/${bookingId}`, bookingData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update booking' };
  }
}; 

export const getAllRooms = async () => {
  try {
    const response = await api.get('/admin/rooms');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch rooms' };
  }
};
