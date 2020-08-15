import express from 'express';
import DishesController from '../controllers/DishesController';

const routes = express.Router();
const dishController = new DishesController();

routes.route('/dishes')
.post(dishController.create)
.get(dishController.index)
.put(dishController.update)
.delete(dishController.delete);

routes.route('/dishes/:dishId')
.post(dishController.createId)
.get(dishController.indexId)
.put(dishController.updateId)
.delete(dishController.deleteId);

export default routes;