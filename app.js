const express = require('express'),
bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

let date = new Date(),
dateOpts = {
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
},
formatDate = date.toLocaleDateString('en-US', dateOpts);

let tasks = [];


app.get("/", (req, res) => {
    res.render("index", {date:formatDate, tasks:tasks});
});

app.post("/", (req, res) => {
    
    let task = req.body.taskInput;
    
    if (tasks.includes(task)) {
        res.render("index", {date:formatDate, tasks:tasks});
    } else {
        tasks.push(task);
        res.render("index", {date:formatDate, tasks:tasks});
    }

});


app.listen(3000 || process.env.PORT , ()=> {
    console.log('Listening on port 3000');
});