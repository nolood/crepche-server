const { Offer } = require("../models/models");

class BasketController {
  async sendEmail(req, res) {
    try {
      return res.json(req.body);
    } catch (e) {
      return res.status(404).json(e.message);
    }
  }
}

module.exports = new BasketController();
