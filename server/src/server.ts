import express, { request } from 'express';
import dishRoutes from './routes/dishRouter';
import commentRoutes from './routes/commentsRouter';
import userRoutes from './routes/userRoutes';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import auth from './services/auth';
//import cookieParser from 'cookie-parser';
import session from 'express-session';
import config from './config/jwt';
//import authenticate from './services/authenticate';
import UserController from './controllers/UserController';
var userController = new UserController();

import passport from 'passport';
const routes = express.Router();

const url = config.mongoUrl;
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log("Connected correctly to server");
});

const app = express();

app.use(cors());
app.use(express.json());

app.use(passport.initialize());
require('./config/passport');

//app.use(express.static(path.join(__dirname, 'src')));

app.use(userRoutes);

routes
.get('./login', userController.login);

routes.route('/fail')
.all((request, response) => {
    response.end("Fail");
});

routes.post('/login', passport.authenticate('local', { successRedirect: '/login', failureRedirect: '/fail' })
);

//app.use(auth);
app.use(dishRoutes);
app.use(commentRoutes);

app.listen(3333);