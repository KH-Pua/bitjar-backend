const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    static associate(models) {
      //create associations in here
      Notification.belongsTo(models.user, { foreignKey: "userId" });
      Notification.belongsTo(models.transactionPoint, {
        foreignKey: "transactionPointId",
      });
      Notification.belongsTo(models.transactionProduct, {
        foreignKey: "transactionProductId",
      });
      Notification.belongsTo(models.transactionPayment, {
        foreignKey: "transactionPaymentId",
      });
    }
  }

  Notification.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      transactionPointId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "transactionPoint",
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
    },
    {
      sequelize,
      modelName: "notification",
      timestamps: true,
      underscored: true,
    }
  );
  return Notification;
};
