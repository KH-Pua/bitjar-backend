const express = require("express");
const router = express.Router();

class TransactionRouter {
  constructor(transactionPointController) {
    this.transactionPointController = transactionPointController;
  }

  routes = () => {
    router.get("/", this.transactionPointController.test);
    router.post(
      "/points/add/",
      this.transactionPointController.addPoints
    );

    return router;
  };
}

module.exports = TransactionRouter;
