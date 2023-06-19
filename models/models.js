const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
})

const Role = sequelize.define('role', {
  value: { type: DataTypes.STRING, unique: true, defaultValue: 'USER' }
})

const Basket = sequelize.define('basket', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const BasketItem = sequelize.define('basket_item', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const Item = sequelize.define('item', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, unique: true, allowNull: false },
  pack: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: false }
})

const Category = sequelize.define('category', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Subcategory = sequelize.define('subcategory', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, unique: true, allowNull: false },
})

User.belongsToMany(Role, { through: 'UserRole' })
Role.belongsToMany(User, { through: 'UserRole' })

User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketItem)
BasketItem.belongsTo(Basket)

Category.hasMany(Subcategory)
Subcategory.belongsTo(Category)

Item.hasMany(BasketItem)
BasketItem.belongsTo(Item)

Item.belongsTo(Category)
Item.belongsTo(Subcategory)

module.exports = {
  User,
  Basket,
  BasketItem,
  Item,
  Category,
  Subcategory,
  Role,
}