const ClientController = require("../controller/client");


const Router = require("express-promise-router");
const router = new Router;

router.get('/:id', ClientController.getClient);
router.post('/', ClientController.postClient);
router.delete('/', ClientController.deleteClient);

module.exports = router;