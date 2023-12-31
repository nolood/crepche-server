const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Offer = sequelize.define("offer", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  surname: {
    type: DataTypes.STRING,
  },
  number: {
    type: DataTypes.STRING,
  },
  items: {
    type: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.INTEGER)),
  },
});

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
});

const Role = sequelize.define("role", {
  value: { type: DataTypes.STRING, unique: true, defaultValue: "USER" },
});

const Basket = sequelize.define("basket", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BasketItem = sequelize.define("basket_item", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Item = sequelize.define("item", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: true, unique: false },
  pack: { type: DataTypes.STRING, allowNull: true },
  price: { type: DataTypes.FLOAT, allowNull: true },
  img: { type: DataTypes.STRING, allowNull: true },
});

const Category = sequelize.define("category", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Subcategory = sequelize.define("subcategory", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const PopItem = sequelize.define("popItem", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  items: { type: DataTypes.ARRAY(DataTypes.INTEGER), allowNull: false },
});

const PromItem = sequelize.define("promItem", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  items: { type: DataTypes.ARRAY(DataTypes.INTEGER), allowNull: false },
});

User.belongsToMany(Role, { through: "UserRole" });
Role.belongsToMany(User, { through: "UserRole" });

User.hasOne(Basket);
Basket.belongsTo(User);

Basket.hasMany(BasketItem);
BasketItem.belongsTo(Basket);

Category.hasMany(Subcategory);
Subcategory.belongsTo(Category);

Item.hasMany(BasketItem);
BasketItem.belongsTo(Item);

Item.belongsTo(Category);
Item.belongsTo(Subcategory);

Offer.sync();

module.exports = {
  User,
  Basket,
  BasketItem,
  Item,
  Category,
  Subcategory,
  Role,
  PopItem,
  PromItem,
  Offer,
};
