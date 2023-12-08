const express = require("express");
const router = express.Router();

class TransactionRouter {
  constructor(transactionController) {
    this.transactionController = transactionController;
  }

  routes = () => {
    router.get("/", this.transactionController.test);
    router.get(
      "/points/dailyCheck/:address",
      this.transactionController.checkDailyPointsClaim
    );
    router.post("/points/add", this.transactionController.addPoints);
    router.get(
      "/points/:address",
      this.transactionController.getTransactionPointsHistory
    );
    router.post("/payments/add", this.transactionController.addPayment);
    router.get(
      "/payments/:address",
      this.transactionController.getTransactionPaymentsHistory
    );

    return router;
  };
}

module.exports = TransactionRouter;
