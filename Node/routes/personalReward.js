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
 *              $ref: '#/components/responses/PersonalRewardsFound'
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
 *          204:
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
