import express from 'express';


import {getActionLists, createActionList, deleteActionLists, updateActionList, deleteActionList} from '../controllers/actionLists.js';

import {getActionItems, createActionItem} from '../controllers/actionItems.js';

const router = express.Router();

router.route('/lists')
    .get(getActionLists)
    .post(createActionList)
    .delete(deleteActionLists);


router.route('/lists/:listId')
    .patch(updateActionList)
    .delete(deleteActionList);

router.route('/lists/:listId/tasks')
    .get(getActionItems)
    .post(createActionItem)
    .delete()


export default router;


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