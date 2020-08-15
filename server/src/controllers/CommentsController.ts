import { Request, Response, response, NextFunction } from 'express';
import mongoose from 'mongoose';
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

import Dishes from '../models/dishes';
import Dish from '../objects/Dish';

export default class DishController {
    index(request: Request, response: Response, next: NextFunction) {
        const dishId = request.params.dishId as string;
        Dishes.findById(dishId)
            .then((dish) => {
                const target = dish as unknown;
                const targetDish = target as Dish;
                if (dish != null) {
                    response.statusCode = 200;
                    response.setHeader('Content-Type', 'application/json');
                    response.json(targetDish.comments);
                }
                else {
                    const err = new Error(`Dish ${dishId} not found!!`);
                    return err;
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    }

    create(request: Request, response: Response, next: NextFunction) {
        const dishId = request.params.dishId as string;
        Dishes.findById(dishId)
            .then((dish) => {
                const target = dish as unknown;
                const targetDish = target as Dish;
                if (dish != null) {
                    targetDish.comments.push(request.body);
                    dish.save()
                    .then((dish) => {
                        response.statusCode = 200;
                        response.setHeader('Content-Type', 'application/json');
                        response.json(dish);
                    }, (err) => next(err));
                }
                else {
                    const err = new Error(`Dish ${dishId} not found!!`);
                    return err;
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    }

    update(request: Request, response: Response) {
        const dishId = request.params.dishId as string;
        response.statusCode = 403;
        response.end(`PUT operation not suported on /dishes/${dishId}/comments`);
    }

    delete(request: Request, response: Response, next: NextFunction) {
        const dishId = request.params.dishId as string;
        Dishes.findById(dishId)
            .then((dish) => {
                const target = dish as unknown;
                const targetDish = target as Dish;
                if (dish != null) {
                    for (var i = targetDish.comments.length - 1; i >=0; i++) {
                        targetDish.comments.splice(targetDish.comments.length - 1, 1);
                    }
                    dish.save()
                    .then((dish) => {
                        response.statusCode = 200;
                        response.setHeader('Content-Type', 'application/json');
                        response.json(dish);
                    }, (err) => next(err));
                }
                else {
                    const err = new Error(`Dish ${dishId} not found!!`);
                    return err;
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    }

    indexId(request: Request, response: Response, next: NextFunction) {
        const dishId = request.params.dishId as string;
        const commentId = request.params.commentId as string;
        Dishes.findById(dishId)
            .then((dish) => {
                const target = dish as unknown;
                const targetDish = target as Dish;
                var comments = targetDish.comments.filter((comment) => comment._id == commentId);
                var comment = comments.length ? comments[0] : null;
                if (dish == null) {
                   const err = new Error(`Dish ${dishId} not found`);
                   return next(err);
                }
                else if (comment == null) {
                    const err = new Error(`Comment ${commentId} not found on dish ${dishId}`);
                    return err;
                }
                else {
                    response.statusCode = 200;
                    response.setHeader('Content-Type', 'application/json');
                    response.json(comment);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    }

    createId(request: Request, response: Response, next: NextFunction) {
        const dishId = request.params.dishId as string;
        const commentId = request.params.commentId as string;
        response.statusCode = 403;
        response.end(`POST not supported on /dishes/${dishId}/${commentId}`);
    }

    updateId(request: Request, response: Response, next: NextFunction) {
        const dishId = request.params.dishId as string;
        const commentId = request.params.commentId as string;
        Dishes.findById(dishId)
            .then((dish) => {
                const target = dish as unknown;
                const targetDish = target as Dish;
                var comments = targetDish.comments.filter((comment) => comment._id == commentId);
                var comment = comments.length ? comments[0] : null;
                if (dish == null) {
                   const err = new Error(`Dish ${dishId} not found`);
                   return next(err);
                }
                else if (comment == null) {
                    const err = new Error(`Comment ${commentId} not found on dish ${dishId}`);
                    return err;
                }
                else {
                    if (request.body.rating) {
                        comment.rating = Number(request.body.rating);
                    }
                    if (request.body.comment) {
                        comment.comment = request.body.comment;
                    }
                    dish.save()
                    .then((dish) => {
                        response.statusCode = 200;
                        response.setHeader('Content-Type', 'application/json');
                        response.json(dish);
                    }, (err) => next(err));
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    }

    deleteId(request: Request, response: Response, next: NextFunction) {
        const dishId = request.params.dishId as string;
        const commentId = request.params.commentId as string;
        Dishes.findById(dishId)
            .then((dish) => {
                const target = dish as unknown;
                const targetDish = target as Dish;
                var comments = targetDish.comments.filter((comment) => comment._id == commentId);
                var comment = comments.length ? comments[0] : null;
                if (dish == null) {
                    const err = new Error(`Dish ${dishId} not found`);
                    return next(err);
                 }
                 else if (comment == null) {
                     const err = new Error(`Comment ${commentId} not found on dish ${dishId}`);
                     return err;
                 }
                else {
                    targetDish.comments.splice(targetDish.comments.length - 1, 1);
                    const newComments = comments.filter((comment) => comment._id != commentId);
                    targetDish.comments = newComments;
                    dish.save()
                    .then((dish) => {
                        response.statusCode = 200;
                        response.setHeader('Content-Type', 'application/json');
                        response.json(dish);
                    }, (err) => next(err));
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    }
}