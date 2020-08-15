import express from 'express';
import CommentsController from '../controllers/CommentsController';

const routes = express.Router();
const commentsController = new CommentsController();

routes.route('/dishes/:dishId/comments')
.post(commentsController.create)
.get(commentsController.index)
.put(commentsController.update)
.delete(commentsController.delete);


routes.route('/dishes/:dishId/comments/:commentId')
.post(commentsController.createId)
.get(commentsController.indexId)
.put(commentsController.updateId)
.delete(commentsController.deleteId);

export default routes;