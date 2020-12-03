import express from 'express';


import {getActionLists, createActionList, deleteActionLists, updateActionList, deleteActionList} from '../controllers/actionLists.js';

import {getActionItems, createActionItem, deleteActionItems, updateActionItem, deleteActionItem} from '../controllers/actionItems.js';

const router = express.Router();

router.route('/lists')
    .get(getActionLists)
    .post(createActionList)
    .delete(deleteActionLists);


router.route('/lists/:listId')
    .patch(updateActionList)
    .delete(deleteActionList);

router.route('/lists/:listId/items')
    .get(getActionItems)
    .post(createActionItem)
    .delete(deleteActionItems);

router.route('/lists/:listId/items/:itemId')
    .patch(updateActionItem)
    .delete(deleteActionItem);


export default router;
