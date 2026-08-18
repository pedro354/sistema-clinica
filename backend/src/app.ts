import cors from 'cors';
import express from 'express';
import { errorHandler } from "./middlewares/errorHandler.js";
import apiRouter from './routes/router.js';

const app = express()

app.use(cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
console.log("APP NOVO");
app.use(express.json());
app.use('/api', apiRouter)
app.use(errorHandler)
export default app;
