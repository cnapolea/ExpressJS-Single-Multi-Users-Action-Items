const expect = require('chai').expect;

const User = require('../models/users');


describe('The user model requirements', () => {
    let testUser = 'test-user',
        testEmail = 'test@email.com';

    let username = 'test5',
        email = 'test5@example.com',
        password = 'uHw3%^BJfboxY4Dt3rL%';

    it('expects an error if username is empty', (done) => {
        const newUser = new User({
            username: '',
            email: email,
            password: password
        });

        newUser.save(err => {
            if (err) {
                expect(err).to.be.an('error');
            }
        });
        done();
    });



    it('expects an error if email is empty', (done) => {
        const newUser = new User({
            username: username,
            email: '',
            password: password,
        });

        newUser.save(err => {
            if (err) {
                expect(err).to.be.an('error');
            }
        });
        done();

    });


});