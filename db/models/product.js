const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      //create associations in here
      Product.hasMany(models.transactionProduct, {
        foreignKey: "productId",
      });
      Product.hasMany(models.holding, {
        foreignKey: "productId",
      });
    }
  }

  Product.init(
    {
      productName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      apr: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      tvl: {
        type: DataTypes.FLOAT,
        allowNull: true,
      }
    },
    {
      sequelize,
      modelName: "product",
      timestamps: true,
      underscored: true,
    }
  );
  return Product;
};
