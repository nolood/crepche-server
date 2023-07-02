const Router = require("express");
const router = new Router();
const itemController = require("../controllers/ItemController");

router.post("/", itemController.addItem);
router.post("/all", itemController.addItems);
router.post("/changecategory", itemController.addToSubCategory);
router.get("/", itemController.getAllItems);
router.post("/ids", itemController.getItemsById);
router.get("/:id", itemController.getOneItem);
router.post("/delete", itemController.deleteItems);
router.post("/prom", itemController.addToProm);
router.post("/pop", itemController.addToPop);
router.get("/prom/item", itemController.getAllPromItems);
router.get("/pop/item", itemController.getAllPopItems);

module.exports = router;
