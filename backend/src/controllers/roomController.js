import Room from '../models/Room.js';
import { listRooms as listRoomsService, searchRooms as searchRoomsService } from '../services/roomService.js';

export const listRooms = async (req, res, next) => {
    try {
        const rooms = await listRoomsService();
        res.status(200).json(rooms);
    } catch (error) {
        next(error);
    }
};

export const searchRooms = async (req, res, next) => {
    try {
        const rooms = await searchRoomsService(req.query);
        res.status(200).json(rooms);
    } catch (error) {
        next(error);
    }
};

export const getFeaturedRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find({ featured: true }).limit(6);
        res.status(200).json(rooms);
    } catch (error) {
        next(error);
    }
};

export const createRoom = async (req, res, next) => {
    try {
        // Extract room data from request body
        const { type, price, description, capacity, size, amenities, images, availability, featured } = req.body;
        
        // Create room with all possible fields
        const room = new Room({
            type,
            price,
            description,
            capacity,
            size,
            amenities: amenities || [],
            images: images || [],
            availability: availability !== undefined ? availability : true,
            featured: featured !== undefined ? featured : false
        });
        
        await room.save();
        res.status(201).json(room);
    } catch (error) {
        next(error);
    }
};

export const updateRoom = async (req, res, next) => {
    try {
        const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.status(200).json(room);
    } catch (error) {
        next(error);
    }
};

export const deleteRoom = async (req, res, next) => {
    try {
        const room = await Room.findByIdAndDelete(req.params.id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.status(200).json({ message: 'Room deleted successfully' });
    } catch (error) {
        next(error);
    }
};