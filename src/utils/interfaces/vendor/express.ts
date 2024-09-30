import { Request, Response } from 'express';
import { THTTPCodes } from '../../constants/httpCodes';

interface IResponseBody {
    msg: string;
    data?: any;
    err?: any;
}

interface IRequest extends Request {
    user?: any;
}

interface IResponse extends Response {
    json: (body: IResponseBody) => this;
    status: (code: THTTPCodes) => this;
}

export { IRequest, IResponse, IResponseBody };
