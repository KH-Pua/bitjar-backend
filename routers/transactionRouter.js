const express = require("express");
const router = express.Router();

class TransactionRouter {
  constructor(transactionController) {
    this.transactionController = transactionController;
  }

  routes = () => {
    router.get("/", this.transactionController.test);

    //-----------Points Routes-----------//
    router.get(
      "/points/dailyCheck/:address",
      this.transactionController.checkDailyPointsClaim
    );
    router.post("/points/add", this.transactionController.addPoints);
    router.get(
      "/points/:address",
      this.transactionController.getTransactionPointsHistory
    );

    //-----------Payment Routes-----------//
    router.post("/payments/add", this.transactionController.addPayment);
    router.get(
      "/payments/:address",
      this.transactionController.getTransactionPaymentsHistory
    );

    //-----------Product Routes-----------//
    router.get(
      "/products/:address",
      this.transactionController.getTransactionProductHistory
    );

    router.post(
      "/products/deposit",
      this.transactionController.depositCoinToPlatform
    );

    router.post(
      "/products/withdraw",
      this.transactionController.withdrawCoinToPlatform
    );

    return router;
  };
}

module.exports = TransactionRouter;
