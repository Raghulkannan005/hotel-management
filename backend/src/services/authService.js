import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const register = async (userData) => {
    const user = new User(userData);
    await user.save();
    return user;
};

export const login = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};

export const changePassword = async (userId, { currentPassword, newPassword }) => {
    const user = await User.findById(userId);
    
    if (!user) {
        throw new Error('User not found');
    }
    
    // Verify current password
    if (!(await user.matchPassword(currentPassword))) {
        throw new Error('Current password is incorrect');
    }
    
    // Update password
    user.password = newPassword;
    await user.save();
    
    return { message: 'Password changed successfully' };
};