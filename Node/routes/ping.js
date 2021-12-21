const PingController = require("../controllers/ping");

const Router = require("express-promise-router");
const router = new Router();

router.get(
    '/',
    PingController.ping
);

module.exports = router;