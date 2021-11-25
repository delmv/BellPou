const TrashController = require("../controller/trash");


const Router = require("express-promise-router");
const router = new Router;

router.get('/:id', TrashController.getTrash);
router.post('/', TrashController.postTrash);
router.delete('/', TrashController.deleteTrash);

module.exports = router;