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

  getUserPastTransactions = async (req, res) => {
    const { userId } = req.body;
    try {
      // console.log(this.transactionProductModel);
      // console.log(userId);
      // let output = await this.transactionProductModel.findAll({
      //   where: { userId: userId },
      // });

      let user = await this.model.findByPk(userId);
      const output = await user.getTransactionProducts({
        include: [
          { model: this.coinModel, attributes: ["coinName"] },
          { model: this.productModel, attributes: ["productName"] },
        ],
      });

      return res.json({ success: true, data: output });
    } catch (err) {
      return res.status(500).json({ success: false, msg: err.message });
    }
  };

  getInfoViaWalletAdd = async (req, res) => {
    function generateReferralCode() {
      // Define the character set for alphanumeric codes
      const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  
      // Generate a 6-digit alphanumeric code
      let referralCode = '';
      for (let i = 0; i < 6; i++) {
          referralCode += characters.charAt(Math.floor(Math.random() * characters.length));
      }
  
      return referralCode;
    }
  
    try {
      const { walletAddress } = req.body;
      let output
      //Query for user info that match the wallet address inside db
      const userInfo = await this.model.findAll({
        where: {
          walletAddress: walletAddress
        }
      });
      // Check whether the user is registered.
      if (userInfo.length === 0) {
        const registrationData = {
          walletAddress: walletAddress,
          referralCode: generateReferralCode(),
        }
        // Pass new created user information to output
        const newCreatedUserInfo = await this.model.create(registrationData);
        //newCreatedUserInfo.dataValues["newUser"] = true;
        //output = newCreatedUserInfo
        output = {
          ...newCreatedUserInfo,
          newUser: true,
        }
      } else {
        // Pass existing user information to output
        output = {
          ...userInfo,
          newUser: false,
        }
      }
      return res.json({ success: true, output });
    } catch(err) {
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
      },{});

      //Update the db with new info
      const output = await this.model.update(inputInfo, {
        where: {walletAddress: req.body.walletAddress}
      })
      return res.json({ success: true, output });
    } catch (err) {
      return res.status(500).json({ success: false, msg: err.message });
    }
  };

  recordReferrerAndReferree = async (req, res) => {
    try {
      let output
      //get referer user id via referral code
      const { referralCode } = req.body;
      const referrerOutput = await this.model.findOne({
        where: {referralCode: referralCode}
      })
      //get referer user id via wallet address
      const { walletAddress } = req.body;
      const refereeOutput = await this.model.findOne({
        where: {walletAddress: walletAddress}
      })
      //Register to referrals table
      if (referrerOutput && refereeOutput) {
        const registrationData = {
          refererId: referrerOutput.id,
          refereeId: refereeOutput.id
        }
        output = await this.referralModel.create(registrationData)
      }
      return res.json({ success: true, output });
    } catch (err) {
      return res.status(500).json({ success: false, msg: err.message });
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
