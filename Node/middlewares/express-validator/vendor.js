const {check} = require('express-validator')

module.exports.postVerification = [
    check('name_fr')
        .notEmpty()
        .withMessage("You must enter a name !")
        .isString()
        .withMessage("The name must be a string !"),

    check('name_en')
        .notEmpty()
        .withMessage("You must enter a name !")
        .isString()
        .withMessage("The name must be a string !"),

    check('description_fr')
        .notEmpty()
        .withMessage("You must enter a description !")
        .isString()
        .withMessage("The description must be a string !"),

    check('description_fr')
        .notEmpty()
        .withMessage("You must enter a description !")
        .isString()
        .withMessage("The description must be a string !"),
]

module.exports.destroyVerification = [
    check('id')
        .isInt()
        .withMessage('The vendor id must be a number !'),
]