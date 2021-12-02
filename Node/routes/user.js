const Router = require("express-promise-router");
const router = new Router;
const userController = require('../controllers/user');

router.post('/login', userController.login);

module.exports = router;