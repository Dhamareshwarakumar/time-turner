import express from 'express';
import ApiResponse from '../../utils/ApiResponse';
import authRoutes from './auth.routes';

const router = express.Router();

router.get('/', (_req, res) => {
    new ApiResponse(res, 200, 'Welcome to Hogwarts 🏰');
});

router.use('/auth', authRoutes);

export default router;
