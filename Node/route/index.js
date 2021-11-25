const ClientRouter = require('./client');
const PositionRouter = require('./position');
const PersonalRewardRouter = require('./personalReward');
const RewardRouter = require('./reward');
const TrashRouter = require('./trash');
const VendorRouter = require('./vendor')

const router = require("express").Router();

router.use("/client", ClientRouter);
router.use("/position", PositionRouter);
router.use("/personalReward", PersonalRewardRouter);
router.use("/reward", RewardRouter);
router.use("/trash", TrashRouter);
router.use("/vendor", VendorRouter);


module.exports = router;