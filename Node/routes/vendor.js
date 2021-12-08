const VendorController = require("../controllers/vendor");
const IdMiddleware = require("../middlewares/Identification.js");
const AuthoMiddleware = require("../middlewares/Authorization");

const Router = require("express-promise-router");
const router = new Router();

router.get('/id:', VendorController.findOne);
router.get('/', VendorController.findAll);
router.post(
  '/',
  IdMiddleware.identification,
  AuthoMiddleware.mustBeManager,
  VendorController.create
);
router.delete(
  '/',
  IdMiddleware.identification,
  AuthoMiddleware.mustBeManager,
  VendorController.destroy
);

module.exports = router;