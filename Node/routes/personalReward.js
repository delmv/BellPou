const PersonalRewardController = require("../controllers/personalReward");
const IdMiddleware = require("../middlewares/Identification.js");
const AuthoMiddleware = require("../middlewares/Authorization");

const Router = require("express-promise-router");
const router = new Router();

router.get(
  '/:id',
  IdMiddleware.identification,
  PersonalRewardController.findOne
);
router.get(
  '/',
  IdMiddleware.identification,
  PersonalRewardController.findAll
);
router.post('/', IdMiddleware.identification, PersonalRewardController.create);
router.delete(
  '/',
  IdMiddleware.identification,
  PersonalRewardController.destroy
);

module.exports = router;
