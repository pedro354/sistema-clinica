const cors = require('cors');
const apiRouter = require('./routes/router');
const express = require('express');

const app = express()

app.use(cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
console.log("APP NOVO");
app.use(express.json());
console.log(apiRouter);
app.use('/api', apiRouter)

module.exports = app;