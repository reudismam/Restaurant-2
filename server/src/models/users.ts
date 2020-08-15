import mongoose, { mongo } from 'mongoose';
var Schema = mongoose.Schema;
import passport from 'passport';
import passportMongoose from 'passport-local-mongoose';

var User = new Schema({
    admin: {
        type: Boolean,
        default: false
    }
});

User.plugin(passportMongoose);

export default mongoose.model('User', User);