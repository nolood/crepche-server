const Router = require("express");
const router = new Router();
const basketController = require("../controllers/BasketController");

router.post("/", basketController.createBasket);
router.get("/:userId", basketController.getBasketByUserId);
router.put("/:userId", basketController.updateBasketByUserId);
router.delete("/:userId", basketController.deleteBasketByUserId);

module.exports = router;
