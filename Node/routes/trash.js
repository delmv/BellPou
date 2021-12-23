const TrashController = require("../controllers/trash");
const IdMiddleware = require("../middlewares/Identification.js");
const AuthoMiddleware = require("../middlewares/Authorization");

const Router = require("express-promise-router");
const router = new Router();

/**
 * @swagger
 * /trash:
 *  get:
 *      tags:
 *         - trash
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
 *         - trash
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

router.get('/', TrashController.findAll);

/**
 * @swagger
 * /trash/paging:
 *  get:
 *      tags:
 *         - trash
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


router.get('/paging', TrashController.findAllPaging);

router.patch(
  '/',
  IdMiddleware.identification,
  AuthoMiddleware.mustBeManager,
  TrashController.update
);

/**
 * @swagger
 * /trash:
 *  delete:
 *      tags:
 *          - trash
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
router.post(
  '/',
  IdMiddleware.identification,
  AuthoMiddleware.mustBeManager,
  TrashController.create
);
router.post(
    '/scanQR',
    IdMiddleware.identification,
    TrashController.addAdvertisement
)

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
  IdMiddleware.identification,
  AuthoMiddleware.mustBeManager,
  TrashController.destroy
);

router.post(
  '/empty',
  IdMiddleware.identification,
  AuthoMiddleware.mustBeManager,
  TrashController.empty
);

module.exports = router;
