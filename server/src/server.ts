import express, { request } from 'express';
import dishRoutes from './routes/dishRouter';
import commentRoutes from './routes/commentsRouter';
import userRoutes from './routes/userRoutes';
import uploadRouter from './routes/uploadRouter';
import path, { normalize } from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import auth from './services/auth';
import https from 'https';
import http from 'http';
import fs from 'fs';

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

const port = 3333;
app.set('port', port);
app.set('secPort', port + 443);

/*
app.all('*', (request, response, next) => {
    if (request.secure) {
        next();
    }
    else {
        response.redirect(307, `https://${request.hostname}:${app.get('secPort')}${request.url}`);
    }
});
*/

app.use(cors());
app.use(express.json());

app.use(passport.initialize());
require('./config/passport');

//app.use(express.static(path.join(__dirname, 'src')));

app.use(userRoutes);
//app.use(auth);
app.use(dishRoutes);
app.use(commentRoutes);
app.use(uploadRouter);

console.log(__dirname)

const server = http.createServer(app);
server.listen(port);

var options = {
    key: fs.readFileSync(__dirname + '../../bin/private.pem'),
    cert: fs.readFileSync(__dirname + '../../bin/certificate.pem')
}

const securyServer = https.createServer(options, app);
securyServer.listen(app.get('secPort'), () => {
    console.log(`Secury server listening on port ${app.get('secPort')}`);
});