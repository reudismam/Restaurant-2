import { Request, Response, response, NextFunction } from 'express';
import mongoose from 'mongoose';
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


import authenticate = require('../config/passport');
import Users from '../models/users';

import passport, { Authenticator} from 'passport';

export default class DishController {
    index(request: Request, response: Response, next: NextFunction) {
        response.end('respon with a resource');
    }

    create(request: Request, response: Response, next: NextFunction) {
        Users.register(
            new Users({ username: request.body.username }),
            request.body.password,
            (err: Error, user) => {
                if (err) {
                    response.statusCode = 500;
                    response.setHeader('Content-Type', 'application/json');
                    response.json({ err });
                }
                else {
                    passport.authenticate('local')(request, response, () => {
                        response.statusCode = 200;
                        response.setHeader('Content-Type', 'application/json');
                        response.json({ success: true, status: 'Registration Succesful' });
                    });
                }
            });
    }

    login(request: Request, response: Response) {
        var token = authenticate.getToken({
            _id: request.user._id
        });
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.json({ success: true, token: token, status: 'You are successfully logged in' });
    }

    logout(request: Request, response: Response, next: NextFunction) {
        if (request.user) {
            if (request.session)
                request.session.destroy(() => {
                    console.log('Session destroyed');
                });
            response.clearCookie('session-id');
            request.logOut();
            response.end('Logout successfully');
        }
        else {
            var err = new Error('You are not logged in');
            response.statusCode = 403;
            return next(err);
        }
    }

    home(request: Request, response: Response, next: NextFunction) {
        response.statusCode = 200;
        response.end('Home page');
    }

    /*update(request: Request, response: Response) {
        response.statusCode = 403;
        response.end('PUT operation not suported on /dishes');
    }

    delete(request: Request, response: Response, next: NextFunction) {
        Dishes.remove({})
        .then((resp) => {
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.json(resp);
        },
        (err) => next(err))
        .catch((err) => next(err));
    }

    indexId(request: Request, response: Response, next: NextFunction) {
        const dishId = request.params.dishId as string;
        Dishes.findById(dishId)
        .then((dish) => {
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.json(dish);
        },
        (err) => next(err))
        .catch((err) => next(err));
     }
 
     createId(request: Request, response: Response) {
         response.statusCode = 403;
         response.end(`POST not supported.`);
     }
 
     updateId(req: Request, res: Response, next: NextFunction) {
        const dishId = req.params.dishId as string;
        Dishes.findByIdAndUpdate(req.params.dishId, {
            $set: req.body
        }, {useFindAndModify: false})
        .then((dish) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');

            res.json(dish);
        }, (err) => next(err))
        .catch((err) => next(err));
     }
 
     deleteId(request: Request, response: Response, next: NextFunction) {
        const dishId = request.params.dishId as string;
        Dishes.findByIdAndRemove(dishId)
        .then((dish) => {
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.json(dish);
        },
        (err) => next(err))
        .catch((err) => next(err));
     }

     indexComments(request: Request, response: Response, next: NextFunction) {
        const dishId = request.params.dishId as string;
        Dishes.findById(dishId)
        .then((dish) => {
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.json(dish);
        },
        (err) => next(err))
        .catch((err) => next(err));
     }
 
     createComments(request: Request, response: Response) {
         response.statusCode = 403;
         response.end(`POST not supported.`);
     }
 
     updateComments(req: Request, res: Response, next: NextFunction) {
        const dishId = req.params.dishId as string;
        Dishes.findByIdAndUpdate(req.params.dishId, {
            $set: req.body
        }, {useFindAndModify: false})
        .then((dish) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            
            res.json(dish);
        }, (err) => next(err))
        .catch((err) => next(err));
     }
 
     deleteComments(request: Request, response: Response, next: NextFunction) {
        const dishId = request.params.dishId as string;
        Dishes.findByIdAndRemove(dishId)
        .then((dish) => {
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.json(dish);
        },
        (err) => next(err))
        .catch((err) => next(err));
     }*/
}