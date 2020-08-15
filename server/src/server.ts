import express, { request } from 'express';
import dishRoutes from './routes/dishRouter';
import commentRoutes from './routes/commentsRouter';
import userRoutes from './routes/userRoutes';
import cors from 'cors';
import mongoose from 'mongoose';
import auth from './services/auth';
//import cookieParser from 'cookie-parser';
import session from 'express-session';
//import authenticate from './services/authenticate';
import UserController from './controllers/UserController';
var userController = new UserController();

import passport from 'passport';
const routes = express.Router();

const url = 'mongodb://localhost:27017/restaurant';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log("Connected correctly to server");
});

const app = express();

app.use(cors());
app.use(express.json());
//app.use(cookieParser('12345-67890-09876-54321'));

app.use(session({
    name: 'session-id',
    secret: '12345-67890-09876-54321',
    saveUninitialized: true,
    resave: false,
    //store: new FileStore()
}));

console.log(`passport: ${passport}`)
app.use(passport.initialize());
app.use(passport.session());
require('./services/authenticate');

app.use(userRoutes);
routes.route('/login')
.get(userController.login);

routes.route('/fail')
.all((request, response) => {
    response.end("Fail");
});

routes.post('/login', passport.authenticate('local', { successRedirect: '/login', failureRedirect: '/fail' })
);

app.use(auth);
app.use(dishRoutes);
app.use(commentRoutes);

app.listen(3333);