const BaseController = require("./baseController");
const axios = require("axios");

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
      const user = await this.model.findOne({
        where: { walletAddress: walletAddress },
      });

      let data = await this.referralModel.findAll({
        where: { refereeId: user.id },
      });

      // Is there a better way to do this query?
      if (data.length != 0 && data[0].dataValues.refererId) {
        const output = await this.model.findOne({
          where: { id: data[0].dataValues.refererId },
        });
        return res.status(OK).json({ success: true, output: output });
      }

      return res.status(OK).json({ success: true, output: data });
    } catch (err) {
      return res.status(BAD_REQUEST).json({
        success: false,
        msg: err.message,
      });
    }
  };

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
        //newCreatedUserInfo.dataValues["newUser"] = true;
        //output = newCreatedUserInfo
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

  getUserDataViaReferralCode = async (req, res) => {
    try {
      const { referralCode } = req.body;
      const output = await this.model.findOne({
        where: { referralCode: referralCode },
      });
      return res.json({ success: true, output });
    } catch (err) {
      return res.status(500).json({ success: false, msg: err.message });
    }
  };

  editInfo = async (req, res) => {
    try {
      // Remove the wallet address from the request body
      const inputInfo = Object.keys(req.body).reduce((item, key) => {
        if (key !== "walletAddress") {
          item[key] = req.body[key];
        }
        return item;
      }, {});

      //Update the db with new info
      const output = await this.model.update(inputInfo, {
        where: { walletAddress: req.body.walletAddress },
      });
      return res.json({ success: true, output });
    } catch (err) {
      return res.status(500).json({ success: false, msg: err.message });
    }
  };

  recordReferrerAndReferree = async (req, res) => {
    try {
      let output;
      //get referer user id via referral code
      const { referralCode } = req.body;
      const referrerOutput = await this.model.findOne({
        where: { referralCode: referralCode },
      });
      //get referee user id via wallet address
      const { walletAddress } = req.body;
      const refereeOutput = await this.model.findOne({
        where: { walletAddress: walletAddress },
      });
      //Register to referrals table
      if (referrerOutput && refereeOutput) {
        const registrationData = {
          refererId: referrerOutput.id,
          refereeId: refereeOutput.id,
        };
        output = await this.referralModel.create(registrationData);
      }
      return res.json({ success: true, output });
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
    console.log(coinSYM);

    try {
      let information = await axios.get(
        `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${coinSYM}`,
        {
          headers: {
            "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY,
          },
        }
      );
      // console.log(information.data); // need to add .data for some reason. some circular JSON thing

      return res.json({ success: true, data: information.data });
    } catch (err) {
      return res.status(500).json({ success: false, msg: err.message });
    }
  };
}

module.exports = UserController;
