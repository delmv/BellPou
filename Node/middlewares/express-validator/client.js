const {check} = require('express-validator')

module.exports.postValidation = [
    check('email')
        .notEmpty()
        .withMessage("You must enter an email !")
        .isEmail()
        .withMessage('You must enter a correct email !'),

    check('first_name')
        .notEmpty()
        .withMessage('You must enter a first name !')
        .isString()
        .withMessage("The first name must me a string"),

    check('last_name')
        .notEmpty().withMessage('You must enter a last name !')
        .isString()
        .withMessage("The last name must be a string"),

    check('birth_date')
        .notEmpty()
        .withMessage("You must enter a birthdate !")
        .matches(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)
        .withMessage('The birthdate needs respect this format : yyyy-mm-dd'),

    check('password')
        .notEmpty()
        .withMessage('You must enter a password !')
        .isString()
        .withMessage("The password must be a string")
]

module.exports.patchValidation = [
    check('email')
        .optional()
        .isEmail()
        .withMessage('You must enter a correct email !'),

    check('birth_date')
        .optional()
        .matches(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)
        .withMessage('The birthdate needs respect this format : yyyy-mm-dd'),

    check('nb_throins')
        .optional()
        .isInt({min: 0})
        .withMessage('The number of throins should be a int equal or greater than 0 !'),

    check('nb_bad_reports')
        .optional()
        .isInt({min: 0})
        .withMessage('The number of reports should be a int equal or greater than 0 !'),

    check('is_banned')
        .optional()
        .isBoolean()
        .withMessage('Is banned should be a boolean !')
]