import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import actionItems from './routes/actionItems.js';

const app = express();


app.use(cors());
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000")});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
    
// connection to local db
const dbUri = 'mongodb://localhost/todolistDB' || process.env.REMOTE_DB_URI; 
const PORT = process.env.PORT || 5000;

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch(err => console.log(err));

mongoose.set('useFindAndModify', false);

app.use('/api', actionItems);
app.get('/', (req, res) => {
    res.json({message:'You reached the API.'});
});

// const dbUri = `mongodb+srv://${env.admin_username}:${env.admin_password}@cluster0.rpn4t.mongodb.net/todolistDB?retryWrites=true&w=majority`;