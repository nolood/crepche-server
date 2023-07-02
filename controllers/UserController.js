const ApiError = require("../error/ApiError");
const { Role, User } = require("../models/models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret } = require("../config");
const { createBasket } = require("./BasketController");

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, secret, { expiresIn: "48h" });
};

class UserController {
  async registration(req, res) {
    try {
      const { email, password } = req.query;
      const candidate = await User.findOne({ where: { email } });
      if (candidate) {
        return res.status(404).json("email-exist");
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: "USER" });
      const user = User.create({
        email,
        password: hashPassword,
        roles: [userRole.value],
      });
      return res.json(user.id);
    } catch (e) {
      return res.status(404).json(e.message);
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.query;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json("wrong-email");
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(404).json("wrong-password");
      }
      const token = generateAccessToken(user.id, user.roles);
      return res.json({ token, message: "success" });
    } catch (e) {
      return res.status(404).json(e.message);
    }
  }

  async check(req, res, next) {
    const userId = req.user.id;
    return res.json({ auth: true, userId });
  }

  async addRole(req, res) {
    const { role } = req.body;
    const roles = await Role.create({ value: role });
    return res.json(roles);
  }
}

module.exports = new UserController();
