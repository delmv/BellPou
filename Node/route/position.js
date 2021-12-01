const PositionController = require("../controller/position");

const Router = require("express-promise-router");
const router = new Router;

router.get('/:id', PositionController.getPosition);
router.get('/', PositionController.getPositions);
router.post('/', PositionController.postPosition);
router.delete('/', PositionController.deletePosition);

module.exports = router;