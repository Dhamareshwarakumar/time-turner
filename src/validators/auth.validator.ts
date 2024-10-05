import { NextFunction } from 'express';
import { IRequest, IResponse } from '../utils/interfaces/vendor/express';
import { isEmpty } from '../utils/validator.util';
import { NAME_REGEX, EMAIL_REGEX } from '../utils/constants/regexes';
import ApiResponse from '../utils/ApiResponse';
import * as httpCodes from '../utils/constants/httpCodes';
import { validatePassword, capitalize } from '../utils/helpers';

const validateUserRegistration = (req: IRequest, res: IResponse, next: NextFunction) => {
    let errors = {};

    // Validate & Clean Name
    req.body.name = req.body.name.trim();
    if (isEmpty(req.body.name)) {
        errors = { ...errors, name: 'Name is required' };
    } else if (typeof req.body.name !== 'string') {
        errors = { ...errors, name: 'Name must be a string' };
    } else if (req.body.name.length < 3 || req.body.name.length > 255) {
        errors = { ...errors, name: 'Name must be between 3 and 255 characters' };
    } else if (!NAME_REGEX.test(req.body.name)) {
        errors = { ...errors, name: 'Name can only contain letters, spaces' };
    } else {
        req.body.name = capitalize(req.body.name);
    }

    // Validate & Clean Email
    req.body.email = req.body.email.trim();
    if (isEmpty(req.body.email)) {
        errors = { ...errors, email: 'Email is required' };
    } else if (typeof req.body.email !== 'string') {
        errors = { ...errors, email: 'Email must be a string' };
    } else if (req.body.email.length < 7 || req.body.email.length > 255) {
        errors = { ...errors, email: 'Email must be between 7 and 255 characters' };
    } else if (!EMAIL_REGEX.test(req.body.email)) {
        errors = { ...errors, email: 'Invalid email format' };
    } else {
        req.body.email = req.body.email.toLowerCase();
    }

    // Validate Password
    if (isEmpty(req.body.password)) {
        errors = { ...errors, password: 'Password is required' };
    } else if (typeof req.body.password !== 'string') {
        errors = { ...errors, password: 'Password must be a string' };
    } else if (req.body.password.length < 8 || req.body.password.length > 255) {
        errors = { ...errors, password: 'Password must be between 8 and 255 characters' };
    } else if (!validatePassword(req.body.password)) {
        errors = {
            ...errors,
            password:
                'Password must contain at least 2 uppercase, 2 lowercase characters, 2 numbers and 2 special characters',
        };
    }

    // Validate errors
    if (!isEmpty(errors)) {
        new ApiResponse(res, httpCodes.UNPROCESSABLE_ENITITY, 'Validation failed', errors);
    } else {
        next();
    }
};

const validateUserLogin = (req: IRequest, res: IResponse, next: NextFunction) => {
    let errors = {};

    // Validate & Clean Email
    req.body.email = req.body.email.trim();
    if (isEmpty(req.body.email)) {
        errors = { ...errors, email: 'Email is required' };
    } else {
        req.body.email = req.body.email.toLowerCase();
    }

    // Validate Password
    if (isEmpty(req.body.password)) {
        errors = { ...errors, password: 'Password is required' };
    }

    // Validate errors
    if (!isEmpty(errors)) {
        new ApiResponse(res, httpCodes.UNPROCESSABLE_ENITITY, 'Validation failed', errors);
    } else {
        next();
    }
};

export { validateUserRegistration, validateUserLogin };
