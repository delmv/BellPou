const TrashController = require("../controllers/trash");
const IdMiddleware = require("../middlewares/Identification.js");
const AuthoMiddleware = require("../middlewares/Authorization");
const Validator = require("../middlewares/express-validator/trash")

const Router = require("express-promise-router");
const router = new Router();

const { validationResult } = require("express-validator");
const {ValidationErrorItem} = require("sequelize");

router.get('/:id', TrashController.findOne);

router.get('/', TrashController.findAll);

router.get('/paging', TrashController.findAllPaging);

router.patch(
  '/',
  Validator.patchVerification,
  IdMiddleware.identification,
  AuthoMiddleware.mustBeManager,
  TrashController.update
);
router.post(
  '/',
  Validator.postVerification,
  IdMiddleware.identification,
  AuthoMiddleware.mustBeManager,
  TrashController.create
);
router.post(
    '/scanQR',
    Validator.scanSQVerification,
    IdMiddleware.identification,
    TrashController.addAdvertisement
)
router.delete(
  '/',
  Validator.deleteVerification,
  IdMiddleware.identification,
  AuthoMiddleware.mustBeManager,
  TrashController.destroy
);

router.post(
  '/empty',
  Validator.emptyVerification,
  IdMiddleware.identification,
  AuthoMiddleware.mustBeManager,
  TrashController.empty
);

module.exports = router;
