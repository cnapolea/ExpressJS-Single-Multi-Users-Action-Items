const _ = require('lodash');

// function that checks if password matches requirements
const passwordCheck = require('../project_modules/password-check');

module.exports = async (req, res, unformattedUsername, password, userModel) => {
    
    let username = await _.replace(_.lowerCase(unformattedUsername), ' ', '-');
    let passwordIsValid = await passwordCheck(password);

    if (passwordIsValid.status === 'failed') {
        req.flash('invalidPassword', passwordIsValid.invalidPassord.message)
        res.redirect('/register');
    } else {
    
        try {
            userModel.register({
                username: username
            }, password, function (err) {
                if (err) {
                    req.flash('usernameTaken', err.message);
                    res.redirect('/register');    
                } else {
                    console.log(`user ${username} registered!`)
                    res.redirect(`/profile/${username}`);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
};


