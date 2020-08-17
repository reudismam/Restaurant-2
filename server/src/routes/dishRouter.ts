import express, {Request, Response} from 'express';
import DishesController from '../controllers/DishesController';
var authenticate = require('../config/passport');
import cors from './cors';

const routes = express.Router();
const dishController = new DishesController();

routes.route('/dishes')
.options(cors.corsWithOptions, (request: Request, response: Response) => {
    response.sendStatus(200);
})
.get(cors.cors, dishController.index)
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, dishController.create)
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, dishController.update)
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, dishController.delete);

routes.route('/dishes/:dishId')
.options(cors.corsWithOptions, (request: Request, response: Response) => {
    response.sendStatus(200);
})
.get(cors.cors, dishController.indexId)
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, dishController.createId)
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, dishController.updateId)
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, dishController.deleteId);

export default routes;