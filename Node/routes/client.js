const ClientController = require("../controllers/client");
const IdMiddleware = require("../middlewares/Identification.js");
const AuthoMiddleware = require("../middlewares/Authorization");
const Validator = require("../middlewares/express-validator/client")

const Router = require("express-promise-router");
const router = new Router();


/**
 * @swagger
 * /client:
 *  get:
 *      tags:
 *         - Client
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: page
 *          schema: 
 *            type: integer
 *          description: The number of items to skip before starting to collect the result set
 *        - in: query
 *          name: size
 *          schema: 
 *            type: integer
 *          description: The numbers of items to return
 *      responses:
 *          200:
 *              $ref: '#/components/responses/ClientsFound'
 *          400:
 *            description: client error
 *            content:
 *              application/json:
 *                schema:
 *                  oneOf:
 *                    - $ref: '#/components/responses/ErrorJWT'
 *                    - $ref: '#/components/responses/Valentin'
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
 *          400:
 *            description: client error
 *            content:
 *              application/json:
 *                schema:
 *                  oneOf:
 *                    - $ref: '#/components/responses/Valentin'
 *                    - $ref: '#/components/responses/Valentin'
 *          500:
 *              description: Server error
 *
 */

router.post('/', Validator.postValidation, ClientController.create);

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
 *            description: client error
 *            content:
 *              application/json:
 *                schema:
 *                  oneOf:
 *                    - $ref: '#/components/responses/ErrorJWT'
 *                    - $ref: '#/components/responses/Valentin'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          500:
 *              description: Server error
 *
 */
 router.patch('/', Validator.patchValidation, IdMiddleware.identification, ClientController.update);


/**
 * @swagger
 * /client:
 *  delete:
 *      tags:
 *          - Client
 *      summary: delete a client
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/ClientToDelete'
 *      responses:
 *          200:
 *              $ref: '#/components/responses/ClientDeleted'
 *          400:
 *            content:
 *            description: client error
 *              application/json:
 *                schema:
 *                  oneOf:
 *                    - $ref: '#/components/responses/ErrorJWT'
 *                    - $ref: '#/components/responses/Valentin'
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


module.exports = router;
