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
const dbUrl = 'mongodb://localhost:27017/todolistDB';
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

    let listName = _.lowerCase(req.body.list);
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
        Lists.findOne({name: _.lowerCase(listName)}, (err, list) => {
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

    let listName = _.lowerCase(req.params.todoListName);
    
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


app.listen(3000 || process.env.PORT, () => {
    console.log('Listening on port 3000');
});