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
    holdingModel,
    sequelize
  ) {
    super(transactionPointModel);
    this.transactionPaymentModel = transactionPaymentModel;
    this.transactionProductModel = transactionProductModel;
    this.userModel = userModel;
    this.coinModel = coinModel;
    this.productModel = productModel;
    this.holdingModel = holdingModel;
    this.sequelize = sequelize;
  }

  //-----------Points Routes-----------//

  checkDailyPointsClaim = async (req, res) => {
    const { address } = req.params;

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and ms to 0 for comparison

    try {
      const user = await this.userModel.findOne({
        where: { walletAddress: address },
      });
      const result = await this.model.findOne({
        where: {
          userId: user.id,
          actionName: {
            [Op.startsWith]: "Daily Login", // Find actionName starting with 'daily login'
          },
          createdAt: {
            [Op.gte]: today, // 'greater than or equal to' today's date
          },
        },
      });

      if (result) {
        return res.status(OK).json({ success: true, result });
      } else {
        return res
          .status(NOT_FOUND)
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

  addPoints = async (req, res) => {
    const { actionName, pointsAllocated, walletAddress } = req.body;

    if (!walletAddress || !actionName || !pointsAllocated) {
      return res.status(400).json({
        success: false,
        msg: "Missing details in the request body",
      });
    }
    try {
      await this.sequelize.transaction(async (t) => {
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

  //-----------Payment Routes-----------//

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
      await this.sequelize.transaction(async (t) => {
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
        // Step 3: Create transaction in transactionPaymentModel
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
        msg: error.errors,
      });
    }
  };

  //-----------Product Routes-----------//

  getTransactionProductHistory = async (req, res) => {
    const { address } = req.params;
    if (!address) {
      return res.status(400).json({
        success: false,
        msg: "getTransactionProductHistory: Missing address in the request body",
      });
    }
    try {
      let user = await this.userModel.findOne({
        where: {
          walletAddress: address,
        },
      });
      const output = await user.getTransactionProducts({
        include: [
          { model: this.coinModel, attributes: ["coinName"] },
          { model: this.productModel, attributes: ["productName"] },
        ],
        order: [["createdAt", "DESC"]], // Change 'createdAt' to the appropriate column name
      });

      return res.json({ success: true, data: output });
    } catch (err) {
      return res.status(BAD_REQUEST).json({ success: false, msg: err.message });
    }
  };

  depositCoinToPlatform = async (req, res) => {
    const {
      depositAmount,
      token,
      poolAddress,
      walletAddress,
      transactionHash,
    } = req.body;

    if (
      !depositAmount ||
      !token ||
      !poolAddress ||
      !walletAddress ||
      !transactionHash
    ) {
      return res.status(400).json({
        success: false,
        msg: "Missing details in the request body",
      });
    }

    try {
      await this.sequelize.transaction(async (t) => {
        // Get the User that made this transaction
        const user = await this.userModel.findOne(
          {
            where: { walletAddress: walletAddress },
          },
          { transaction: t }
        );

        // Get the Token's corresponding coin_id -
        // Currently only wBTC, USDC, wETH,ETH (NOTE: No USDC)
        const coin = await this.coinModel.findOne(
          {
            where: { coinSymbol: token },
          },
          { transaction: t }
        );

        // Can be refactored for more products in the future
        let productId;
        if (token == "sepoliaWBTC") {
          productId = 1;
        }
        if (token == "sepoliaUSDC") {
          productId = 2;
        }
        if (token == "sepoliaWETH") {
          productId = 3;
        }

        // Step 1: CREATE new entry transaction_products - So that we can store transaction history in our database to display
        const newProductsEntry = await this.transactionProductModel.create(
          {
            userId: user.id,
            coinId: coin.id,
            productId: productId,
            amount: depositAmount,
            fromAddress: walletAddress,
            toAddress: poolAddress,
            transactionHash: transactionHash,
          },
          { transaction: t }
        );

        // Step 2: CREATE new entry in transaction_points table
        const productName = await this.productModel.findOne(
          {
            where: { id: productId },
          },
          { transaction: t }
        );

        const newPointsTransaction = await this.model.create(
          {
            userId: user.id,
            actionName: `Deposited ${token} into ${productName.productName}`, // Aave can be contract address as well
            pointsAllocated: 100,
            transactionProductId: newProductsEntry.id,
          },
          { transaction: t }
        );

        // Step 3: Update Holdings row for corresponding User (?)
        // If no such row is found, ADD a row to Holdings
        try {
          const correspondingHolding = await this.holdingModel.findOne(
            {
              where: {
                userId: user.id,
                coinId: coin.id,
                productId: productId,
              },
            },
            { transaction: t }
          );

          let newAmount = correspondingHolding.amount + depositAmount;

          const updateHoldingsForUser = await correspondingHolding.update(
            {
              userId: user.id,
              productId: productId,
              coinId: coin.id,
              amount: newAmount,
            },
            { transaction: t }
          );
        } catch (err) {
          const addHoldingsForUser = await this.holdingModel.create(
            {
              userId: user.id,
              coinId: coin.id,
              productId: productId,
              amount: depositAmount,
            },
            { transaction: t }
          );
        }

        // Step 4: UPDATE points held by corresponding user.
        let updatedPoints = user.points + newPointsTransaction.pointsAllocated;
        await user.update({ points: updatedPoints }, { transaction: t });

        return res.status(CREATED).json({
          success: true,
          message:
            "Product Transaction Added, Holdings Updated, Points Updated",
        });
      });
    } catch (error) {
      return res.status(BAD_REQUEST).json({
        success: false,
        msg: error.message,
      });
    }
  };

  withdrawCoinToPlatform = async (req, res) => {
    const {
      withdrawAmount,
      token,
      poolAddress,
      walletAddress,
      transactionHash,
    } = req.body;

    if (
      !withdrawAmount ||
      !token ||
      !poolAddress ||
      !walletAddress ||
      !transactionHash
    ) {
      return res.status(400).json({
        success: false,
        msg: "Missing details in the request body",
      });
    }

    try {
      await this.sequelize.transaction(async (t) => {
        // Get the User that made this transaction
        const user = await this.userModel.findOne(
          {
            where: { walletAddress: walletAddress },
          },
          { transaction: t }
        );

        // Get the Token's corresponding coin_id -
        // Currently only wBTC, USDC, wETH,ETH (NOTE: No USDC)
        const coin = await this.coinModel.findOne(
          {
            where: { coinSymbol: token },
          },
          { transaction: t }
        );

        // Can be refactored for more products in the future
        let productId;
        if (token == "sepoliaWBTC") {
          productId = 1;
        }
        if (token == "sepoliaUSDC") {
          productId = 2;
        }
        if (token == "sepoliaWETH") {
          productId = 3;
        }

        // Step 1: CREATE new entry transaction_products - So that we can store transaction history in our database to display
        const newProductsEntry = await this.transactionProductModel.create(
          {
            userId: user.id,
            coinId: coin.id,
            productId: productId,
            amount: -withdrawAmount,
            fromAddress: walletAddress,
            toAddress: poolAddress,
            transactionHash: transactionHash,
          },
          { transaction: t }
        );

        // Step 2: Update Holdings row for corresponding User (?)
        // If no such row is found, ADD a row to Holdings
        try {
          const correspondingHolding = await this.holdingModel.findOne(
            {
              where: {
                userId: user.id,
                coinId: coin.id,
                productId: productId,
              },
            },
            { transaction: t }
          );

          let newAmount = correspondingHolding.amount - withdrawAmount;

          const updateHoldingsForUser = await correspondingHolding.update(
            {
              userId: user.id,
              productId: productId,
              coinId: coin.id,
              amount: newAmount,
            },
            { transaction: t }
          );
        } catch (err) {
          let negativeWithdrawnAmount = withdrawAmount * -1.0;
          const addHoldingsForUser = await this.holdingModel.create(
            {
              userId: user.id,
              coinId: coin.id,
              productId: productId,
              amount: negativeWithdrawnAmount,
            },
            { transaction: t }
          );
        }

        return res.status(CREATED).json({
          success: true,
          message:
            "Product Transaction Added, Holdings Updated, Points Updated",
        });
      });
    } catch (error) {
      return res.status(BAD_REQUEST).json({
        success: false,
        msg: "damn " + error.message,
      });
    }
  };
}

module.exports = TransactionController;
