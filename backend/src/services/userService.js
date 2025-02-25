import User from '../models/User.js';

export const getUserProfile = async (user) => {
    return await User.findById(user._id).select('-password');
};

export const updateUserProfile = async (user, updateData) => {
    const updatedUser = await User.findByIdAndUpdate(user._id, updateData, { new: true }).select('-password');
    return updatedUser;
};