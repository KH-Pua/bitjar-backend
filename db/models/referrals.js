const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Referrals extends Model {
    static associate(models) {
      //create associations in here
      Referrals.belongsTo(models.user, {
        foreignKey: "refererId",
        as: "referer",
      });
      Referrals.belongsTo(models.user, {
        foreignKey: "refereeId",
        as: "referee",
      });
    }
  }

  Referrals.init(
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
  return Referrals;
};
