const BaseController = require("./baseController");
const { Op } = require("sequelize");

const {
  OK,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
} = require("../constants/statusCodes");
class TransactionController extends BaseController {
  constructor(
    transactionPointModel,
    transactionPaymentModel,
    transactionProductModel,
    userModel,
    coinModel,
    productModel,
    sequelize
  ) {
    super(transactionPointModel);
    this.transactionPaymentModel = transactionPaymentModel;
    this.transactionProductModel = transactionProductModel;
    this.userModel = userModel;
    this.coinModel = coinModel;
    this.productModel = productModel;
    this.sequelize = sequelize;
  }

  // Check against transaction_point for any daily login points claimed by the user
  checkDailyPointsClaim = async (req, res) => {
    const { address } = req.params;

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for comparison

    try {
      const user = await this.userModel.findOne({
        where: { walletAddress: address },
      });
      const result = await this.model.findOne({
        where: {
          userId: user.id,
          actionName: {
            [Op.startsWith]: "Daily Login", // Using Sequelize operator to find actionName starting with 'daily login'
          },
          createdAt: {
            [Op.gte]: today, // Using Sequelize operator for 'greater than or equal to' today's date
          },
        },
      });

      console.log("Matching", result);
      if (result) {
        console.log("Matching row:", result);
        return res.status(200).json({ success: true, result });
      } else {
        console.log("No matching row found");
        return res
          .status(404)
          .json({ success: false, message: "No matching row found" });
      }
    } catch (error) {
      return res.status(BAD_REQUEST).json({
        success: false,
        msg: error.message,
      });
    }
  };

  getTransactionPointsHistory = async (req, res) => {
    const { address } = req.params;

    if (!address) {
      return res.status(400).json({
        success: false,
        msg: "Missing address in the request body",
      });
    }
    try {
      const user = await this.userModel.findOne({
        where: { walletAddress: address },
      });
      let output = await this.model.findAll({
        where: { userId: user.id },
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

  getTransactionPaymentsHistory = async (req, res) => {
    const { address } = req.params;

    if (!address) {
      return res.status(400).json({
        success: false,
        msg: "Missing address in the request body",
      });
    }
    try {
      let user = await this.userModel.findOne({
        where: {
          walletAddress: address,
        },
      });
      let output = await this.transactionPaymentModel.findAll({
        include: { model: this.coinModel },
        where: { userId: user.id },
        order: [["createdAt", "DESC"]], // Change 'createdAt' to the appropriate column name
      });
      return res.status(OK).json({ success: true, output });
    } catch (error) {
      return res.status(BAD_REQUEST).json({
        success: false,
        msg: "Unable to retrieve transactions payment history",
      });
    }
  };

  addPoints = async (req, res) => {
    const { actionName, pointsAllocated, walletAddress } = req.body;

    console.log("addpoints", actionName, pointsAllocated, walletAddress);

    if (!walletAddress || !actionName || !pointsAllocated) {
      return res.status(400).json({
        success: false,
        msg: "Missing details in the request body",
      });
    }
    try {
      const output = await this.sequelize.transaction(async (t) => {
        // Step 1: Get userId from walletAddress in userModel
        const user = await this.userModel.findOne(
          {
            where: { walletAddress: walletAddress },
          },
          { transaction: t }
        );
        // Step 2: Create transaction in transactionPoint
        const updatePointsTransactions = await this.model.create(
          {
            userId: user.id,
            actionName,
            pointsAllocated,
          },
          { transaction: t }
        );
        // Step 3: Calculate new points and update points in userModel
        if (user) {
          const updatedPoints =
            user.points + updatePointsTransactions.pointsAllocated;
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

  addPayment = async (req, res) => {
    const {
      coinName,
      paymentStatus,
      fiatAmountUsd,
      coinAmountPurchased,
      fromAddress,
      toAddress,
      transactionHash,
      actionName,
      pointsAllocated,
    } = req.body;

    if (
      !coinName ||
      !paymentStatus ||
      !fiatAmountUsd ||
      !coinAmountPurchased ||
      !fromAddress ||
      !toAddress ||
      !transactionHash ||
      !actionName ||
      !pointsAllocated
    ) {
      return res.status(400).json({
        success: false,
        msg: "addPayment: Missing details in the request body",
      });
    }
    try {
      const output = await this.sequelize.transaction(async (t) => {
        // Step 1: Get userId from toAddress - userModel
        const user = await this.userModel.findOne(
          {
            where: { walletAddress: toAddress },
          },
          { transaction: t }
        );
        // Step 2: Get coinId from coinName - coinModel
        const coin = await this.coinModel.findOne(
          {
            where: { coinName: coinName },
          },
          { transaction: t }
        );
        // Step 3: Create transaction
        const newPayment = await this.transactionPaymentModel.create(
          {
            userId: user.id,
            coinId: coin.id,
            paymentStatus,
            fiatAmountUsd,
            coinAmountPurchased,
            fromAddress,
            toAddress,
            transactionHash,
          },
          { transaction: t }
        );
        // Step 4: Create transaction in transactionPoint
        const updatePointsTransactions = await this.model.create(
          {
            userId: user.id,
            actionName,
            pointsAllocated,
            transactionPaymentId: newPayment.id,
          },
          { transaction: t }
        );
        // Step 5: Calculate new points and update points in userModel
        if (user) {
          const updatedPoints =
            user.points + updatePointsTransactions.pointsAllocated;
          await user.update({ points: updatedPoints }, { transaction: t });
        }
        return res
          .status(CREATED)
          .json({ success: true, message: "Payment Added" });
      });
    } catch (error) {
      return res.status(BAD_REQUEST).json({
        success: false,
        msg: error.message,
      });
    }
  };
}

module.exports = TransactionController;
