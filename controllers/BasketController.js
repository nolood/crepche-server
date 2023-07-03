const { Basket, User } = require("../models/models");
const ApiError = require("../error/ApiError");

class BasketController {
  async sendEmail(req, res) {
    try {
      res.json(req.body);
    } catch (e) {
      res.status(404).json(e.message);
    }
  }
}

module.exports = new BasketController();
