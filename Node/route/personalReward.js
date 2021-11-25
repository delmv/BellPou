const PersonalRewardController = require("../controller/personalReward");


const Router = require("express-promise-router");
const router = new Router;

router.get('/:id', PersonalRewardController.getPersonalReward);
router.post('/', PersonalRewardController.postPersonalReward);
router.delete('/', PersonalRewardController.deletePersonalReward);

module.exports = router;