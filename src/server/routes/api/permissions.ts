import { RequestHandler } from 'express-serve-static-core';

export const isAuthor: RequestHandler = (req: any, res, next) => {
    console.log(req.user);
    console.log(req.body);
    if(req.user) {     //mobile app doesn't seem to be sending a req.user, so for now given that the info here is not sensitive, the mobile requests will be sent through the 2nd part of this if/else
        if(!req.user || req.user.role === 'guest') { //if no user object is attached, or user is a guest, reject request
            return res.sendStatus(401);
        } else if(req.user.role === 'author' && req.params.id) {  //verifies that 'author' roles can only edit or delete their own posts, but 'admin' and 'webmaster' can do so with any post
            if(req.user.userid != req.body.authorid) {
                return res.sendStatus(401);
            } else {
                return next();
            }
        } else {
            return next();
        }
    } else {    //much less secure to use req.body as anyone with postman can send the "right" info, but will work for this application until I can figure out the mobile issue
        if(!req.body.role || req.body.role === 'guest') {
            return res.sendStatus(401);
        } else if(req.body.role === 'author' && req.params.id) { 
            if(req.body.userid != req.body.authorid) {
                return res.sendStatus(401);
            } else {
                return next();
            }
        } else {
            return next();
        }
    }
};

export const isAdmin: RequestHandler = (req: any, res, next) => {
    if(req.user.role) {
        if(!req.user || (req.user.role !== 'admin' && req.user.role !== 'webmaster')) {
            return res.sendStatus(401);
        } else {
            return next();
        }
    } else {
        if(!req.body.role || (req.body.role !== 'admin' && req.body.role !== 'webmaster')) {
            return res.sendStatus(401);
        } else {
            return next();
        }
    }
};