const RewardController = require("../controllers/reward");
const IdMiddleware = require("../middlewares/Identification.js");
const AuthoMiddleware = require("../middlewares/Authorization");
const Validator = require("../middlewares/express-validator/reward")

const Router = require("express-promise-router");
const router = new Router();


/**
 * @swagger
 * /reward/{id}:
 *  get:
 *      tags:
 *         - Reward
 *      parameters:
 *          - name: id
 *            description: ID of a reward
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              $ref: '#/components/responses/RewardFound'
 *          404:
 *              description: Reward not found
 *          500:
 *              description: Server Error
 *
 */
router.get('/:id', RewardController.findOne);

/**
 * @swagger
 * /reward/:
 *  get:
 *      tags:
 *         - Reward
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
 *              $ref: '#/components/responses/RewardsFound'
 *          400:
 *              $ref: '#/components/responses/InputError'
 *          500:
 *              description: Server error
 *
 */

router.get('/', RewardController.findAllPaging);

/**
 * @swagger
 * /reward:
 *  post:
 *      tags:
 *          - Reward
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/RewardToAdd'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/RewardAdded'
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
 *          500:
 *              description: Server error
 *
 */

router.post(
  '/',
  Validator.postValidation,
  IdMiddleware.identification,
  AuthoMiddleware.mustBeManager,
  RewardController.create
);

/**
 * @swagger
 * /reward:
 *  delete:
 *      tags:
 *          - Reward
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/RewardToDelete'
 *      responses:
 *          200:
 *              $ref: '#/components/responses/RewardDeleted'
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
  Validator.deleteValidation,
  IdMiddleware.identification,
  AuthoMiddleware.mustBeManager,
  RewardController.destroy
);

/**
 * @swagger
 * /reward:
 *  patch:
 *      tags:
 *          - Reward
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/RewardToUpdate'
 *      responses:
 *          204:
 *              $ref: '#/components/responses/RewardUpdated'
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
 *              description: Reward doesn't exist
 *          500:
 *              description: Server error
 */
router.patch(
  '/',
  Validator.patchValidation,
  IdMiddleware.identification,
  AuthoMiddleware.mustBeManager,
  RewardController.update
);
module.exports = router;
