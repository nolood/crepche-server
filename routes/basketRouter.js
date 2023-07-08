const Router = require("express");
const router = new Router();
const basketController = require("../controllers/BasketController");

router.post("/", basketController.sendItems);
router.get("/", basketController.getItems);

module.exports = router;
