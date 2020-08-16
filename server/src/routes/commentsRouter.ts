import express from 'express';
import CommentsController from '../controllers/CommentsController';
var authenticate = require('../config/passport');
const routes = express.Router();
const commentsController = new CommentsController();

routes.route('/dishes/:dishId/comments')
.post(authenticate.verifyUser, commentsController.create)
.get(commentsController.index)
.put(authenticate.verifyUser, commentsController.update)
.delete(authenticate.verifyUser, commentsController.delete);


routes.route('/dishes/:dishId/comments/:commentId')
.post(authenticate.verifyUser, commentsController.createId)
.get(commentsController.indexId)
.put(authenticate.verifyUser, commentsController.updateId)
.delete(authenticate.verifyUser, commentsController.deleteId);

export default routes;