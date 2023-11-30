const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Referral extends Model {
    static associate(models) {
      //create associations in here
      Referral.belongsTo(models.user, {
        foreignKey: "refererId",
        as: "referer",
      });
      Referral.belongsTo(models.user, {
        foreignKey: "refereeId",
        as: "referee",
      });
    }
  }

  Referral.init(
    {
      refererId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
      refereeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "referral",
      timestamps: true,
      underscored: true,
    }
  );
  return Referral;
};
