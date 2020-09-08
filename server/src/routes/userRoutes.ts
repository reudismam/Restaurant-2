import express, {Request, Response} from 'express';
import UserController from '../controllers/UserController';
import passport from 'passport';
import cors from './cors';


const routes = express.Router();
const userController = new UserController();

routes.route('/signup')
.options(cors.corsWithOptions, (request: Request, response: Response) => {
    response.sendStatus(200);
})
.post(cors.corsWithOptions, userController.create);
  
routes.route('/logout')
.options(cors.corsWithOptions, (request: Request, response: Response) => {
    response.sendStatus(200);
})
.post(cors.corsWithOptions, userController.logout);

routes.route('/login')
.options(cors.corsWithOptions, (request: Request, response: Response) => {
    response.sendStatus(200);
})
.get(cors.cors, userController.login);

routes.route('/fail')
.options(cors.corsWithOptions, (request: Request, response: Response) => {
    response.sendStatus(200);
})
.get(cors.cors, (request, response) => {
    response.end("Fail");
});

routes.route('/login')
.options(cors.corsWithOptions, (request: Request, response: Response) => {
    response.sendStatus(200);
})
.post(cors.corsWithOptions, passport.authenticate('local'), userController.login);

routes.get('/facebook/token', passport.authenticate('facebook-token'), userController.facebookLogin);

export default routes;