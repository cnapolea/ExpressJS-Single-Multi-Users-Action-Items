//jshint esversion:6

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import actionItems from './routes/actionItems.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
    
// connection to local db
const DB_URI = process.env.DB_URI; 
const PORT = process.env.PORT || 8080;

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch(err => console.log(err));

mongoose.set('useFindAndModify', false);

app.use('/api', actionItems);
app.get('/', (req, res) => {
    res.send('Welcome to Nizzer\' API.');
});