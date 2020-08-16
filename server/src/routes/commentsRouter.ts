import express from 'express';
import CommentsController from '../controllers/CommentsController';
var authenticate = require('../config/passport');
const routes = express.Router();
const commentsController = new CommentsController();

routes.route('/dishes/:dishId/comments')
.post(authenticate.verifyUser, authenticate.verifyAdmin, commentsController.create)
.get(commentsController.index)
.put(authenticate.verifyUser, authenticate.verifyAdmin, commentsController.update)
.delete(authenticate.verifyUser, authenticate.verifyAdmin, commentsController.delete);


routes.route('/dishes/:dishId/comments/:commentId')
.post(authenticate.verifyUser, authenticate.verifyAdmin, commentsController.createId)
.get(commentsController.indexId)
.put(authenticate.verifyUser, authenticate.verifyAdmin, commentsController.updateId)
.delete(authenticate.verifyUser, authenticate.verifyAdmin, commentsController.deleteId);

export default routes;