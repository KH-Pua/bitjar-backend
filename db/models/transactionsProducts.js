const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TransactionsProducts extends Model {
    static associate(models) {
      //create associations in here
      TransactionsProducts.belongsTo(models.user, { foreignKey: "userId" });
      TransactionsProducts.belongsTo(models.coin, { foreignKey: "coinId" });
      TransactionsProducts.belongsTo(models.product, {
        foreignKey: "productId",
      });
      TransactionsProducts.hasMany(models.transactionsPoint, {
        foreignKey: "transactionProductId",
      });
    }
  }

  TransactionsProducts.init(
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
      modelName: "transactionsProduct",
      timestamps: true,
      underscored: true,
    }
  );
  return TransactionsProducts;
};
