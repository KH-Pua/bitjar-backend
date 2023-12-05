const BaseController = require("./baseController");
// const Sequelize = require("sequelize");

// const sequelize = new Sequelize("postgres://user:pichukaku:5432/bitjar");

const {
  OK,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
} = require("../constants/statusCodes");
class UserController extends BaseController {
  constructor(
    userModel,
    referralModel,
    holdingModel,
    transactionPaymentModel,
    transactionPointModel,
    transactionProductModel,
    sequelize
  ) {
    super(userModel);
    this.referralModel = referralModel;
    this.holdingModel = holdingModel;
    this.transactionPaymentModel = transactionPaymentModel;
    this.transactionPointModel = transactionPointModel;
    this.transactionProductModel = transactionProductModel;
    this.sequelize = sequelize;
  }

  // Get userData from Wallet address
  getUserData = async (req, res) => {
    const { address } = req.params;
    console.log("getuserid", address);
    try {
      let user = await this.model.findOne({
        where: {
          walletAddress: address,
        },
      });

      if (!user) {
        return res.status(NOT_FOUND).json({
          success: false,
          msg: "User ID not found for the given address",
        });
      }

      return res.status(OK).json({ success: true, user });
    } catch (error) {
      return res.status(BAD_REQUEST).json({
        success: false,
        msg: "Unable to retrieve user data",
        error: error,
      });
    }
  };
  // Get leaderboard for points sorted by number of points
  getPointsLeaderboard = async (req, res) => {
    try {
      let output = await this.model.findAll({
        order: [["points", "DESC"]],
      });
      return res.status(OK).json({ success: true, output });
    } catch (error) {
      return res.status(BAD_REQUEST).json({
        success: false,
        msg: "Unable to retrieve points leaderboard data",
        error: error,
      });
    }
  };

  // Get leaderboard for referrals sorted by number of referrals
  getReferralLeaderboard = async (req, res) => {
    try {
      let output = await this.model.findAll({
        include: {
          model: this.referralModel,
          as: "referer",
          attributes: ["id"],
        },
      });

      // Count referrals and add attribute
      output = output.map((item) => {
        const referralCount = item.referer ? item.referer.length : 0;
        return {
          ...item.toJSON(),
          referralCount: referralCount,
        };
      });

      // Sort by referral count
      output.sort((a, b) => b.referralCount - a.referralCount);

      return res.status(OK).json({ success: true, output });
    } catch (error) {
      return res.status(BAD_REQUEST).json({
        success: false,
        msg: "Unable to retrieve referral leaderboard data",
      });
    }
  };

  getReferralHistory = async (req, res) => {
    const { userId } = req.params;
    try {
      let output = await this.referralModel.findAll({
        where: { refererId: userId },
        include: {
          model: this.model,
          as: "referee",
          attributes: ["id", "walletAddress", "userName", "createdAt"],
        },
      });

      return res.status(OK).json({ success: true, output });
    } catch (error) {
      return res.status(BAD_REQUEST).json({
        success: false,
        msg: "Unable to retrieve referral history data",
      });
    }
  };

  getTransactionPointsHistory = async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        msg: "Missing userId in the request body",
      });
    }
    try {
      let output = await this.transactionPointModel.findAll({
        where: { userId: userId },
        order: [["createdAt", "DESC"]], // Change 'createdAt' to the appropriate column name
      });
      return res.status(OK).json({ success: true, output });
    } catch (error) {
      return res.status(BAD_REQUEST).json({
        success: false,
        msg: "Unable to retrieve transactions points history",
      });
    }
  };

  addPoints = async (req, res) => {
    const { userId } = req.params;
    const { actionName, pointsAllocated } = req.body;

    if (!userId || !actionName || !pointsAllocated) {
      return res.status(400).json({
        success: false,
        msg: "Missing details in the request body",
      });
    }
    try {
      const output = await this.sequelize.transaction(async (t) => {
        const updatePointsTransactions =
          await this.transactionPointModel.create(
            {
              userId,
              actionName,
              pointsAllocated,
            },
            { transaction: t }
          );
        // Find user details within the same transaction
        const user = await this.model.findByPk(userId, { transaction: t });
        if (user) {
          // If the user exists, update the points by adding pointsAllocated
          const updatedPoints = user.points + pointsAllocated;
          // Update the user's points within the transaction
          await user.update({ points: updatedPoints }, { transaction: t });
        }
        return res
          .status(CREATED)
          .json({ success: true, message: "Points Added" });
      });
    } catch (error) {
      return res.status(BAD_REQUEST).json({
        success: false,
        msg: error.message,
      });
    }
  };
}

module.exports = UserController;
