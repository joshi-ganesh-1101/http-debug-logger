import {Request, Response, NextFunction} from 'express';
import {createServerLogger} from './index';
import {LoggerOptions} from "./types/loggerOptions";

export function expressLogger(options: LoggerOptions = {}) {
    const log = createServerLogger(options);
    return function (req: Request, res: Response, next: NextFunction) {
        log(req as any, res as any);
        next();
    };
}