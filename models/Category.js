const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    // ID, Category Name, Products
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Get the product id from the product model
    // and link it to the category model
    products: {
      type: DataTypes.INTEGER,
      references: {
        model: 'product',
        key: 'id',
      },
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
