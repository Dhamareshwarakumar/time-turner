import morgan from 'morgan';
import logger from '../utils/logger';
import * as constants from '../utils/constants';
import { IRequest } from '../utils/interfaces/vendor/express';
import { formatDate } from '../utils/helpers';

// Defining Custom Tokens
morgan.token('splitter', () => {
    return '\x1b[36m----------------------------------------------------------------------------------------\x1b[0m';
});

morgan.token('statusColor', (_req, res) => {
    // get the status code if response written
    var status = (typeof res.headersSent !== 'boolean' ? Boolean(res.headersSent) : res.headersSent)
        ? res.statusCode
        : 0;

    // get status color
    var color =
        status >= 500
            ? 31 // red
            : status >= 400
              ? 33 // yellow
              : status >= 300
                ? 36 // cyan
                : status >= 200
                  ? 32 // green
                  : 0; // no color

    return '\x1b[' + color + 'm' + status + '\x1b[0m';
});

morgan.token('remote-user', (req: IRequest, _res) => {
    return req.user ? req.user.email : 'anonymous';
});

morgan.token('timestamp', (_req, _res) => {
    return formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss.SSS ZZ');
});

const streamToWinstonReq: morgan.StreamOptions = {
    write: (message) => {
        // const winstonLogObject = {
        //     remoteAddress: message.split(' ')[0],
        //     remoteUser: message.split(' ')[1],
        //     method: message.split(' ')[2],
        //     url: message.split(' ')[3],
        //     httpVersion: message.split(' ')[4],
        //     userAgent: message.split(' ')[5],
        // };
        logger.info(message.trim());
    },
};

const streamToWinstonRes: morgan.StreamOptions = {
    write: (message) => {
        // const winstonLogObject = {
        //     remoteAddress: message.split(' ')[0],
        //     remoteUser: message.split(' ')[1],
        //     status: message.split(' ')[2],
        //     responseTime: message.split(' ')[3],
        // };
        logger.info(message.trim());
    },
};

// :response-time: The time between the request coming into morgan and when the response headers are written, in milliseconds.
//      - If :response-time is high, it indicates your application logic might need optimization.
// :total-time: The time between the request coming into morgan and when the response has finished being written out to the connection, in milliseconds.
//      - If :total-time is much higher than :response-time, it could indicate network issues or large response bodies.
const consoleLogReqFormat =
    ':splitter\n:timestamp [info]: [\x1b[32m:remote-addr :remote-user\x1b[0m]: \x1b[33m:method\x1b[0m \x1b[36m:url\x1b[0m HTTP/:http-version :user-agent';
const consoleLogResFormat =
    ':timestamp [info]: [\x1b[32m:remote-addr :remote-user\x1b[0m]: :statusColor :response-time/:total-time ms';
const winstonLogReqFormat = ':remote-addr :remote-user :method :url HTTP/:http-version :user-agent';
const winstonLogResFormat = ':remote-addr :remote-user :status :response-time/:total-time';

const morganLogger = () => {
    let reqLogger, resLogger;
    if (process.env.NODE_ENV !== constants.NODE_ENV_DEV) {
        reqLogger = morgan(winstonLogReqFormat, { stream: streamToWinstonReq, immediate: true });
        resLogger = morgan(winstonLogResFormat, { stream: streamToWinstonRes });
    } else {
        reqLogger = morgan(consoleLogReqFormat, { immediate: true });
        resLogger = morgan(consoleLogResFormat);
    }

    return [reqLogger, resLogger];
};
export default morganLogger;
