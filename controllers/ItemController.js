const uuid = require("uuid");
const path = require("path");
const { Item, PromItem, PopItem } = require("../models/models");
const ApiError = require("../error/ApiError");

class ItemController {
  async addItem(req, res) {
    try {
      const { title, price, pack } = req.query;
      await Item.create({ title, price, pack, img: fileName });
      return res.status(200).json({ message: "success" });
    } catch (e) {
      return res.status(404).json({ message: e });
    }
  }

  async getAllItems(req, res, next) {
    try {
      let { categoryId, subCategoryId, limit, page, all } = req.query;
      // page = page || 1
      // limit = limit || 9
      // let offset = page * limit - limit
      let items;
      if (all) {
        items = await Item.findAll({ order: [["title", "asc"]] });
        return res.json(items);
      }
      if (!categoryId && !subCategoryId) {
        items = await Item.findAndCountAll({});
      }
      if (categoryId && !subCategoryId) {
        items = await Item.findAndCountAll({ where: { categoryId } });
      }
      if (!categoryId && subCategoryId) {
        items = await Item.findAndCountAll({
          where: { subcategoryId: subCategoryId },
        });
      }
      if (categoryId && subCategoryId) {
        items = await Item.findAndCountAll({
          where: { categoryId, subcategoryId: subCategoryId },
        });
      }
      return res.json(items);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getOneItem(req, res) {
    try {
      const { id } = req.query;
      if (!id) {
        next(ApiError.badRequest("Id is not defined"));
      }
      const item = await Item.findAll({ where: { id } });
      return res.json(item);
    } catch (e) {
      return res.status(404).json({ message: e });
    }
  }

  async deleteItems(req, res) {
    try {
      const { items } = req.query;
      items.map(async (id) => {
        await Item.destroy({ where: { id } });
      });
      return res.json({ message: "success" });
    } catch (e) {
      return res.status(404).json({ message: e });
    }
  }

  async addToSubCategory(req, res) {
    try {
      const { subCategoryId, items, categoryId } = req.query;
      const { img } = req.files;
      let fileName = uuid.v4() + ".webp";
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      for (const itemId of JSON.parse(items)) {
        const item = await Item.findByPk(itemId);
        if (item) {
          await item.update({
            categoryId,
            subcategoryId: subCategoryId,
            img: fileName,
          });
        }
      }
    } catch (e) {
      return res.status(404).json({ message: e });
    }
  }

  async addToProm(req, res) {
    try {
      const { items } = req.query;
      await PromItem.destroy({ truncate: true });
      const promItem = await PromItem.create({ items });
      return res.json(promItem);
    } catch (e) {
      return res.status(404).json({ message: e });
    }
  }

  async addToPop(req, res) {
    try {
      const { items } = req.query;
      await PopItem.destroy({ truncate: true });
      const popItems = await PopItem.create({ items });
      return res.json(popItems);
    } catch (e) {
      return res.status(404).json({ message: e });
    }
  }

  async getAllPopItems(req, res) {
    try {
      const popItems = await PopItem.findAll();
      const items = await Item.findAll({
        where: {
          id: popItems[0].items,
        },
      });

      res.status(200).json(items);
    } catch (e) {
      return res.status(404).json({ message: e });
    }
  }

  async getAllPromItems(req, res) {
    try {
      const promItems = await PromItem.findAll();
      const items = await Item.findAll({
        where: {
          id: promItems[0].items,
        },
      });

      res.status(200).json(items);
    } catch (e) {
      return res.status(404).json({ message: e });
    }
  }
}

module.exports = new ItemController();
