const { Basket, User } = require("../models/models");
const ApiError = require("../error/ApiError");

class BasketController {
  async createBasket(userId, req, res) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: "invalid userId" });
      }
      const basket = await Basket.create({ userId });
      return res.json(true);
    } catch (e) {
      res.status(404).json(e.message);
    }
  }

  async getBasketByUserId(req, res, next) {
    try {
      const { userId } = req.params;
      const basket = await Basket.findOne({ where: { userId } });
      return res.json(basket);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async updateBasketByUserId(req, res, next) {
    try {
      const { userId } = req.params;
      const {
        /* Здесь указывайте поля, которые нужно обновить */
      } = req.body;
      const updatedBasket = await Basket.update(
        {
          /* Здесь указывайте поля и их значения для обновления */
        },
        { where: { userId } }
      );
      return res.json(updatedBasket);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async deleteBasketByUserId(req, res, next) {
    try {
      const { userId } = req.params;
      await Basket.destroy({ where: { userId } });
      return res.json({ message: "Basket deleted successfully" });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new BasketController();
