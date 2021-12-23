const {check} = require('express-validator')

module.exports.postVerification = [
    check('reward_id')
        .notEmpty()
        .withMessage("You must enter an id !")
        .isInt()
        .withMessage('The reward id must be a number !'),
]

module.exports.destroyVerification = [
    check('id')
        .notEmpty()
        .withMessage("You must enter an id !")
        .isInt()
        .withMessage('The reward id must be a number !'),
]