import { IRegisterUserReqBody, ILoginUserReqBody } from '../utils/interfaces/auth.interface';
import User from '../models/user.model';
import ApiException from '../utils/exceptions/ApiException';
import * as httpCodes from '../utils/constants/httpCodes';
import { generateJwtToken } from '../utils/helpers';

// TODO: Learn & Implement MongoDB Transactions later
const registerUser = async ({ name, email, password }: IRegisterUserReqBody): Promise<string> => {
    let user = await User.findUserByEmail(email);
    if (user) throw new ApiException(httpCodes.CONFLICT, 'User with email already exists');
    user = await User.addUser({ name, email, password });
    if (!user) throw new ApiException(httpCodes.INTERNAL_SERVER_ERROR, 'Something went wrong');
    const token = generateJwtToken({
        _id: user._id,
        name: user.name,
        email: user.email,
    });
    return token;
};

const loginUser = async ({ email, password }: ILoginUserReqBody): Promise<string> => {
    let user = await User.findUserByEmail(email);
    if (!user) throw new ApiException(httpCodes.NOT_FOUND, 'Invalid Credentials');
    if (!user.authenticate(password)) throw new ApiException(httpCodes.UNAUTHORIZED, 'Invalid Credentials');
    const token = generateJwtToken({
        _id: user._id,
        name: user.name,
        email: user.email,
    });
    return token;
};

export { registerUser, loginUser };
