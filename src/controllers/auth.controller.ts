// import { addUser } from '../services/user.service';
import ApiResponse from '../utils/ApiResponse';
import asyncWrapper from '../utils/asyncWrapper';
import * as httpCodes from '../utils/constants/httpCodes';
import { IRegisterUserReqBody, ILoginUserReqBody } from '../utils/interfaces/auth.interface';
import { registerUser, loginUser } from '../services/auth.service';

const register = asyncWrapper(async (req, res) => {
    const data: IRegisterUserReqBody = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    };

    const authToken = await registerUser(data);

    return new ApiResponse(res, httpCodes.CREATED, 'User registered successfully', { token: authToken });
});

const login = asyncWrapper(async (req, res) => {
    const data: ILoginUserReqBody = {
        email: req.body.email,
        password: req.body.password,
    };

    const authToken = await loginUser(data);

    return new ApiResponse(res, httpCodes.OK, 'User logged in successfully', { token: authToken });
});

export { register, login };
