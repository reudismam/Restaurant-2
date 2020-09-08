import passport from 'passport';
import LocalStrategy from 'passport-local';
import FacebookTokenStrategy from 'passport-facebook-token';
import User from '../models/users';
import {Request, Response, NextFunction} from 'express';

import passportJwt from 'passport-jwt';
var JwtStrategy = passportJwt.Strategy;
var ExtractJwt = passportJwt.ExtractJwt;


import jwt from 'jsonwebtoken';
import config from '../config/jwt';
import { userInfo } from 'os';

exports.local = passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function(user) {
    console.log(`the user is ${JSON.stringify(user)}`);
    return jwt.sign(user, config.secretKey,
        {expiresIn: 3600})
}

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        User.findOne({_id: jwt_payload._id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));

exports.verifyUser = passport.authenticate('jwt', {session: false});

exports.verifyAdmin = function(request: Request, response: Response, next: NextFunction) {
    if (request.user && request.user.admin) {
        return next();
    }
    return next(new Error('You are not authorized to perform this operation.'));
}

exports.facebookPassport = passport.use(new 
    FacebookTokenStrategy({
        clientID: config.facebook.clientId,
        clientSecret: config.facebook.clientSecret
    }, (acessToken, refleshToken, profile, done) => {
        User.findOne({facebookId: profile.id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (!err && user !== null) {
                return done(null, user);
            }
            else {
                user = new User({userName: profile.displayName});
                user.facebookId = profile.id;
                user.firstname = profile.name.givenName;
                user.lastname = profile.name.familyName;
                user.save((err, user) => {
                    if (err) {
                        return done(err, false);
                    }
                    else {
                        return done(null, user);
                    }
                });
            }
        });
    }
));