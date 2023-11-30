const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Holdings extends Model {
    static associate(models) {
      //create associations in here
      Holdings.belongsTo(models.user, { foreignKey: "userId" });
      Holdings.belongsTo(models.coin, { foreignKey: "coinId" });
      Holdings.belongsTo(models.product, {
        foreignKey: "productId",
      });
    }
  }

  Holdings.init(
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
      productid: {
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
  return Holdings;
};
