const RewardController = require("../controllers/reward");
const IdMiddleware = require("../middlewares/Identification.js");
const AuthoMiddleware = require("../middlewares/Authorization");

const Router = require("express-promise-router");
const router = new Router();


/**
 * @swagger
 * /reward/{id}:
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
 *          500:
 *              description: Server error
 *
 */
router.get('/:id', RewardController.findOne);
/**
 * @swagger
 * /reward:
 *  get:
 *      tags:
 *         - Reward
 *      responses:
 *          200:
 *              $ref: '#/components/responses/RewardsFound'
 *          500:
 *              description: Server error
 *
 */

router.get('/', RewardController.findAll);

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
 *              $ref: '#/components/responses/ErrorJWT'
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
  IdMiddleware.identification,
  AuthoMiddleware.mustBeManager,
  RewardController.destroy
);

module.exports = router;
