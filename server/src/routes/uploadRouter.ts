import express, {Request} from 'express';
const authenticate = require('../config/passport');
import multer, { FileFilterCallback } from 'multer';
import UploadController from '../controllers/UploadController';
const uploadController = new UploadController();

const  storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const routes = express.Router();

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gig)$/)) {
        return cb(new Error('You can upload only images'));
    }
    cb(null, true);
};

const upload = multer({storage, fileFilter})

routes.route('/uploadImage')
.post(authenticate.verifyUser, authenticate.verifyAdmin, 
    upload.single('imageFile'), 
    uploadController.post)
.get(authenticate.verifyUser, authenticate.verifyAdmin, uploadController.get)
.put(authenticate.verifyUser, authenticate.verifyAdmin, uploadController.put)
.delete(authenticate.verifyUser, authenticate.verifyAdmin, uploadController.delete);

export default routes;