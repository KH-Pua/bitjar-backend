const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TransactionsPoints extends Model {
    static associate(models) {
      //create associations in here
      TransactionsPoints.belongsTo(models.user, { foreignKey: "userId" });
      TransactionsPoints.belongsTo(models.reward, { foreignKey: "rewardId" });
      TransactionsPoints.belongsTo(models.transactionProduct, {
        foreignKey: "transactionProductId",
      });
      TransactionsPoints.belongsTo(models.transactionPayment, {
        foreignKey: "transactionPaymentId",
      });
    }
  }

  TransactionsPoints.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
      transactionProductId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "transactionProduct",
          key: "id",
        },
      },
      transactionPaymentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "transactionPayment",
          key: "id",
        },
      },
      rewardId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "reward",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "TransactionsPoint",
      timestamps: true,
      underscored: true,
    }
  );
  return TransactionsPoints;
};
