const PositionController = require("../controllers/position");
const IdMiddleware = require("../middlewares/Identification.js");
const AuthoMiddleware = require("../middlewares/Authorization");

const Router = require("express-promise-router");
const router = new Router();

router.get('/', PositionController.findOne);
router.post(
  '/',
  IdMiddleware.identification,
  AuthoMiddleware.mustBeManager,
  PositionController.create
);
router.delete(
  '/',
  IdMiddleware.identification,
  AuthoMiddleware.mustBeManager,
  PositionController.destroy
);
router.get(
  '/all',
  IdMiddleware.identification,
  AuthoMiddleware.mustBeManager,
  PositionController.findAll
);
module.exports = router;
