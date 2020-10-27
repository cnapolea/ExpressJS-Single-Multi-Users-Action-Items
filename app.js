const express = require('express'),
bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');


app.get("/", (req, res) => {
    res.render("index", {});
});


app.listen(3000 || process.env.PORT , ()=> {
    console.log('Listening on port 3000');
});