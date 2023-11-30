const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    //create our associations

    static associate(models) {
      //create associations in here
      Users.hasMany(models.transactionProduct, { foreignKey: "userId" });
      Users.hasMany(models.transactionPoint, { foreignKey: "userId" });
      Users.hasMany(models.transactionPayment, { foreignKey: "userId" });
      Users.hasMany(models.holdings, { foreignKey: "userId" });
      Users.hasMany(models.referral, {
        foreignKey: "refererId",
        as: "referer",
      });
      Users.hasMany(models.referral, {
        foreignKey: "refereeId",
        as: "referee",
      });
    }
  }

  Users.init(
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
  return Users;
};
