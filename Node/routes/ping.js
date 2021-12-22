const PingController = require("../controllers/ping");

const Router = require("express-promise-router");
const router = new Router();

/**
 * @swagger
 * /ping:
 *  get:
 *      tags:
 *          - Ping
 *      responses:
 *          200:
 *              description: API reachable
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *                          example: pong
 */


router.get(
    '/',
    PingController.ping
);

module.exports = router;