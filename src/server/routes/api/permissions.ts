import { RequestHandler } from 'express-serve-static-core';

export const isAuthor: RequestHandler = (req: any, res, next) => {
    if(!req.user || (req.user.role !== 'admin' && req.user.role !== 'author' && req.user.role !== 'webmaster')) {
        return res.sendStatus(401);
    } else {
        return next();
    }
};

export const isAdmin: RequestHandler = (req: any, res, next) => {
    if(!req.user || (req.user.role !== 'admin' && req.user.role !== 'webmaster')) {
        return res.sendStatus(401);
    } else {
        return next();
    }
};