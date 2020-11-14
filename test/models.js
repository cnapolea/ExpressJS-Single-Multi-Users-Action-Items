const expect = require('chai').expect;

const User = require('../models/users');

describe('The user model requirements', () => {
    
    let username = 'test5',
        email = 'test5@example.com',
        password = 'uHw3%^BJfboxY4Dt3rL%';

    it('should throw an error if username is empty', (done) => {

        User.register({
            username: '',
            email: email,
        }, password, (err) => {
    
            if (err) {
                expect(err).to.be.an('error');
            }
        });
        done();
        
    });
    
    it('should throw an error if email is empty', (done) => {

        User.register({
            username: username,
            email: '',
        }, password, (err) => {
    
            if (err) {
                expect(err).to.be.an('error');
            }
        });
        done();

    });
    
    it('should throw an error if password is empty', (done) => {

        User.register({
            username: username,
            email: email,
        }, (err) => {
    
            if (err) {
                expect(err).to.be.an('error');
            }
        });
        done();

    });
});