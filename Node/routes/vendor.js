const VendorController = require("../controllers/vendor");
const IdMiddleware = require("../middlewares/Identification.js");
const AuthoMiddleware = require("../middlewares/Authorization");
const Validator = require("../middlewares/express-validator/vendor")

const Router = require("express-promise-router");
const router = new Router();

/**
 * @swagger
 * /vendor:
 *  get:
 *      tags:
 *         - Vendor
 *      responses:
 *          200:
 *              $ref: '#/components/responses/VendorFound'
 *          500:
 *              description: Server error
 *
 */
router.get('/id:', VendorController.findOne);

/**
 * @swagger
 * /vendor:
 *  get:
 *      tags:
 *         - Vendor
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
 *              $ref: '#/components/responses/VendorsFound'
 *          400:
 *              $ref: '#/components/responses/InputError'
 *          500:
 *              description: Server error
 *
 */

router.get('/', VendorController.findAll);

/**
 * @swagger
 * /vendor:
 *  post:
 *      tags:
 *          - Vendor
 *      requestBody:
 *          $ref: '#/components/requestBodies/VendorToAdd'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/VendorAdded'
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
  VendorController.create
);

/**
 * @swagger
 * /vendor:
 *  delete:
 *      tags:
 *          - Vendor
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/VendorToDelete'
 *      responses:
 *          200:
 *              $ref: '#/components/responses/VendorDeleted'
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
  Validator.destroyVerification,
  IdMiddleware.identification,
  AuthoMiddleware.mustBeManager,
  VendorController.destroy
);

/**
 * @swagger
 * /vendor:
 *  patch:
 *      tags:
 *          - Vendor
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/VendorToUpdate'
 *      responses:
 *          204:
 *              $ref: '#/components/responses/VendorUpdated'
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
 *              description: Vendor doesn't exist
 *          500:
 *              description: Server error
 *
 */
router.patch(
  '/',
  Validator.patchVerification,
  IdMiddleware.identification,
  AuthoMiddleware.mustBeManager,
  VendorController.update
);
module.exports = router;
