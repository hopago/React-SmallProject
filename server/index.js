import { port } from './config/config.js';

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import postRoutes from './routes/posts.js';

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URI)
    .then(() => app.listen(port, console.log("Server running on port:8000")))
    .catch(err => console.error(err.message));

app.use(express.json());
app.use(cors());
app.use(bodyParser.json({limit: '50mb'})); 
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use('/posts', postRoutes);