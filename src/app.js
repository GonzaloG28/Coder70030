import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { serve, setup } from 'swagger-ui-express';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from "./routes/mocks.router.js"

import dbConnect from "./utils/db.util.js";
import errorHandler from './middleware/errorHandler.mid.js';
import winston from './middleware/winstonLogger.mid.js';
import env from "./utils/env.util.js";
import swaggerJSDoc from 'swagger-jsdoc';
import opts from "./utils/swaggerOpts.util.js"

//servidor
const app = express();
const PORT = env.PORT||3000;
const ready = () => {
    console.log("Server ready on port " + PORT);
    dbConnect();
};

//middlewares servidor
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"))
app.use(cookieParser());

//documentacion
const specs = swaggerJSDoc(opts)
app.use("/api/docs", serve, setup(specs))

//rutas servidor
app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use("/api/mocks", mocksRouter)

//middleware errores servidor
app.use(winston)
app.use(errorHandler)

app.listen(PORT, ready);
