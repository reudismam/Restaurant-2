import mongoose, { mongo } from 'mongoose';
var Schema = mongoose.Schema;
import passport from 'passport';
import passportMongoose from 'passport-local-mongoose';

var User = new Schema({
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    facebookId: {
        type: String,
    },
    admin: {
        type: Boolean,
        default: false
    }
});

User.plugin(passportMongoose);

export default mongoose.model('User', User);