const Router = require("express");
const router = new Router();
const subCategoryController = require("../controllers/SubCategoryController");

router.post("/", subCategoryController.createSubCategory);
router.get("/", subCategoryController.getAllSubCategories);
router.get("/:id", subCategoryController.getSubcategoriesById);
router.put("/:id", subCategoryController.updateSubCategory);
router.delete("/:id", subCategoryController.deleteSubCategory);

module.exports = router;
