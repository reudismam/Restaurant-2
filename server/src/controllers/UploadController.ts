import { Request, Response, response, NextFunction } from 'express';

export default class UploadController {
    put(request: Request, response: Response) {
        response.statusCode = 403;
        response.end('PUT operation not suported on /imageUpload');
    }

    get(request: Request, response: Response) {
        response.statusCode = 403;
        response.end('GET operation not suported on /imageUpload');
    }

    post(request: Request, response: Response) {
        console.log("Reudisamam");
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.json(request.file);
        //response.end("Reudismam");
    }

    delete(request: Request, response: Response) {
        response.statusCode = 403;
        response.end('DELETE operation not suported on /imageUpload');
    }
}