const express = require('express');
const passport = require('passport');
const router = express.Router();

// User model to be used in the registration and login routes
const User = require('../models/users');

router.route('/')
    .get((req, res) => {
        res.render('index');
    })

router.route('/register')
    .get((req, res) => {
        
        res.render('register');
    })
    .post((req, res) => {
        const passwordRequirement = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,20}$/;

        const password = req.body.password;
        const matchCheck = password.match(passwordRequirement);
        

        res.redirect('/');
    })
    
router.route('/login')
    .get((req, res) => {
        res.render('login');
    })
    .post((res, req) => {
        res.redirect('/profile/:username');
    })

router.route('/profile/:username')
    .get((req, res) => {
        let username = req.params.username;
        res.render('profile');
    })

module.exports = router;

// module.exports = (app) => {

//     app.get("/", (req, res) => {
//         res.send('Hello')
//         // res.render('index');
//     });

    // app.route('/register')
    //     .get((req, res) => {
    //         res.render('register')
    //     })
    //     .post((req, res) => {

    //     });

    // app.post("/", (req, res) => {

    //     let listName = _.replace(_.lowerCase(req.body.list), " ", "-");
    //     let task = new Item({
    //         description: req.body.taskInput,
    //     });

    //     if (listName === "home") {
    //         task.save();
    //         res.redirect("/");

    //     } else {
    //         Lists.findOne({
    //             name: listName
    //         }, (err, list) => {
    //             if (err) {
    //                 console.log(err);
    //             } else {
    //                 list.lists.push(task);
    //                 list.save();
    //                 res.redirect(`/${listName}`);
    //             }
    //         });
    //     }


    // });

    // app.post("/delete/:listName", (req, res) => {
    //     let checkedItemId = req.body.checkbox;
    //     let listName = req.params.listName;

    //     console.log(listName);

    //     if (listName === "Home") {

    //         Item.findByIdAndRemove(checkedItemId, (err) => {
    //             if (err) {
    //                 console.log(err);
    //             } else {
    //                 console.log("Successfully deleted task in root route");
    //                 res.redirect("/");
    //             }
    //         });
    //     } else {
    //         Lists.findOne({
    //             name: _.replace(_.lowerCase(listName), " ", "-")
    //         }, (err, list) => {
    //             if (err) {
    //                 console.log(err);
    //             } else {

    //                 list.lists.pull({
    //                     _id: checkedItemId
    //                 });
    //                 list.save();
    //                 res.redirect(`/${listName}`);
    //             }
    //         });
    //     }

    // });


    // app.get("/:todoListName", (req, res) => {

    //     let listName = _.replace(_.lowerCase(req.params.todoListName), " ", "-");

    //     Lists.findOne({
    //         name: listName
    //     }, (err, list) => {
    //         if (!err) {
    //             if (!list) {

    //                 let newList = new Lists({
    //                     name: listName,
    //                     lists: [],
    //                 });

    //                 newList.save();
    //                 res.redirect(`/${listName}`);

    //             } else {
    //                 res.render("index", {
    //                     nameOfList: _.startCase(list.name),
    //                     tasks: list.lists,
    //                 });
    //             }
    //         }

    //     });

    // });


// };