const BaseController = require("./baseController");

const { OK, CREATED, BAD_REQUEST } = require("../constants/statusCodes");
class UserController extends BaseController {
  constructor(
    userModel,
    referralModel,
    holdingModel,
    transactionPaymentModel,
    transactionPointModel,
    transactionProductModel,
    coinModel,
    productModel
  ) {
    super(userModel);
    this.referralModel = referralModel;
    this.holdingModel = holdingModel;
    this.transactionPaymentModel = transactionPaymentModel;
    this.transactionPointModel = transactionPointModel;
    this.transactionProductModel = transactionProductModel;
    this.coinModel = coinModel;
    this.productModel = productModel;
  }

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
      const addingPoints = await this.transactionPointModel.create({
        userId,
        actionName,
        pointsAllocated,
      });
      return res.status(CREATED).json({ success: true, addingPoints });
    } catch (error) {
      return res.status(BAD_REQUEST).json({
        success: false,
        msg: error.message,
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

    function generateUsername() {
      // Generate a random 5-digit number
      const randomNumber = Math.floor(10000 + Math.random() * 90000);
  
      // Combine "User" with the random number
      const username = "User" + randomNumber;
  
      return username;
    }
  
    try {
      const { walletAddress } = req.body;
      let output
      const userInfo = await this.model.findAll({
        where: {
          walletAddress: walletAddress
        }
      });
      if (!userInfo.id) {
        const registrationData = {
          walletAddress: walletAddress,
          referralCode: generateReferralCode(),
          userName: generateUsername(),
        }
        const newCreatedUser = await this.model.create(registrationData);
        output = {
          ...newCreatedUser,
          newUser: true,
        }
      } else {
        output = userInfo
      }
      return res.json({ success: true, data: output });
    } catch(err) {
      return res.status(500).json({ success: false, msg: err.message });
    }
  };

  editInfo = async (req, res) => {
    try {
      const inputInfo = Object.keys(req.body).reduce((item, key) => {
        if (key !== "walletAddress") {
          item[key] = req.body[key];
        }
      });
      
      const output = await this.model.update(inputInfo, {
        where: {walletAddress: req.body.walletAddress}
      })
      return res.json({ success: true, data: output });
    } catch (err) {
      return res.status(500).json({ success: false, msg: err.message });
    }
  };
 }

module.exports = UserController;
