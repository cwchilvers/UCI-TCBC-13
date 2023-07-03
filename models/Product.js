// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // ID, Product Name, Price, Stock, Category, Tags
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    price:{
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      validate:{
        isDecimal: true,
      }
    },
    stock:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate:{
        isNumeric: true,
      }
    }, 
    // Get the category id from the category model
    // and link it to the product model
    category_id: {
      type: DataTypes.INTEGER,
      references:{
        model: 'category',
        key: 'id',
      }
    },
    // Get tag id from the tag model
    // and link it to the product model
    tags: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tag',
        key: 'id',
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
