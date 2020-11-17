const ActionItem = require('../models/tasks').model;
const List = require('../models/lists').model;

const priority = {
    high: '!!!',
    normal:'!!',
    low:'!'
};

const statusList = ['Not Started', 'In Progress', 'Completed'];

module.exports = (description, priority = priority.normal, status = statusList[0]) => {
    
    /* Creates a new task document in the db. */

    let actionItem = new ActionItem({
        description: description,
        priority: priority,
        status: status,
    });

    return actionItem;
}
