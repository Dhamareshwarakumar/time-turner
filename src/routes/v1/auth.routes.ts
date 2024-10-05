import express from 'express';
import { register, login } from '../../controllers/auth.controller';
import { validateUserRegistration, validateUserLogin } from '../../validators/auth.validator';

const router = express.Router();

// route    :: POST /api/v1/auth/register
// access   :: Public
// desc     :: User Registration
router.post('/register', validateUserRegistration, register);

// route    :: POST /api/v1/auth/login
// access   :: Public
// desc     :: User Login
router.post('/login', validateUserLogin, login);

export default router;
