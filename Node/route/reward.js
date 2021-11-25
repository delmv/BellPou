const RewardController = require("../controller/reward");


const Router = require("express-promise-router");
const router = new Router;

router.get('/:id', RewardController.getReward);
router.post('/', RewardController.postReward);
router.delete('/', RewardController.deleteReward);


module.exports = router;