const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TransactionPoint extends Model {
    static associate(models) {
      //create associations in here
      TransactionPoint.belongsTo(models.user, { foreignKey: "userId" });
      TransactionPoint.belongsTo(models.reward, { foreignKey: "rewardId" });
      TransactionPoint.belongsTo(models.transactionProduct, {
        foreignKey: "transactionProductId",
      });
      TransactionPoint.belongsTo(models.transactionPayment, {
        foreignKey: "transactionPaymentId",
      });
    }
  }

  TransactionPoint.init(
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
      modelName: "transactionPoint",
      timestamps: true,
      underscored: true,
    }
  );
  return TransactionPoint;
};
