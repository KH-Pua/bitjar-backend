const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    static associate(models) {
      //create associations in here
      Products.hasMany(models.transactionProduct, {
        foreignKey: "productId",
      });
      Products.hasMany(models.holding, {
        foreignKey: "productId",
      });
    }
  }

  Products.init(
    {
      productName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      apr: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "product",
      timestamps: true,
      underscored: true,
    }
  );
  return Products;
};
