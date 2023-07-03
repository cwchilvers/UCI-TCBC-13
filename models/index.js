// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');
const sequelize = require('sequelize');

// Products belongsTo Category
sequelize.product.belongsTo(sequelize.category, {
  foreignKey: 'category_id',
});

// Categories have many Products
sequelize.category.hasMany(sequelize.product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});

// Products belongToMany Tags (through ProductTag)
sequelize.product.belongsToMany(sequelize.tag, {
  through: sequelize.product_tag,
  foreignKey: 'product_id',
});

// Tags belongToMany Products (through ProductTag)
sequelize.tag.belongsToMany(sequelize.product, {
  through: sequelize.product_tag,
  foreignKey: 'tag_id',
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
