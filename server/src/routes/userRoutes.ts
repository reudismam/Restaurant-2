import express from 'express';
import UserController from '../controllers/UserController';
import passport from 'passport';

const routes = express.Router();
const userController = new UserController();

routes.route('/signup')
.post(userController.create);

  
routes.route('/logout')
.post(userController.logout);

routes.route('/login')
.get(userController.login);

routes.route('/fail')
.all((request, response) => {
    response.end("Fail");
});

routes.post('/login', passport.authenticate('local', { successRedirect: '/login', failureRedirect: '/fail' })
);

export default routes;