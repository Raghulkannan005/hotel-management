import api from './api';

export const getAllRooms = async () => {
  try {
    const response = await api.get('/rooms');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch rooms' };
  }
};

export const searchRooms = async (queryParams) => {
  try {
    const response = await api.get('/rooms/search', { params: queryParams });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to search rooms' };
  }
};

export const getRoomById = async (roomId) => {
  try {
    const response = await api.get(`/rooms/${roomId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch room details' };
  }
}; 