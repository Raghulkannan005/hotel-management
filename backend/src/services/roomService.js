import Room from '../models/Room.js';

export const listRooms = async () => {
    return await Room.find();
};

export const searchRooms = async (query) => {
    const { type, price, availability } = query;
    const filter = {};
    if (type) filter.type = type;
    if (price) filter.price = { $lte: price };
    if (availability) filter.availability = availability === 'true';
    return await Room.find(filter);
};