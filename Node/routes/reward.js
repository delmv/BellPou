const RewardController = require("../controllers/reward");
const IdMiddleware = require("../middlewares/Identification.js");
const AuthoMiddleware = require("../middlewares/Authorization");

const Router = require("express-promise-router");
const router = new Router();

router.get('/', RewardController.findOne);
router.get('/all', RewardController.findAll);
router.post(
  '/',
  IdMiddleware.identification,
  AuthoMiddleware.mustBeManager,
  RewardController.create
);
router.delete(
  '/',
  IdMiddleware.identification,
  AuthoMiddleware.mustBeManager,
  RewardController.destroy
);

module.exports = router;
