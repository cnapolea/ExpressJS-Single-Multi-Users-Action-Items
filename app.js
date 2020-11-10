require('dotenv').config({
    path: __dirname + '/config/.env'
});

const env = {
    admin_username: process.env.DB_ADMIN_USERNAME,
    admin_password: process.env.DB_ADMIN_PASSWORD,
    local_host_port: process.env.LOCAL_HOST_PORT,
    session_secret: process.env.SESSION_SECRET,
};

const routes = require(__dirname + '/routes/routes.js');

const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');

app.use(session({
    secret: env.session_secret,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ url: 'mongodb://localhost/todolistDB' }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
    }
}))

app.use(passport.initialize());
app.use(passport.session());

// connection to local db
const dbUri = 'mongodb://localhost/todolistDB'
mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.set('useCreateIndex', true);

app.use('/', routes); 

let port = process.env.PORT;

if (port == null || port == "") {
    port = env.local_host_port;
}

app.listen(env.local_host_port, () => {
    console.log('Listening on port 3000');
});

// const dbUri = `mongodb+srv://${env.admin_username}:${env.admin_password}@cluster0.rpn4t.mongodb.net/todolistDB?retryWrites=true&w=majority`;