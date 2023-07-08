const { Offer } = require("../models/models");

class BasketController {
  async sendItems(req, res) {
    try {
      const { name, surname, phone, items } = req.body;
      const item = await Offer.create({ name, surname, number: phone, items });
      return res.status(200).json(item);
    } catch (e) {
      return res.status(404).json(e.message);
    }
  }

  async getItems(req, res) {
    try {
      const items = Offer.findAll({ order: [["createdAt", "asc"]] });
      return res.status(200).json(items);
    } catch (e) {
      return res.status(404).json(e.message);
    }
  }
}

module.exports = new BasketController();
