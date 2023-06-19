const db = require("../db");
const { Category, Subcategory } = require("../models/models");
const ApiError = require("../error/ApiError");

class SubCategoryController {
  async createSubCategory(req, res, next) {
    try {
      const { categoryId, title } = req.body;
      const category = await Category.findByPk(categoryId);
      if (!category) {
        return next(ApiError.badRequest("Category not found"));
      }
      const subcategory = await Subcategory.create({ title, categoryId });
      return res.json({ subcategory });
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
  async getSubCategories(req, res, next) {
    try {
      const subcategories = await Subcategory.findAll();
      return res.json(subcategories);
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
  async getOneSubCategory(req, res, next) {
    try {
      const { id } = req.params;
			if (!id) {
				next(ApiError.badRequest('Id is not defined'))
			}
      const subcategory = await Subcategory.findAll({ where: { id } });
      return res.json(subcategory);
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
  async updateSubCategory(req, res, next) {
    try {
      const { id } = req.params;
      const { title } = req.body;
      if (!id || !title) {
        return next(ApiError.badRequest("Id or title is not defined"));
      }
      const subcategory = await Subcategory.update(
        { title },
        { where: { id } }
      );
      return res.json(subcategory);
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
  async deleteSubCategory(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        return next(ApiError.badRequest("Id is not defined"));
      }
      const subcategory = await Subcategory.destroy({ where: { id } });
      return res.json(subcategory);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new SubCategoryController();
