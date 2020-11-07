require('dotenv').config({
    path: __dirname + '/config'
});

const env = {
    admin_username: process.env.DB_ADMIN_USERNAME,
    admin_password: process.env.DB_ADMIN_PASSWORD,
    local_host_port: process.env.LOCAL_HOST_PORT,
    session_secret: process.env.SESSION_SECRET,
};

const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js");

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
    store: new MongoStore({ db: mongoose.connection }),
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

app.get("/", (req, res) => {

    // get tasks array
    Item.find({}, (err, tasks) => {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {
                nameOfList: "Home",
                tasks: tasks
            });
        }
    });
});


app.post("/", (req, res) => {

    let listName = _.replace(_.lowerCase(req.body.list), " ", "-");
    let task = new Item({
        description: req.body.taskInput,
    });

    if (listName === "home") {
        task.save();
        res.redirect("/");

    } else {
        Lists.findOne({
            name: listName
        }, (err, list) => {
            if (err) {
                console.log(err);
            } else {
                list.lists.push(task);
                list.save();
                res.redirect(`/${listName}`);
            }
        });
    }


});

app.post("/delete/:listName", (req, res) => {
    let checkedItemId = req.body.checkbox;
    let listName = req.params.listName;

    console.log(listName);

    if (listName === "Home") {

        Item.findByIdAndRemove(checkedItemId, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Successfully deleted task in root route");
                res.redirect("/");
            }
        });
    } else {
        Lists.findOne({
            name: _.replace(_.lowerCase(listName), " ", "-")
        }, (err, list) => {
            if (err) {
                console.log(err);
            } else {

                list.lists.pull({
                    _id: checkedItemId
                });
                list.save();
                res.redirect(`/${listName}`);
            }
        });
    }

});


app.get("/:todoListName", (req, res) => {

    let listName = _.replace(_.lowerCase(req.params.todoListName), " ", "-");

    Lists.findOne({
        name: listName
    }, (err, list) => {
        if (!err) {
            if (!list) {

                let newList = new Lists({
                    name: listName,
                    lists: [],
                });

                newList.save();
                res.redirect(`/${listName}`);

            } else {
                res.render("index", {
                    nameOfList: _.startCase(list.name),
                    tasks: list.lists,
                });
            }
        }

    });

});


let port = process.env.PORT;
if (port == null || port == "") {
    port = env.local_host_port;
}

app.listen(port, () => {
    console.log('Listening on port 3000');
});

// const dbUri = `mongodb+srv://${env.admin_username}:${env.admin_password}@cluster0.rpn4t.mongodb.net/todolistDB?retryWrites=true&w=majority`;