const ReportController = require('../controllers/report');
const Validator = require("../middlewares/express-validator/trash");
const IdMiddleware = require("../middlewares/Identification.js");


const Router = require("express-promise-router");
const router = new Router();

/**
 * @swagger
 * /report:
 *  post:
 *      tags:
 *          - Report
 *      requestBody:
 *          $ref: '#/components/requestBodies/ReportToAdd'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/ReportAdded'
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
router.post('/scanQR',Validator.scanSQVerification,
IdMiddleware.identification,ReportController.create);

module.exports = router;