const VendorController = require("../controllers/vendor");
const IdMiddleware = require("../middlewares/Identification.js");
const AuthoMiddleware = require("../middlewares/Authorization");
const Validator = require("../middlewares/express-validator/vendor")

const Router = require("express-promise-router");
const router = new Router();

router.get('/id:', VendorController.findOne);

router.get('/', VendorController.findAll);

router.post(
  '/',
  Validator.postVerification,
  IdMiddleware.identification,
  AuthoMiddleware.mustBeManager,
  VendorController.create
);

router.delete(
  '/',
  Validator.destroyVerification,
  IdMiddleware.identification,
  AuthoMiddleware.mustBeManager,
  VendorController.destroy
);

module.exports = router;
