module.exports = (password) => {

    const passwordRequirement = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,20}$/;

    const matchCheck = password.match(passwordRequirement);

    if (matchCheck === null) {
        return {
            invalidPassord: new Error('Password must be 8 to 20 characters long and include at least one number and one special character'),
            status: 'failed', 
        }
    } else if (matchCheck.input === password) {
        return {
            status: 'passed'
        }
    }
}