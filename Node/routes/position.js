const PositionController = require("../controllers/position");
const IdMiddleware = require("../middlewares/Identification.js");
const AuthoMiddleware = require("../middlewares/Authorization");

const Router = require("express-promise-router");
const { is } = require("sequelize/dist/lib/operators");
const router = new Router();

router.get('/id:', PositionController.findOne);
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
  '/',
  IdMiddleware.identification,
  AuthoMiddleware.mustBeManager,
  PositionController.findAll
);
module.exports = router;
