const express = require('express');
const passport = require('passport');
const _ = require('lodash');

const router = express.Router();


// function that checks if password matches requirements
// const passwordCheck = require('../project_modules/password-check');

const registerUser = require('../services/register');
const createList = require('../services/create_list');
const addList = require('../services/addListToUser');

// User model to be used in the registration and login routes
const User = require('../models/users');

router.route('/')
    .get((req, res) => {
        res.render('index');
    })

router.route('/register')
    .get((req, res) => {
        res.render('register', {
            message: req.flash('Invalid Password')
        });
    })
    .post((req, res) => {
        registerUser(req, res, req.body.username, req.body.email, req.body.password, User);
    })

router.route('/login')
    .get((req, res) => {
        res.render('login', {user:req.user, message: req.flash('error')});
    })
    .post(passport.authenticate('local', {
            failureRedirect: '/login',
            failureFlash: true
        }), (req, res) => {
            res.redirect(`/profile/${req.body.username}`);
        }
    );

router.route('/profile/:username')
    .get((req, res) => {
        if (req.user) {

            let activeUser = req.user;
            res.render('profile', {user: activeUser.username});
        } else {
            res.redirect('/login');
        }

    });

router.route("/profile/:username/new-action-list")
    .get((req, res) => {
        res.render('create_action_list', {user: req.user});
    })
    .post(async (req, res) => {

        const listName = await req.body.action_list_name;
        const listDescription = await req.body.list_description;
        const activeUser = await req.user;

        
        const newList = createList(listName, listDescription);
        newList.save();

        addList(User, activeUser, newList, req, res);
          
    })

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;

// module.exports = (app) => {


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