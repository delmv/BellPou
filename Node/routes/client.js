const ClientController = require("../controllers/client");
const IdMiddleware = require("../middlewares/Identification.js");
const AuthoMiddleware = require("../middlewares/Authorization");

const Router = require("express-promise-router");
const router = new Router();

router.get(
  '/all',
  IdMiddleware.identification,
  AuthoMiddleware.mustBeManager,
  ClientController.findAll
);
router.post('/', ClientController.create);
router.delete(
  '/',
  IdMiddleware.identification,
  AuthoMiddleware.mustBeManager,
  ClientController.destroy
);
router.patch('/', IdMiddleware.identification, ClientController.update);

module.exports = router;
