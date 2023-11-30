const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TransactionsPayments extends Model {
    static associate(models) {
      //create associations in here
      TransactionsPayments.belongsTo(models.user, { foreignKey: "userId" });
      TransactionsPayments.belongsTo(models.coin, { foreignKey: "coinId" });
      TransactionsPayments.hasMany(models.transactionsPoint, {
        foreignKey: "transactionProductId",
      });
    }
  }

  TransactionsPayments.init(
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
      fiat_amount_usd: {
        type: DataTypes.FLOAT,
        allowNull: true, // Allow for payment failure
      },
      coin_amount_purchased: {
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
        allowNull: true, // Allow for payment failure
      },
    },
    {
      sequelize,
      modelName: "TransactionsPayment",
      timestamps: true,
      underscored: true,
    }
  );
  return TransactionsPayments;
};