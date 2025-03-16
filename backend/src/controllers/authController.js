import { register as registerService, login as loginService, changePassword as changePasswordService } from '../services/authService.js';

export const register = async (req, res, next) => {
    try {
        const user = await registerService(req.body);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const token = await loginService(req.body);
        res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
};

export const changePassword = async (req, res, next) => {
    try {
        const result = await changePasswordService(req.user.id, req.body);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};