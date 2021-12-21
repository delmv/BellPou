const ClientRouter = require("./client");
const PersonalRewardRouter = require("./personalReward");
const RewardRouter = require("./reward");
const TrashRouter = require("./trash");
const VendorRouter = require("./vendor");
const UserRouter = require("./user");

const router = require("express").Router();

router.use("/client", ClientRouter);
router.use("/personalReward", PersonalRewardRouter);
router.use("/reward", RewardRouter);
router.use("/trash", TrashRouter);
router.use("/vendor", VendorRouter);
router.use("/user", UserRouter);

module.exports = router;
