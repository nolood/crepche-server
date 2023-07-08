const Router = require("express");
const router = new Router();
const basketController = require("../controllers/BasketController");

router.get("/offers", basketController.getItems);

router.post("/", basketController.sendItems);

module.exports = router;
