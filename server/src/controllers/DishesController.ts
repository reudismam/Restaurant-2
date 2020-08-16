import { Request, Response, response, NextFunction } from 'express';
import mongoose from 'mongoose';
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

import authenticate from '../config/jwt';

import Dishes from '../models/dishes';

export default class DishController {
    index(request: Request, response: Response, next: NextFunction) {
       Dishes.find({})
       .then((dishes) => {
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.json(dishes);
       },
       (err) => next(err))
       .catch((err) => next(err));       
    }

    create(request: Request, response: Response, next: NextFunction) {
        Dishes.create(request.body)
        .then((dish) => {
            console.log('Dish Created ', dish);
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.json(dish);
        },
        (err) => next(err))
        .catch((err) => next(err));
    }

    update(request: Request, response: Response) {
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
     }
}