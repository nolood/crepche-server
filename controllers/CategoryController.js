const { Category } = require("../models/models");
const ApiError = require("../error/ApiError");

class CategoryController {
  async createCategory(req, res) {
    try {
      const { title } = req.query;
      if (!title) {
        return res.status(404).json({ message: "Title undefined" });
      }
      const category = await Category.create({ title });
      return res.json(category);
    } catch (e) {
      return res.status(404).json(e);
    }
  }
  async getAllCategories(req, res) {
    try {
      const categories = await Category.findAll({ order: [["title", "asc"]] });
      return res.json(categories);
    } catch (e) {
      return res.status(404).json(e);
    }
  }
  async getOneCategory(req, res, next) {
    try {
      const { id } = req.query;
      if (!id) {
        return next(ApiError.badRequest("Id is not defined"));
      }
      const category = await Category.findAll({ where: { id } });
      return res.json(category);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async updateCategory(req, res, next) {
    try {
      const { id } = req.query;
      const { title } = req.body;
      if (!id || !title) {
        return next(ApiError.badRequest("Id or title is not defined"));
      }
      const category = await Category.update({ title }, { where: { id } });
      return res.json(category);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async deleteCategory(req, res, next) {
    try {
      const { id } = req.query;
      if (!id) {
        return next(ApiError.badRequest("Id is not defined"));
      }
      const category = await Category.destroy({ where: { id } });
      return res.json(category);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new CategoryController();
