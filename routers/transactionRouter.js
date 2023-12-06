const express = require("express");
const router = express.Router();

class TransactionRouter {
  constructor(transactionPointController) {
    this.transactionPointController = transactionPointController;
  }

  routes = () => {
    router.get("/", this.transactionPointController.test);
    router.get(
      "/points/dailyCheck/:userId",
      this.transactionPointController.checkDailyPointsClaim
    );
    router.post(
      "/points/add/",
      this.transactionPointController.addPoints
    );

    return router;
  };
}

module.exports = TransactionRouter;
