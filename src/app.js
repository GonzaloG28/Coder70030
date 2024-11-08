import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from "./routes/mocks.router.js"

import dbConnect from "./utils/db.util.js";
import errorHandler from './middleware/errorHandler.mid.js';
import winston from './middleware/winstonLogger.mid.js';
import env from "./utils/env.util.js"


const app = express();
const PORT = env.PORT||8080;
dbConnect();

app.use(express.json());
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use("/api/mocks", mocksRouter)

app.use(winston)
app.use(errorHandler)

app.listen(PORT,()=>console.log(`Listening on ${PORT}`));
