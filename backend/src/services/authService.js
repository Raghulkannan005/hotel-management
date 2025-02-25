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