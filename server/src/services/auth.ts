import { Request, Response, NextFunction } from 'express';

/*
export default function auth(request: Request, response: Response, next: NextFunction) {
    console.log(request.headers);
    var authHeader = request.headers.authorization as string;
    if (!authHeader) {
        var err = new Error('You are not authenticated');
        response.setHeader('WWW-Authenticated', 'Basic');
        response.statusCode = 401;
        return next(err);
    }
    var auth = Buffer.from(authHeader.split(' ')[1], 'base64');
    const username = auth.toString().split(':')[0];
    const password = auth.toString().split(':')[1];
    if (username === 'admin' && password === 'admin123'){
        return next();
    }
    else {
        var err = new Error('Incorrect username or password');
        response.setHeader('WWW-Authenticated', 'Basic');
        response.statusCode = 401;
        return next(err);
    }
}
*/
/*
export default function auth(request: Request, response: Response, next: NextFunction) {
    console.log(request.signedCookies);

    if (!request.signedCookies.user) {
        var authHeader = request.headers.authorization as string;
        if (!authHeader) {
            var err = new Error('You are not authenticated');
            response.setHeader('WWW-Authenticated', 'Basic');
            response.statusCode = 401;
            return next(err);
        }
        var auth = Buffer.from(authHeader.split(' ')[1], 'base64');
        const username = auth.toString().split(':')[0];
        const password = auth.toString().split(':')[1];
        if (username === 'admin' && password === 'admin123') {
            response.cookie('user', 'admin', {signed: true});
            return next();
        }
        else {
            var err = new Error('Incorrect username or password');
            response.setHeader('WWW-Authenticated', 'Basic');
            response.statusCode = 401;
            return next(err);
        }
    }
    else if (request.signedCookies.user === 'admin') {
        return next();
    }
    else {
        var err = new Error('You are not authorized to access this server.');
            response.setHeader('WWW-Authenticated', 'Basic');
            response.statusCode = 401;
            return next(err);
    }
}
*/

export default function auth(request: Request, response: Response, next: NextFunction) {
    console.log(request.user);
    if (!request.user) {
            var err = new Error('You are not authenticated');
            response.setHeader('WWW-Authenticated', 'Basic');
            response.statusCode = 403;
            return next(err);
    }
    else {
        next();
    }
}