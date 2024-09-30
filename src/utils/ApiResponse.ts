import { IResponse, IResponseBody } from './interfaces/vendor/express';
import { THTTPCodes } from './constants/httpCodes';
import { isEmpty } from './validator.util';

class ApiResponse {
    constructor(
        public readonly res: IResponse,
        public readonly status: THTTPCodes,
        public readonly msg: string,
        public readonly data: object = {},
    ) {
        const responseObject: IResponseBody = {
            msg: msg,
        };

        if (!isEmpty(data)) {
            responseObject.data = data;
        }

        res.status(status).json(responseObject);
    }
}
export default ApiResponse;
