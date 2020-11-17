const ActionItem = require('../models/tasks'.model);
const List = require('../models/lists').model;

const priority = {
    high: '!!!',
    normal:'!!',
    low:'!'
};

const status = ['Not Started', 'In progress', 'Completed'];

module.exports = (description, priority= priority.normal, status = status[0]) => {
    
    /* Creates a new task document in the db. */

    let actionItem = new actionItem({
        description: description,
        priority: priority,
        status: status,
    });

    return actionItem;
}
