import express, { Request } from 'express'
import cors from 'cors';

const whitelist = [
    'http://localhost:3333',
    'http://localhost:3776'   
]
var corsOptionsDelegate = (request: Request, callback) => {
    var corsOptions;
    const originHeader = request.header('Origin') as string;
    if (whitelist.indexOf(originHeader) != -1) {
        corsOptions = {origin: true};
    }
    else {
        corsOptions = {origin: false}
    }
    callback(null, corsOptions);
}

const corsOptions = cors();

//export default corsOptions;

export default {
    cors: cors(),
    corsWithOptions: cors(corsOptionsDelegate)
}