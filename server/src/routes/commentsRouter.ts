import express, {Request, Response} from 'express';
import CommentsController from '../controllers/CommentsController';
var authenticate = require('../config/passport');
import cors from './cors';
const routes = express.Router();
const commentsController = new CommentsController();

routes.route('/dishes/:dishId/comments')
.options(cors.corsWithOptions, (request: Request, response: Response) => {
    response.sendStatus(200);
})
.get(cors.cors, commentsController.index)
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, commentsController.create)
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, commentsController.update)
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, commentsController.delete);


routes.route('/dishes/:dishId/comments/:commentId')
.options(cors.corsWithOptions, (request: Request, response: Response) => {
    response.sendStatus(200);
})
.get(cors.cors, commentsController.indexId)
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, commentsController.createId)
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, commentsController.updateId)
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, commentsController.deleteId);

export default routes;