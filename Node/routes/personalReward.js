const PersonalRewardController = require("../controllers/personalReward");
const IdMiddleware = require("../middlewares/Identification.js");
const AuthoMiddleware = require("../middlewares/Authorization");

const Router = require("express-promise-router");
const router = new Router();


/**
 * @swagger
 * /personalReward:
 *  get:
 *      tags:
 *         - PersonalReward
 *      responses:
 *          200:
 *              $ref: '#/components/responses/PersonalRewardsFound'
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
  PersonalRewardController.findAll
);

/**
 * @swagger
 * /personalReward:
 *  post:
 *      tags:
 *          - PersonalReward
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/PersonalRewardToAdd'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/PersonalRewardAdded'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT' 
 *          500:
 *              description: Server error
 *
 */
router.post('/', IdMiddleware.identification, PersonalRewardController.create);

/**
 * @swagger
 * /personalReward:
 *  delete:
 *      tags:
 *          - PersonalReward
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          $ref: '#/components/requestBodies/PersonalRewardToDelete'
 *      responses:
 *          200:
 *              $ref: '#/components/responses/PersonalRewardDeleted'
 *          400:
 *              $ref: '#/components/responses/ErrorJWT'
 *          401:
 *              $ref: '#/components/responses/MissingJWT'
 *          500:
 *              description: Server error
 *
 */
router.delete(
  '/',
  IdMiddleware.identification,
  PersonalRewardController.destroy
);

module.exports = router;
