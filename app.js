const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    _ = require('lodash');
const {
    startCase
} = require('lodash');


const date = require(__dirname + "/date.js"),
    app = express();


// express & body parser set up
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// connection to db
const dbUrl = 'mongodb+srv://admin-cristiano:eQ13Pmh!ec@cluster0.rpn4t.mongodb.net/todolistDB?retryWrites=true&w=majority';
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

//to-do schema
const itemsSchema = mongoose.Schema({
    description: {
        type: String,
        maxlength: 70,
    },

});

const listSchema = mongoose.Schema({
    name: String,
    lists: [itemsSchema],
});

// create model
const Item = new mongoose.model("Item", itemsSchema);
const Lists = new mongoose.model("List", listSchema);

let day = date.day();

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
        Lists.findOne({name: listName}, (err, list) => {
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

    if(listName === "Home") {

        Item.findByIdAndRemove(checkedItemId, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Successfully deleted task in root route");
                res.redirect("/");
            }
        });
    } else {
        Lists.findOne({name: _.replace(_.lowerCase(listName)," ", "-")}, (err, list) => {
            if (err) {
                console.log(err);
            } else {
                
                list.lists.pull({_id: checkedItemId});
                list.save();
                res.redirect(`/${listName}`);
            }
        });
    }

});


app.get("/:todoListName", (req, res) => {

    let listName = _.replace(_.lowerCase(req.params.todoListName), " ", "-");
    
    Lists.findOne({name:listName}, (err, list) => {
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
  port = 3000;
}
app.listen(port);

app.listen(port, () => {
    console.log('Listening on port 3000');
});