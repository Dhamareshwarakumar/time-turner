import winston from 'winston';
import util from 'util';
import DailyRotateFile from 'winston-daily-rotate-file';

const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS Z' }),
    winston.format.printf(({ timestamp, level, message, ...args }) => {
        if (typeof message === 'object') message = util.inspect(message, { depth: null });
        let argString = '';
        if (args[Symbol.for('splat')]) {
            argString = args[Symbol.for('splat')][0];
            if (typeof argString === 'object') argString = util.inspect(argString, { depth: null });
        }
        return `${timestamp} [${level}]: ${message} ${argString}`;
    }),
);

const transports = [
    new winston.transports.Console({
        format: winston.format.combine(winston.format.colorize({ all: true }), format),
    }),
    new DailyRotateFile({
        filename: 'logs/app-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        level: 'info',
    }),
    new DailyRotateFile({
        filename: 'logs/error-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        level: 'error',
    }),
];

const logger = winston.createLogger({
    level: 'debug',
    format,
    transports,
});

export default logger;
