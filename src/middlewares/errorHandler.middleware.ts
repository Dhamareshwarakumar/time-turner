import { NextFunction } from 'express';
import ApiException from '../utils/exceptions/ApiException';
import { IRequest, IResponse, IResponseBody } from '../utils/interfaces/vendor/express';
import { isEmpty } from '../utils/validator.util';
import logger from '../utils/logger';

const errorHandler = (err: any, _req: IRequest, res: IResponse, _next: NextFunction) => {
    if (!(err instanceof ApiException)) {
        logger.error('Unknown Exception:', err);
    }

    const responseObject: IResponseBody = {
        msg: err.msg || 'Something went wrong, Please try again later',
    };

    if (!isEmpty(err.errors)) {
        responseObject.err = err.errors;
    }

    if (err instanceof ApiException && err.status === 500) {
        logger.error('Internal Server Error: ' + err.message);
        responseObject.msg = 'Something went wrong, Please try again later';
    }

    res.status(err.status || 500).json(responseObject);
};

export default errorHandler;
