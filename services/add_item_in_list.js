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
                forEach(user.lists, (list) => {
                    try {
                        if (list.name === listName) {
                            list.tasks.push(actionItem);

                            list.save();
                            user.save();

                            res.redirect(`/profile/${urlUsername}/${listName}`);

                        } else {
                            throw new Error('Problem adding new action item');
                        }
                    } catch (error) {
                        res.render('create_action_item', {
                            message: req.flash(error.message)
                        });
                    }
                });
                res.redirect(`/profile/${urlUsername}/`);
            }
        } catch (error) {
            res.render('create_action_item', {
                message: req.flash(error.message)
            });
        }

    });
};