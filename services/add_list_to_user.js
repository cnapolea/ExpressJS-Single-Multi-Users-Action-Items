const _ = require('lodash');

module.exports = (userModel, user, newList, req, res) => {
    /* Adds the newly created list to the logged user. */

    const urlUsername = _.lowerCase(_.replace(user.username, ' ', '-'));

    userModel.findOne({
        _id: user._id
    }, (err, user) => {
        try {
            if (err) {
                throw new Error(err.message);
            } else {
                user.lists.push(newList);
                user.save();
                res.redirect(`/profile/${urlUsername}`);
            }
        } catch (error) {
            res.render('create_action_list', {
                message: req.flash(error.message)
            });
        }

    });
};