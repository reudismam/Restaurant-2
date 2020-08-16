import express from 'express';
import DishesController from '../controllers/DishesController';
var authenticate = require('../config/passport');

const routes = express.Router();
const dishController = new DishesController();

routes.route('/dishes')
.post(authenticate.verifyUser, authenticate.verifyAdmin, dishController.create)
.get(dishController.index)
.put(authenticate.verifyUser, authenticate.verifyAdmin, dishController.update)
.delete(authenticate.verifyUser, authenticate.verifyAdmin, dishController.delete);

routes.route('/dishes/:dishId')
.post(authenticate.verifyUser, authenticate.verifyAdmin, dishController.createId)
.get(dishController.indexId)
.put(authenticate.verifyUser, authenticate.verifyAdmin, dishController.updateId)
.delete(authenticate.verifyUser, authenticate.verifyAdmin, dishController.deleteId);

export default routes;