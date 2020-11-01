const express = require('express'),
bodyParser = require('body-parser'),
mongoose = require('mongoose');


const date = require(__dirname + "/date.js"),
app = express();


// express & body parser set up
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// connection to db
const dbUrl = 'mongodb://localhost:27017/todolistDB';
mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

//to-do schema
const Items = mongoose.Schema({
    description: {
        type: String,
        require: true,
        unique: true,
        maxlength: 70,
    }
});

// create model
const Item = new mongoose.model("Item", Items);


let day = date.day();

app.get("/", (req, res) => {

    // get tasks array
    Item.find({}, (err, tasks) => {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {typeOfToDo:day, tasks:tasks});
        }
    });
});


app.post("/", (req, res) => {
    
    let listType = req.body.list,
    task = new Item({
        description: req.body.taskInput
    });

    task.save();

    res.redirect("/");


});

app.post("/delete", (req, res) => {
    let checkedItemId = req.body.checkbox;
    Item.findByIdAndRemove(checkedItemId, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Successfully deleted task");
            res.redirect("/");
        }
    });
});


app.get("/work", (req, res) => {
    res.render("index", {typeOfToDo:"Work", tasks:workList});
});


app.listen(3000 || process.env.PORT , ()=> {
    console.log('Listening on port 3000');
});