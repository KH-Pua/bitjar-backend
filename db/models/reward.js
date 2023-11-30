const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Reward extends Model {
    static associate(models) {
      //create associations in here
      Reward.hasMany(models.transactionPoint, { foreignKey: "rewardId" });
    }
  }

  Reward.init(
    {
      actionName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pointsAllocated: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "reward",
      timestamps: true,
      underscored: true,
    }
  );
  return Reward;
};
