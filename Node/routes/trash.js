const TrashController = require("../controllers/trash");
const IdMiddleware = require("../middlewares/Identification.js");
const AuthoMiddleware = require("../middlewares/Authorization");
const Validator = require("../middlewares/express-validator/trash")

const Router = require("express-promise-router");
const router = new Router();



/**
 * @swagger
 * /trash:
 *  get:
 *      tags:
 *         - Trash
 *      responses:
 *          200:
 *              $ref: '#/components/responses/TrashFound'
 *          500:
 *              description: Server error
 *
 */

router.get('/:id', TrashController.findOne);

/**
 * @swagger
 * /trash:
 *  get:
 *      tags:
 *         - Trash
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
 *              $ref: '#/components/responses/TrashsFound'
 *          400:
 *              $ref: '#/components/responses/InputError'
 *          500:
 *              description: Server error
 *
 */
router.get('/', TrashController.findAllPaging);

/**
 * @swagger
 * /trash:
 *  patch:
 *      tags:
 *          - Trash
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/TrashToUpdate'
 *      responses:
 *          204:
 *              $ref: '#/components/responses/TrashUpdated'
 *          400:
 *            description: client error
 *            content:
 *              application/json:
 *                schema:
 *                  oneOf:
 *                    - $ref: '#/components/responses/ErrorJWT'
 *                    - $ref: '#/components/responses/InputError'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeManager'
 *          404:
 *              description: Trash doesn't exist
 *          500:
 *              description: Server error
 *
 */
router.patch(
  '/',
  Validator.patchVerification,
  IdMiddleware.identification,
  AuthoMiddleware.mustBeManager,
  TrashController.update
);

/**
 * @swagger
 * /trash:
 *  post:
 *      tags:
 *          - Trash
 *      requestBody:
 *          $ref: '#/components/requestBodies/TrashToAdd'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/TrashAdded'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeManager'
 *          500:
 *              description: Server error
 */
router.post(
  '/',
  Validator.postVerification,
  IdMiddleware.identification,
  AuthoMiddleware.mustBeManager,
  TrashController.create
);


/**
 * @swagger
 * /trash:
 *  delete:
 *      tags:
 *          - Trash
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/TrashToDelete'
 *      responses:
 *          200:
 *              $ref: '#/components/responses/TrashDeleted'
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
  Validator.deleteVerification,
  IdMiddleware.identification,
  AuthoMiddleware.mustBeManager,
  TrashController.destroy
);

/**
 * @swagger
 * /trash/empty:
 *  post:
 *      tags:
 *          - Trash
 *      requestBody:
 *          $ref: '#/components/requestBodies/TrashToEmpty'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/TrashEmptied'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          403:
 *              $ref: '#/components/responses/mustBeManager'
 *          404:
 *              description: Trash not found
 *          500:
 *              description: Server error
 */
router.post(
  '/empty',
  Validator.emptyVerification,
  IdMiddleware.identification,
  AuthoMiddleware.mustBeManager,
  TrashController.empty
);

module.exports = router;