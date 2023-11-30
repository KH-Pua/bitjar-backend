const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    //create our associations

    static associate(models) {
      //create associations in here
      User.hasMany(models.transactionProduct, { foreignKey: "userId" });
      User.hasMany(models.transactionPoint, { foreignKey: "userId" });
      User.hasMany(models.transactionPayment, { foreignKey: "userId" });
      User.hasMany(models.holding, { foreignKey: "userId" });
      User.hasMany(models.referral, {
        foreignKey: "refererId",
        as: "referer",
      });
      User.hasMany(models.referral, {
        foreignKey: "refereeId",
        as: "referee",
      });
    }
  }

  User.init(
    {
      walletAddress: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      profilePicture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      referralCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      points: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "user",
      timestamps: true,
      underscored: true,
    }
  );
  return User;
};
