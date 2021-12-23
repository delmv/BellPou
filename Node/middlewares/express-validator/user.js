const {check} = require('express-validator')

module.exports.loginVerification = [
    check('email')
        .notEmpty()
        .withMessage("You must enter an email !")
        .isString()
        .withMessage("The email must be a string !")
        .isEmail()
        .withMessage("Incorrect e-mail format !"),

    check('password')
        .notEmpty()
        .withMessage("You must enter a password !")
        .isString()
        .withMessage("The password must be a string !")
]