const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Coins extends Model {
    static associate(models) {
      //create associations in here
      Coins.belongsToMany(models.transactionsProduct, {
        foreignKey: "coinId",
      });
      Coins.belongsToMany(models.transactionsPayment, {
        foreignKey: "coinId",
      });
      Coins.belongsToMany(models.holding, {
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
