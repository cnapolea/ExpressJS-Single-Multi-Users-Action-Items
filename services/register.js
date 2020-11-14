const _ = require('lodash');

// function that checks if password matches requirements
const passwordCheck = require('../project_modules/password-check');

module.exports = async (req, res, unformattedUsername, email, password, userModel) => {

    let username = await _.replace(_.lowerCase(unformattedUsername), ' ', '-');
    let passwordIsValid = await passwordCheck(password);

    if (passwordIsValid.status === 'failed') {
        req.flash('invalidPassword', passwordIsValid.invalidPassord.message)
        res.redirect('/register');
    } else {

        userModel.register({
            username: username,
            email: email,
        }, password, async (err) => {
            try {
                if (err) {
                    if (err.name === 'MongoError') {
                        throw new Error('Email already exists.');
                    } else {
                        throw new Error(err.name);
                    }

                } else {
                    console.log(`user ${username} registered!`)
                    res.redirect(`/profile/${username}`);
                }
            } catch (error) {
                req.flash('registrationError', error.message);
                res.redirect('/register');
            }
        });

    }
};