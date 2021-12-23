const ReportController = require('../controllers/report');


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
router.post('/', ReportController.create);
