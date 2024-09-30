import { NextFunction } from 'express';
import ApiException from '../utils/exceptions/ApiException';
import { IRequest, IResponse, IResponseBody } from '../utils/interfaces/vendor/express';
import { isEmpty } from '../utils/validator.util';

const errorHandler = (err: any, _req: IRequest, res: IResponse, _next: NextFunction) => {
    if (!(err instanceof ApiException)) {
        console.error(err);
    }

    const responseObject: IResponseBody = {
        msg: err.msg || 'Something went wrong, Please try again later',
    };

    if (!isEmpty(err.errors)) {
        responseObject.err = err.errors;
    }

    res.status(err.status || 500).json(responseObject);
};

export default errorHandler;
