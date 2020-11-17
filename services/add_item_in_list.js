const _ = require('lodash');

module.exports = (userModel, user, listName, actionItem, req, res) => {
    /* Adds the newly created item to the list. */

    const urlUsername = _.lowerCase(_.replace(user.username, ' ', '-'));

    userModel.findOne({
        _id: user._id
    }, (err, user) => {
        try {
            if (err) {
                throw new Error(err.message);
            } else {
                let found = false;
                
                user.lists.forEach(list => {
                        
                    if (_.lowerCase(list.name) === _.lowerCase(listName)) {

                        list.tasks.push(actionItem);
                        // list.save();
                        user.save(err => {
                            if (err){
                                throw new Error(err.message);
                            } else {
                                res.redirect(`/profile/${urlUsername}/${listName}`);
                            }
                        });
                    }                     
                });
            }
        } catch (error) {
            res.render('create_action_item', {
                message: req.flash(error.message),
                user: user,
                listName: listName,
            });
            console.log('here 3')
        }

    });
};