import express from 'express';
import DishesController from '../controllers/DishesController';
var authenticate = require('../config/passport');

const routes = express.Router();
const dishController = new DishesController();

routes.route('/dishes')
.post(authenticate.verifyUser, dishController.create)
.get(dishController.index)
.put(authenticate.verifyUser, dishController.update)
.delete(authenticate.verifyUser, dishController.delete);

routes.route('/dishes/:dishId')
.post(authenticate.verifyUser, dishController.createId)
.get(dishController.indexId)
.put(authenticate.verifyUser, dishController.updateId)
.delete(authenticate.verifyUser, dishController.deleteId);

export default routes;