"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Coin extends Model {
    static associate(models) {
      //create associations in here
      Coin.hasMany(models.transactionProduct, {
        foreignKey: "coinId",
      });
      Coin.hasMany(models.transactionPayment, {
        foreignKey: "coinId",
      });
      Coin.hasMany(models.holding, {
        foreignKey: "coinId",
      });
    }
  }

  Coin.init(
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
  return Coin;
};
