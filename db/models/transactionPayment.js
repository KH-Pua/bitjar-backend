const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TransactionPayment extends Model {
    static associate(models) {
      //create associations in here
      TransactionPayment.belongsTo(models.user, { foreignKey: "userId" });
      TransactionPayment.belongsTo(models.coin, { foreignKey: "coinId" });
      TransactionPayment.hasMany(models.transactionPoint, {
        foreignKey: "transactionProductId",
      });
    }
  }

  TransactionPayment.init(
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
      paymentStatus: {
        type: DataTypes.STRING, // Accept different payment results
        allowNull: false,
      },
      fiatAmountUsd: {
        type: DataTypes.FLOAT,
        allowNull: true, // Allow for payment failure
      },
      coinAmountPurchased: {
        type: DataTypes.FLOAT,
        allowNull: true, // Allow for payment failure
      },
      fromAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      toAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      transactionHash: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true, // Allow for payment failure
      },
    },
    {
      sequelize,
      modelName: "transactionPayment",
      timestamps: true,
      underscored: true,
    }
  );
  return TransactionPayment;
};
