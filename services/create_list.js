const List = require('../models/lists').model;
const User = require('../models/users');

const date = new Date();

module.exports = (list_name, list_description='No description') => {
    let list = new List({
        name: list_name,
        description: list_description,
        date_created: date,
        task: [],
    });

    return list;
}