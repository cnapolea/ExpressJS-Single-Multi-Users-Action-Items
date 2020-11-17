const express = require('express');
const passport = require('passport');
const _ = require('lodash');

const router = express.Router();


// function that checks if password matches requirements
// const passwordCheck = require('../project_modules/password-check');

const registerUser = require('../services/register');
const createList = require('../services/create_list');
const addList = require('../services/add_list_to_user');
const createItem = require('../services/create_action_item');
const addItem = require('../services/add_item_in_list');

// User model to be used in the registration and login routes
const User = require('../models/users');

const profilePath = '/profile/:username';

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
        res.render('login', {
            user: req.user,
            message: req.flash('error')
        });
    })
    .post(passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true
    }), (req, res) => {
        res.redirect(`/profile/${req.body.username}`);
    });

router.route(profilePath)
    .get((req, res) => {
        if (req.user) {

            let activeUser = req.user;
            res.render('profile', {
                user: activeUser.username
            });
        } else {
            res.redirect('/login');
        }

    });

router.route(profilePath + "/new-action-list")
    .get((req, res) => {
        if (req.user) {

            res.render('create_action_list', {
                user: req.user
            });
        } else {
            res.redirect('/login');
        }
    })
    .post(async (req, res) => {

        const listName = await req.body.action_list_name;
        const listDescription = await req.body.list_description;
        const activeUser = await req.user;


        const newList = createList(listName, listDescription);
        newList.save();
        addList(User, activeUser, newList, req, res);

    });

router.route(profilePath + '/:listName')
    .get((req, res) => {

        if (req.user) {
            res.render('action_list', {
                list: ""
            });
        } else {
            res.redirect('/login');
        }
    });

router.route(profilePath + '/:listName/new-item')
    .get(async (req, res) => {
        if (req.user) {
            const listName = await req.params.listName;
            const user = await req.user;

            res.render('create_action_item', {
                user: user,
                listName: listName
            });
            
        } else {
            res.redirect('/login');
        }
    })
    .post((req, res) => {
        const user = req.user;
        const listName = req.params.listName;
        const itemDescription = req.body.itemDescription;
        const priority = req.body.priority;
        const status = req.body.status;

        const newItem = createItem(itemDescription, priority, status);
        newItem.save();

        addItem(User, user, listName, newItem, req, res);

    })

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;


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