const ClientController = require("../controllers/client");
const IdMiddleware = require("../middlewares/Identification.js");
const AuthoMiddleware = require("../middlewares/Authorization");

const Router = require("express-promise-router");
const router = new Router();

/**
 * @swagger
 * /client:
 *  get:
 *      tags:
 *         - Client
 *      responses:
 *          200:
 *              $ref: '#/components/responses/ClientsFound'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeManager'
 *          500:
 *              description: Server error
 *
 */
router.get(
  '/',
  IdMiddleware.identification,
  AuthoMiddleware.mustBeManager,
  ClientController.findAll
);

/**
 * @swagger
 * /client:
 *  post:
 *      tags:
 *          - Client
 *      requestBody:
 *          $ref: '#/components/requestBodies/ClientToAdd'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/ClientAdded'
 *          500:
 *              description: Server error
 *
 */

router.post('/', ClientController.create);

/**
 * @swagger
 * /client:
 *  delete:
 *      tags:
 *          - Client
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/ClientToDelete'
 *      responses:
 *          200:
 *              $ref: '#/components/responses/ClientDeleted'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeManager'
 *          500:
 *              description: Server error
 *
 */
router.delete(
  '/',
  IdMiddleware.identification,
  AuthoMiddleware.mustBeManager,
  ClientController.destroy
);

/**
 * @swagger
 * /client:
 *  patch:
 *      tags:
 *          - Client
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/ClientToUpdate'
 *      responses:
 *          204:
 *              $ref: '#/components/responses/ClientUpdated'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          500:
 *              description: Server error
 *
 */
router.patch('/', IdMiddleware.identification, ClientController.update);

module.exports = router;
