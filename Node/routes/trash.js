const TrashController = require("../controllers/trash");
const IdMiddleware = require("../middlewares/Identification.js");
const AuthoMiddleware = require("../middlewares/Authorization");

const Router = require("express-promise-router");
const router = new Router();

router.get('/:id', TrashController.findOne);
router.get('/', TrashController.findAll);
router.patch(
  '/',
  IdMiddleware.identification,
  AuthoMiddleware.mustBeManager,
  TrashController.update
);
router.post(
  '/',
  IdMiddleware.identification,
  AuthoMiddleware.mustBeManager,
  TrashController.create
);
router.delete(
  '/',
  IdMiddleware.identification,
  AuthoMiddleware.mustBeManager,
  TrashController.destroy
);

module.exports = router;
