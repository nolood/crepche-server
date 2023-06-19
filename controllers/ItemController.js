const uuid = require('uuid')
const path = require('path')
const { Item } = require('../models/models')
const ApiError = require('../error/ApiError')

class ItemController {
  async addItem(req, res, next) {
    try {
      const { title, price, pack } = req.body
      const { img } = req.files
      let fileName = uuid.v4() + '.webp'
      img.mv(path.resolve(__dirname, '..', 'static', fileName))
      const item = await Item.create({ title, price, pack, img: fileName })
      return res.json(item)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAllItems(req, res, next) {
    try {
      let { categoryId, subCategoryId, limit, page } = req.query
      page = page || 1
      limit = limit || 9
      let offset = page * limit - limit
      let items
      if (!categoryId && !subCategoryId) {
        items = await Item.findAndCountAll({ limit, offset })
      }
      if (categoryId && !subCategoryId) {
        items = await Item.findAndCountAll({ where: { categoryId }, limit, offset })
      }
      if (!categoryId && subCategoryId) {
        items = await Item.findAndCountAll({ where: { subCategoryId }, limit, offset })
      }
      if (categoryId && subCategoryId) {
        items = await Item.findAndCountAll({ where: { categoryId, subCategoryId }, limit, offset })
      }
      return res.json(items)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getOneItem(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        next(ApiError.badRequest('Id is not defined'))
      }
      const item = await Item.findAll({ where: { id } })
      return res.json(item)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async deleteItem(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        next(ApiError.badRequest('Id is not defined'))
      }
      const item = await Item.destroy({ where: { id } })
      return res.json(item)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
}

module.exports = new ItemController()