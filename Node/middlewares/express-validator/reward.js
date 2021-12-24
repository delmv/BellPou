const {check} = require('express-validator')

module.exports.postValidation = [
    check('reward_name_fr')
        .not()
        .isEmpty()
        .withMessage("The name should not be empty !")
        .isString()
        .withMessage("The name should be a string !"),

    check('reward_name_en')
        .not()
        .isEmpty()
        .withMessage("The name should not be empty !")
        .isString()
        .withMessage("The name should be a string !"),

    check('reward_description_fr')
        .not()
        .isEmpty()
        .withMessage("The description should not be empty !")
        .isString()
        .withMessage("The description should be a string !"),

    check('reward_description_en')
        .not()
        .isEmpty()
        .withMessage("The description should not be empty !")
        .isString()
        .withMessage("The description should be a string !"),

    check('vendor_name_fr')
        .optional()
        .isString()
        .withMessage("The name should be a string !"),

    check('vendor_name_en')
        .optional()
        .isString()
        .withMessage("The name should be a string !"),

    check('vendor_description_fr')
        .optional()
        .isString()
        .withMessage("The description should be a string !"),

    check('vendor_description_en')
        .optional()
        .isString()
        .withMessage("The description should be a string !"),

    check('real_cost')
        .not()
        .isEmpty()
        .withMessage("The real cost should not be empty !")
        .isDecimal()
        .withMessage("The real cost should be a decimal number !"),

    check('throins_cost')
        .not()
        .isEmpty()
        .withMessage("The cost should should not be empty !")
        .isInt()
        .withMessage("The cost should be a number")
]

module.exports.patchValidation = [
    check('id')
        .notEmpty()
        .withMessage("You must enter an id")
        .isInt()
        .withMessage("The id should be a number !"),

    check('name_fr')
        .optional()
        .isString()
        .withMessage("The name should be a string !"),

    check('name_en')
        .optional()
        .isString()
        .withMessage("The name should be a string !"),

    check('description_fr')
        .optional()
        .isString()
        .withMessage("The description should be a string !"),

    check('description_en')
        .optional()
        .isString()
        .withMessage("The description should be a string !"),

    check('real_cost')
        .optional()
        .isDecimal()
        .withMessage("The real cost should be a decimal number !"),

    check('throins_cost')
        .optional()
        .isInt()
        .withMessage("The cost should be a number")
]

module.exports.deleteValidation = [
    check('id')
        .not()
        .isEmpty()
        .withMessage("You must enter the id of the reward you want to destroy !")
        .isInt()
        .withMessage("The id should be a number !")
]