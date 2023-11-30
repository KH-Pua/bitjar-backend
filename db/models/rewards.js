const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Rewards extends Model {
    static associate(models) {
      //create associations in here
      Rewards.hasMany(models.transactionPoint, { foreignKey: "rewardId" });
    }
  }

  Rewards.init(
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
  return Rewards;
};
