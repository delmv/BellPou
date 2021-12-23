const {check} = require('express-validator')

module.exports.patchVerification = [
    check('id')
        .notEmpty()
        .withMessage("You must enter an ID !")
        .isInt()
        .withMessage("The ID must be an number !"),

    check('is_full')
        .optional()
        .isBoolean()
        .withMessage("Is Full must be a Boolean !"),

    check('nb_alerts')
        .optional()
        .isInt({min: 0})
        .withMessage("The number of alerts must be a number equal of greater than 0!"),

    check('last_empty')
        .optional()
        .matches(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)
        .withMessage('The empty needs respect this format : yyyy-mm-dd !'),

    check('qr_value')
        .optional()
        .isString()
        .withMessage("The QR Code value must be a string !"),

    check('position_id')
        .optional()
        .isInt()
        .withMessage("The position ID must be a number")
]

module.exports.postVerification = [
    check('position')
        .notEmpty()
        .withMessage("You must enter a position")
]

module.exports.deleteVerification = [
    check('id')
        .notEmpty()
        .withMessage("You must enter the trash id !")
        .isInt()
        .withMessage("The trash id must be a number !")
]

module.exports.scanSQVerification = [
    check('qr_code')
        .notEmpty()
        .withMessage("You must enter the QR Code Value !")
        .isString()
        .withMessage("The QR Code value must be a string !"),
]

module.exports.emptyVerification = [
    check('were_real_reports')
        .notEmpty()
        .withMessage("You must specify if it was a real report or not !")
        .isBoolean()
        .withMessage("The report must be a boolean !"),
    check('trash_id')
        .notEmpty()
        .withMessage("You must enter the trash ID !")
        .isInt()
        .withMessage("The trash ID must be a number !")
]