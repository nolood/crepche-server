const db = require("../db");
const { Category, Subcategory } = require("../models/models");
const ApiError = require("../error/ApiError");

class SubCategoryController {
  async createSubCategory(req, res) {
    try {
      const { categoryId, title } = req.query;
      const category = await Category.findByPk(categoryId);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      const subcategory = await Subcategory.create({ title, categoryId });
      return res.json({ subcategory });
    } catch (e) {
      return res.status(404).json({ message: e.message });
    }
  }
  async getAllSubCategories(req, res) {
    try {
      const subcategories = await Subcategory.findAll();
      return res.json(subcategories);
    } catch (e) {
      return res.status(404).json({ message: e.message });
    }
  }
  async getSubcategoriesById(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(404).json({ message: "Id is not defined" });
      }
      const subcategories = await Subcategory.findAll({
        where: { categoryId: id },
      });
      return res.json(subcategories);
    } catch (e) {
      return res.status(404).json({ message: e.message });
    }
  }
  async updateSubCategory(req, res, next) {
    try {
      const { id } = req.query;
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
      next(ApiError.badRequest(e.message));
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
