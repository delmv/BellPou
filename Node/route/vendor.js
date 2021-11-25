const VendorController = require("../controller/vendor");


const Router = require("express-promise-router");
const router = new Router;

router.get('/:id', VendorController.getVendor);
router.post('/', VendorController.postVendor);
router.delete('/', VendorController.deleteVendor);

module.exports = router;