import path from 'path';
import express from 'express';
import cors from 'cors';
import env from './config/env.config';
import { createRoutes } from './config/routes';
import { crearAccessLog } from './utils/logs';
import morgan from 'morgan';

const app = express();

if (process.env.MODE === 'prod') {
    app.enable('trust proxy')
    const accessLogStream = crearAccessLog()
    app.use(morgan('common', { stream: accessLogStream }))
} else {
    app.use(morgan('dev'))
}

app.set('port', env.serverPort);
app.use(cors());
// parse application/json with a limit of 1mb
app.use(express.json({limit: '1mb'}));
// parse application/x-www-form-urlencoded with a limit of 1mb
app.use(express.urlencoded({ extended: true, limit: '1mb' }))
// serve static files from the public directory
app.use(express.static(path.join(process.cwd(), 'public')))

//Routes
createRoutes(app);

export default app;