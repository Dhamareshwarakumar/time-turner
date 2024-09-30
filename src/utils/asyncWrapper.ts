import { NextFunction } from 'express';
import { IRequest, IResponse } from './interfaces/vendor/express';
import ApiResponse from './ApiResponse';

interface IController {
    (req: IRequest, res: IResponse): Promise<ApiResponse>;
}

const asyncWrapper = (fun: IController) => async (req: IRequest, res: IResponse, next: NextFunction) => {
    try {
        await fun(req, res);
    } catch (err) {
        next(err);
    }
};

export default asyncWrapper;
