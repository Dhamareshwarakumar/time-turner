import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import * as constants from '../utils/constants';

const consoleLogFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS Z' }),
    // winston.format.align(),
    winston.format.printf(
        ({ timestamp, level, message, ...args }) =>
            `${timestamp} [${level}]: ${typeof message !== 'string' ? JSON.stringify(message) : message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`,
    ),
);

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS Z' }),
        winston.format.printf(({ timestamp, level, message, ...args }) => {
            return `${timestamp} [${level}]: ${typeof message !== 'string' ? JSON.stringify(message) : message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
        }),
    ),
});

logger.configure({
    level: 'error',
    transports: [
        new DailyRotateFile({
            filename: 'logs/error-%DATE%.log',
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
        }),
    ],
});

logger.configure({
    level: 'info',
    transports: [
        new DailyRotateFile({
            filename: 'logs/app-%DATE%.log',
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
        }),
    ],
});

if (process.env.NODE_ENV === constants.NODE_ENV_DEV) {
    logger.add(new winston.transports.Console({ format: consoleLogFormat }));
}

export default logger;
