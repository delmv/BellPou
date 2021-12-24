const ReportController = require('../controllers/report');
const Validator = require("../middlewares/express-validator/trash");
const IdMiddleware = require("../middlewares/Identification.js");


const Router = require("express-promise-router");
const router = new Router();

/**
 * @swagger
 * /report/scanQR:
 *  post:
 *      tags:
 *          - Report
 *      requestBody:
 *          $ref: '#/components/requestBodies/ReportToAdd'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/ReportAdded'
 *          400:
 *              $ref: '#/components/responses/InputError'
 *          500:
 *              description: Server error
 *
 */
router.post('/scanQR',Validator.scanSQVerification,
IdMiddleware.identification,ReportController.create);

module.exports = router;