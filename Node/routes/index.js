const ClientRouter = require("./client");
const PersonalRewardRouter = require("./personalReward");
const RewardRouter = require("./reward");
const TrashRouter = require("./trash");
const VendorRouter = require("./vendor");
const UserRouter = require("./user");
const PingRouter = require("./ping");
const ReportRouter = require("./report");

const router = require("express").Router();

console.log("test")
router.use("/client", ClientRouter);
console.log("test")
router.use("/personalReward", PersonalRewardRouter);
console.log("test")
router.use("/reward", RewardRouter);
console.log("test")
router.use("/trash", TrashRouter);
router.use("/vendor", VendorRouter);
router.use("/user", UserRouter);
router.use("/ping", PingRouter);
router.use("/report", ReportRouter);

module.exports = router;
