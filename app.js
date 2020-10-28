const express = require('express'),
bodyParser = require('body-parser');

const date = require(__dirname + "/date.js"),
inList = require(__dirname + "/is-in-list.js");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

let tasks = [],
workList = [];

let day = date.day();

app.get("/", (req, res) => {
    res.render("index", {typeOfToDo:day, tasks:tasks});
});



app.post("/", (req, res) => {
    
    let listType = req.body.list,
    task = req.body.taskInput;

    if(listType === "Work") {
        if(inList(workList,task)){
            res.redirect("/work");
        } else {
            workList.push(task);
            res.redirect("/work")
        }
    } else {

        if (inList(tasks,task)) {
            res.redirect("/");
        } else {
            tasks.push(task);
            res.redirect("/");
        }
    }


});

app.get("/work", (req, res) => {
    res.render("index", {typeOfToDo:"Work", tasks:workList});
});


app.listen(3000 || process.env.PORT , ()=> {
    console.log('Listening on port 3000');
});