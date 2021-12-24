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

module.exports.patchVerification = [
    check('id')
        .notEmpty()
        .withMessage("You must enter an id !")
        .isInt({min: 1})
        .withMessage("The id must be an integer greater than 0 !"),

    check('name_fr')
        .optional()
        .isString()
        .withMessage("The name must be a string !"),

    check('name_en')
        .optional()
        .isString()
        .withMessage("The name must be a string !"),

    check('description_fr')
        .optional()
        .isString()
        .withMessage("The description must be a string !"),

    check('description_fr')
        .optional()
        .isString()
        .withMessage("The description must be a string !"),

    check('position_id')
        .optional()
        .isInt({min: 1})
        .withMessage("The position id should be an integer greated than 0 !")
]



module.exports.destroyVerification = [
    check('id')
        .isInt()
        .withMessage('The vendor id must be a number !'),
]