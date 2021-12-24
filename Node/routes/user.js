const Router = require("express-promise-router");
const router = new Router;
const userController = require('../controllers/user');
const IdMiddleware = require("../middlewares/Identification.js");
const Validator = require("../middlewares/express-validator/user")

/**
 * @swagger
 * /user/login:
 *  post:
 *      tags:
 *          - User
 *      requestBody:
 *          $ref: '#/components/requestBodies/Login'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/Logged'
 *          404:
 *              description: The user is not registered
 *          500:
 *              description: Server error
 */
router.post('/login',
    Validator.loginVerification,
    userController.login);

/**
 * @swagger
 * /user:
 *  get:
 *      tags:
 *         - User
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          401:
 *              description: No session is available
 *          200:
 *            $ref: '#/components/responses/UserFound'
 *          500:
 *              description: Server error
 *
 */
router.get(
    '/',
    IdMiddleware.identification,
    userController.getUserSession);

module.exports = router;