const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TransactionProduct extends Model {
    static associate(models) {
      //create associations in here
      TransactionProduct.belongsTo(models.user, { foreignKey: "userId" });
      TransactionProduct.belongsTo(models.coin, { foreignKey: "coinId" });
      TransactionProduct.belongsTo(models.product, {
        foreignKey: "productId",
      });
      TransactionProduct.hasMany(models.transactionPoint, {
        foreignKey: "transactionProductId",
      });
      TransactionProduct.hasMany(models.notification, {
        foreignKey: "transactionProductId",
      });
    }
  }

  TransactionProduct.init(
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
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "transactionProduct",
      timestamps: true,
      underscored: true,
    }
  );
  return TransactionProduct;
};
