const Router = require("express-promise-router");
const router = new Router;
const userController = require('../controllers/user');
const IdMiddleware = require("../middlewares/Identification.js");


router.post('/login', userController.login);
router.get(
    '/',
    IdMiddleware.identification,
    userController.getUserSession);

module.exports = router;