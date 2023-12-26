const BaseController = require("./baseController");
const axios = require("axios");

const { OK, BAD_REQUEST, NOT_FOUND } = require("../constants/statusCodes");

class UserController extends BaseController {
  constructor(
    userModel,
    referralModel,
    holdingModel,
    transactionPaymentModel,
    transactionPointModel,
    transactionProductModel,
    coinModel,
    productModel,
    sequelize
  ) {
    super(userModel);
    this.referralModel = referralModel;
    this.holdingModel = holdingModel;
    this.transactionPaymentModel = transactionPaymentModel;
    this.transactionPointModel = transactionPointModel;
    this.transactionProductModel = transactionProductModel;
    this.coinModel = coinModel;
    this.productModel = productModel;
    this.sequelize = sequelize;
  }

  // Get userData from Wallet address
  getUserData = async (req, res) => {
    const { address } = req.params;
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
    const { address } = req.params;
    try {
      const user = await this.model.findOne({
        where: { walletAddress: address },
      });
      let output = await this.referralModel.findAll({
        where: { refererId: user.id },
        include: {
          model: this.model,
          as: "referee",
          attributes: ["id", "walletAddress", "userName", "createdAt"],
        },
        order: [["createdAt", "DESC"]], // Change 'createdAt' to the appropriate column name
      });

      return res.status(OK).json({ success: true, output });
    } catch (error) {
      return res.status(BAD_REQUEST).json({
        success: false,
        msg: "Unable to retrieve referral history data",
      });
    }
  };

  // Get the Referer of a walletaddress, if any
  getUserRefererIfAny = async (req, res) => {
    const { walletAddress } = req.body;

    if (!walletAddress) {
      return res.status(400).json({
        success: false,
        msg: "Missing details in the request body",
      });
    }

    try {
      // Step 1: Get user's data
      const user = await this.model.findOne({
        where: { walletAddress: walletAddress },
      });

      // Step 2: Check for any referer and get data
      let output = await this.referralModel.findAll({
        where: { refereeId: user.id },
        include: { model: this.model, as: "referer" },
      });

      return res.status(OK).json({ success: true, output });
    } catch (err) {
      return res.status(BAD_REQUEST).json({
        success: false,
        msg: err.message,
      });
    }
  };

  // Get Info + create new user
  getInfoViaWalletAdd = async (req, res) => {
    function generateReferralCode() {
      // Define the character set for alphanumeric codes
      const characters =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

      // Generate a 6-digit alphanumeric code
      let referralCode = "";
      for (let i = 0; i < 6; i++) {
        referralCode += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }

      return referralCode;
    }

    try {
      const { walletAddress } = req.body;
      let output;
      //Query for user info that match the wallet address inside db
      const userInfo = await this.model.findOne({
        where: {
          walletAddress: walletAddress,
        },
      });
      // Check whether the user is registered.
      if (!userInfo) {
        const registrationData = {
          walletAddress: walletAddress,
          referralCode: generateReferralCode(),
          points: 0,
        };
        // Pass new created user information to output
        const newCreatedUserInfo = await this.model.create(registrationData);

        output = {
          ...newCreatedUserInfo,
          newUser: true,
        };
      } else {
        // Pass existing user information to output
        output = {
          ...userInfo,
          newUser: false,
        };
      }
      return res.json({ success: true, output });
    } catch (err) {
      return res.status(500).json({ success: false, msg: err.message });
    }
  };

  editInfo = async (req, res) => {
    const data = req.body;
    try {
      const output = await this.model.update(data, {
        where: { walletAddress: data.walletAddress },
      });
      return res.json({ success: true, output });
    } catch (err) {
      return res.status(500).json({ success: false, msg: err.message });
    }
  };

  checkAndRecordReferral = async (req, res) => {
    const refereeAddress = req.body.walletAddress;
    const refererCode = req.body.refererCode;

    try {
      await this.sequelize.transaction(async (t) => {
        // Step 1: Get referer details
        const referer = await this.model.findOne(
          {
            where: { referralCode: refererCode },
          },
          { transaction: t }
        );
        // Step 2: Get referee details
        const referee = await this.model.findOne(
          {
            where: { walletAddress: refereeAddress },
          },
          { transaction: t }
        );
        // Step 3: Update Referral Table
        await this.referralModel.create(
          {
            refererId: referer.id,
            refereeId: referee.id,
          },
          { transaction: t }
        );
        // Step 4: Update Points to referer
        const updatedPoints = referer.points + 10;
        await referer.update({ points: updatedPoints }, { transaction: t });

        return res.json({ success: true, msg: "Referral Recorded" });
      });
    } catch (err) {
      return res.status(500).json({ success: false, msg: err.message });
    }
  };

  getHoldings = async (req, res) => {
    const { address } = req.params;
    try {
      const user = await this.model.findOne({
        where: { walletAddress: address },
      });
      let output = await user.getHoldings({
        include: [
          {
            model: this.productModel,
          },
          { model: this.coinModel },
        ],
      });

      return res.status(OK).json({ success: true, output });
    } catch (error) {
      return res.status(BAD_REQUEST).json({
        success: false,
        error,
        msg: "Unable to retrieve referral holdings data",
      });
    }
  };

  // ---------- CMC Methods ---------- //

  // https://coinmarketcap.com/api/documentation/v1/#operation/getV1CryptocurrencyQuotesLatest
  getCoinLatestInfo = async (req, res) => {
    const { coinSYM } = req.body;

    try {
      let information = await axios.get(
        `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${coinSYM}`,
        {
          headers: {
            "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY,
          },
        }
      );

      return res.json({ success: true, data: information.data });
    } catch (err) {
      return res.status(500).json({ success: false, msg: err.message });
    }
  };
}

module.exports = UserController;
