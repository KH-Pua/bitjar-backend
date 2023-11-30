const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Coins extends Model {
    static associate(models) {
      //create associations in here
      Coins.hasMany(models.transactionsProduct, {
        foreignKey: "coinId",
      });
      Coins.hasMany(models.transactionsPayment, {
        foreignKey: "coinId",
      });
      Coins.hasMany(models.holding, {
        foreignKey: "coinId",
      });
    }
  }

  Coins.init(
    {
      coinSymbol: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      coinName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "coin",
      timestamps: true,
      underscored: true,
    }
  );
  return Coins;
};
