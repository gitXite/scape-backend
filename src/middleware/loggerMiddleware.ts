import type { Request, Response, NextFunction } from 'express'

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const timeStamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    const ip = req.ip;

    console.log(`[${timeStamp}] ${ip} - ${method} ${url}`);
    next();
};