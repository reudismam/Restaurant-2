import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../models/users';

exports.local = passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());