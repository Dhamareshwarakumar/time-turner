import express from 'express';
import ApiResponse from '../../utils/ApiResponse';

const router = express.Router();

router.get('/', (_req, res) => {
    new ApiResponse(res, 200, 'Welcome to Hogwarts 🏰');
});

export default router;
