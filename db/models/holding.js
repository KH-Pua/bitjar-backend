const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Holding extends Model {
    static associate(models) {
      //create associations in here
      Holding.belongsTo(models.user, { foreignKey: "userId" });
      Holding.belongsTo(models.coin, { foreignKey: "coinId" });
      Holding.belongsTo(models.product, {
        foreignKey: "productId",
      });
    }
  }

  Holding.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
      coinId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "coin",
          key: "id",
        },
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "product",
          key: "id",
        },
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "holding",
      timestamps: true,
      underscored: true,
    }
  );
  return Holding;
};
