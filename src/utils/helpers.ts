import jwt from 'jsonwebtoken';
import * as httpCodes from './constants/httpCodes';
import ApiException from './exceptions/ApiException';

export function capitalize(str: string): string {
    return str
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export function formatDate(date: Date, formatString: string): string {
    const pad = (num: number, length: number = 2): string => String(num).padStart(length, '0');

    const formats: { [key: string]: () => string } = {
        YYYY: () => String(date.getFullYear()),
        MM: () => pad(date.getMonth() + 1),
        DD: () => pad(date.getDate()),
        HH: () => pad(date.getHours()),
        mm: () => pad(date.getMinutes()),
        ss: () => pad(date.getSeconds()),
        SSS: () => pad(date.getMilliseconds(), 3),
        ZZ: () => {
            const offset = date.getTimezoneOffset();
            const absOffset = Math.abs(offset);
            const sign = offset > 0 ? '-' : '+';
            return `${sign}${pad(Math.floor(absOffset / 60))}:${pad(absOffset % 60)}`;
        },
    };

    return formatString.replace(/YYYY|MM|DD|HH|mm|ss|SSS|ZZ/g, (match) => formats[match]());
}

export function generateJwtToken(payload: any): string {
    if (!payload)
        throw new ApiException(httpCodes.INTERNAL_SERVER_ERROR, 'Payload is required to generate a JWT token');
    if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRES_IN) {
        throw new ApiException(httpCodes.INTERNAL_SERVER_ERROR, 'JWT secret and expiration time are not defined');
    }

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}

export function validatePassword(password: string): boolean {
    // Regular expressions for each criteria
    const lowercaseRegex = /[a-z]/g;
    const uppercaseRegex = /[A-Z]/g;
    const digitRegex = /[0-9]/g;
    const symbolRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;

    // Count occurrences
    const lowercaseCount = (password.match(lowercaseRegex) || []).length;
    const uppercaseCount = (password.match(uppercaseRegex) || []).length;
    const digitCount = (password.match(digitRegex) || []).length;
    const symbolCount = (password.match(symbolRegex) || []).length;

    // Check if all criteria are met
    return lowercaseCount >= 2 && uppercaseCount >= 2 && digitCount >= 2 && symbolCount >= 2;
}
